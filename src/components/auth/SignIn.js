import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Input,
  InputLabel,
  FormControl,
  Button,
  withStyles
} from "@material-ui/core";

const styles = {
  button: {
    marginTop: 30
  }
};

class SignIn extends Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;

    return (
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel>Email</InputLabel>
          <Input
            value={email}
            onChange={this.handleInputChange}
            name="email"
            autoComplete="email"
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel>Password</InputLabel>
          <Input
            value={password}
            onChange={this.handleInputChange}
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign in
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(SignIn);