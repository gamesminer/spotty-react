import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  error: {
    color: theme.palette.error.main,
    marginTop: "1.5rem"
  }
});

const Error = ({ text, classes }) => (
  <div className={classes.error}>Error: {text}</div>
);

Error.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Error);
