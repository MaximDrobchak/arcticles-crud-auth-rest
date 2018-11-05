import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  List,
  Divider,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Slide
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

/**
 * This file contains a data preview window before
 * uploading to the server when creating a task.
 * @param { Transition } props  Slide up
 *
 */

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

/**
 * @param { FullScreenDialog } modal page preview data
 * save open and closed states and displayed data without logic
 */
class FullScreenDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, children } = this.props;
    return (
      <div>
        {/**Button open modal */}
        <Button onClick={this.handleClickOpen}>Preview</Button>

        {/**Header modal */}
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Preview Task
              </Typography>

              {/**Button close modal */}
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/**children = preview (email, username, image, text)  of task */}
          <List>
            {children}
            <Divider />
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(FullScreenDialog);
