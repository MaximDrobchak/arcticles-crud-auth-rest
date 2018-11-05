import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { styles } from "./style";
import {
  Button,
  FormControlLabel,
  Dialog,
  Icon,
  DialogActions,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Typography,
  DialogContent,
  Checkbox
} from "@material-ui/core";

/**
 *	the marker is launched upon successful authorization,
 *	displays a table of contents with the administrator
 * @param { Marker }
 */

const Marker = ({ text }) => (
  <Typography
    style={{
      color: "blue"
    }}
    variant="h4"
  >
    {text}
  </Typography>
);
Marker.propTypes = {
  text: PropTypes.string.isRequired
};

/**
 * Autoritsiai Form @param { Forma } The form is initialized in a modal window.
 * @param { handleClickOpen } button open modal
 * @param { handleClose } button close modal
 * @param { onDataChange } data retrieval method of input
 * @param { onAuthorization } send query authorization (log, pass)
 * @param { error, open } error handling states
 * @var { loginValue , passwordValue } input value from authorization admin
 */
const Forma = ({
  loginValue,
  passwordValue,
  error,
  open,
  classes,
  handleClickOpen,
  handleClose,
  onDataChange,
  onAuthorization,
  children,
  isLoading
}) => {
  const isInvalid = loginValue === "" || passwordValue === "";

  return (
    <div className={classes.root}>
      {/**button open modal */}
      <Button color="secondary" onClick={handleClickOpen}>
        Sign In
      </Button>

      {/**header form setting from visual and struct  */}
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.model}>
          <Paper className={classes.paper}>
            <Icon className={classes.icon}>lock</Icon>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form className={classes.form}>
              {/**login lable */}
              {isLoading}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="login">Login</InputLabel>
                <Input
                  onChange={onDataChange}
                  value={loginValue}
                  name="login"
                  id="login"
                  autoComplete="current-login"
                  autoFocus
                />
              </FormControl>

              {/**password lable */}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Pasword</InputLabel>

                <Input
                  value={passwordValue}
                  onChange={onDataChange}
                  name="password"
                  id="password"
                  type="password"
                  autoComplete="password"
                />
              </FormControl>

              {/**remember toggle */}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </form>

            {children}
          </Paper>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClose}
          >
            Cancel
          </Button>

          {/**submit form */}
          <Button
            variant="contained"
            color="primary"
            disabled={isInvalid}
            fullWidth
            onClick={onAuthorization}
          >
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Forma.propTypes = {
  classes: PropTypes.object.isRequired,
  loginValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onAuthorization: PropTypes.func.isRequired
};
const SignIn = withStyles(styles)(Forma);

export { Marker, SignIn };
