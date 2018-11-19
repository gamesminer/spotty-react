import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from "styled-components";

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Album from '@material-ui/icons/Album';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Info from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const RootDiv = styled.div`
  display: flex;   
  width: 100%;
`;

const GrowDiv = styled.div`
  flexGrow: 1;
`;

const StyledAppBar = styled(AppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
  transition: ${props => props.theme.transitions.create(['margin', 'width'], {
    easing: props.theme.transitions.easing.sharp,
    duration: props.theme.transitions.duration.leavingScreen
  })};

  &.appBarShift {
    width: calc(100% - ${drawerWidth}px);
    margin-left: ${drawerWidth}px;
    transition: ${props => props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
`;

const StyledIconButton = styled(IconButton)`
  margin-left: 12px;
  margin-right: 36px;

  &.hide {
    display: none;
  }
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  ${props => props.theme.mixins.toolbar};
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  white-space: nowrap;   

  &.drawerOpen {
    width: ${drawerWidth}px,
    transition: ${props => props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen,
    })};
  };

  &.drawerClose {
    transition: ${props => props.theme.transitions.create(['margin', 'width'], {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen
    })};
    overflow-x: hidden;
    width: ${props => props.theme.spacing.unit * 7 + 1},
    ${props => [props.theme.breakpoints.up('sm')]}: {
      width: ${props => props.theme.spacing.unit * 9 + 1}
    };
  };
`;

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },  
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  subtitle: {
    marginLeft: theme.spacing.unit * 2,
  },  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing.unit,    
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitToApp: {
    paddingRight: theme.spacing.unit,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  player: {
    color: 'inherit',
    width: '100%',
    height: '100px',
    position: 'fixed',
    bottom: '0',
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,    
  }  
})

class PrimarySearchAppBar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };  

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, open } = this.state;
    const { classes, theme } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem disabled={true}>Random Name</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <div className={classes.exitToApp}>
            <ExitToApp />
          </div>
          Log Out
        </MenuItem>
      </Menu>
    );

    return (
      <RootDiv>
        <CssBaseline />      
        <StyledAppBar
          position="fixed"
          className={this.state.open ? "appBarShift" : null}
        >
          <StyledToolbar disableGutters={!open}>
            <StyledIconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={this.state.open ? "hide" : null}
            >
              <MenuIcon />
            </StyledIconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Spotty
            </Typography>
            <GrowDiv />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>            
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </StyledToolbar>
        </StyledAppBar>
        <StyledDrawer
          variant="permanent"
          className={classNames(this.state.open ? 'drawerOpen' : null, !this.state.open ? 'drawerClose' : null)}
          classes={{
            paper: classNames(this.state.open ? 'drawerOpen' : null, !this.state.open ? 'drawerClose' : null),
          }}
          open={this.state.open}
        >
          <StyledToolbar>
            <Typography className={classes.subtitle} variant="h6" color="inherit" noWrap>
              Library
            </Typography>            
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </StyledToolbar>
          <Divider />
          <List>
            <ListItem button> 
              <ListItemIcon><LibraryMusic /></ListItemIcon>                  
              <ListItemText primary='My Songs' />                          
            </ListItem>
            <ListItem button>             
              <ListItemIcon><Album /></ListItemIcon>                  
              <ListItemText primary='Albums' />                             
            </ListItem>
            <ListItem button>       
              <ListItemIcon><PersonOutline /></ListItemIcon>                  
              <ListItemText primary='Artists' />                                                      
            </ListItem>              
          </List>
          <Divider />
          <List>
            <ListItem button>       
              <ListItemIcon><Info /></ListItemIcon>                  
              <ListItemText primary='About' />                                                      
            </ListItem>              
          </List>
        {renderMenu}          
        </StyledDrawer>
        <main className={classes.content}>
          <StyledToolbar />
        </main>        
        <div className={classes.player} />        
      </RootDiv>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PrimarySearchAppBar);
