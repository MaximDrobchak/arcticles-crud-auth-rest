import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Icon,
  FormLabel
} from "@material-ui/core";

import { styles } from "./style";

/**
 * This file contains a form for adding a task. It contains no logic,
 * transmits data at top.
 * @param { AddTask }
 * 		@var { emailValue, textValue, nameValue, imageValue } input data
 *	@param { onSubmit } send data
 *	@param { onChange } listener input value
 * 	@param { previewRender } node child from modal preview
 * 	@param { onImageChange } listener input image
 */

const AddTask = ({
  classes,
  imageValue,
  onSubmit,
  onChange,
  emailValue,
  nameValue,
  textValue,
  previewRender,
  onImageChange,
  children
}) => {
  /**
   * @param { isInvalid } prevents sending without filling
   */

  const isInvalid = emailValue === "" || nameValue === "" || textValue === "";

  return (
    <div style={{ margin: "auto" }}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {/** This field displays the file upload button.  */}
          <FormLabel>
            <label htmlFor="image">
              <Icon component="span" className={classes.icon}>
                cloud_upload
              </Icon>
            </label>
          </FormLabel>

          <form className={classes.form} onSubmit={onSubmit}>
            <FormControl margin="normal" required fullWidth>
              {/** input email  */}

              {children}

              {/**children from message err */}
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                onChange={onChange}
                value={emailValue}
                name="email"
                autoComplete="email"
                autoFocus
              />
            </FormControl>

            {/** input name  */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                value={nameValue}
                onChange={onChange}
                name="name"
                type="text"
                id="name"
                autoComplete="current-name"
              />{" "}
            </FormControl>

            {/** input text  */}
            <FormControl margin="normal" required fullWidth>
              <textarea
                value={textValue}
                name="text"
                cols="25"
                rows="10"
                onChange={onChange}
              />
              <br />

              {/** input file  !display: "none"  nickname rendering field at the top  */}
              <input
                className={classes.input}
                style={{ display: "none" }}
                id="image"
                type="file"
                accept="image/gif, image/jpeg, image/png"
                value={(imageValue = undefined)}
                onChange={onImageChange}
                name="image"
              />
            </FormControl>

            {/**node  from modal preview  */}
            {previewRender}

            {/**submit  */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
              onSubmit={onSubmit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
};

AddTask.propTypes = {
  classes: PropTypes.object.isRequired,
  passwordValue: PropTypes.string,
  emailValue: PropTypes.string,
  textValue: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onImageChange: PropTypes.func
};

export default withStyles(styles)(AddTask);
