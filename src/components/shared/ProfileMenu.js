import React, { Component } from "react";
import { connect } from "react-redux";

import { IconButton, MenuItem, Menu } from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { signOut } from "../../store/actionCreators/auth";
import { setDefaultTheme } from "../../store/actionCreators/themes";

const styles = theme => ({
  exitToApp: {
    paddingRight: theme.spacing.unit
  }
});

class ProfileMenu extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    setDefaultTheme: PropTypes.func.isRequired
  };

  state = {
    anchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOutClick = () => {
    this.props.signOut();
    this.handleMenuClose();
    this.props.setDefaultTheme();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = !!anchorEl;

    return (
      <div>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem disabled={true}>{this.props.userName}</MenuItem>
          <MenuItem onClick={this.handleLogOutClick}>
            <div className={classes.exitToApp}>
              <ExitToApp />
            </div>
            Log Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userName = state.auth.user ? state.auth.user.displayName : "";
  return {
    userName
  };
};

export default connect(
  mapStateToProps,
  { signOut, setDefaultTheme }
)(withStyles(styles, { withTheme: true })(ProfileMenu));
