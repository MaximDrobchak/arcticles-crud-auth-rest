/**
 * Importing standrt libs
 */
import React from "react";
import PropTypes from "prop-types";
/**Importing material styles */
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Typography,
  Paper,
  Checkbox,
  Icon,
  IconButton
} from "@material-ui/core";
import { actionsStyles, styles } from "./styles";
import buttonRigth from "./img/buttonRigth.png";
import buttonLeft from "./img/buttonLeft.png";
import ArrowDown from "./img/baseline-arrow_downward-24px.svg";
import ArrowUp from "./img/baseline-arrow_upward-24px.svg";
import AuthAdminContext from "../../Auth/AuthAdminContext";

import EditIcon from "./img/baseline_edit_black_24dp.png";

/**************************************************************************************
 * 	 passing parameters in parts to display the contents in the list
 *
 *  @param {titleUserName,  titleUserEmail,  userText, renderSetAdmin}
 *
 * 	These functions are performed by admin logic in @var {Adminlist} on Home
 *  @param { handleChange, onEdit, newSetTaskValue, onChangeText }
 *
 * 	@param { TaskList }	render render list of tasks ,
 * 	@var {TaskTitles}	a block for task headers and text content
 *
 *
 *
 **************************************************************************************/

const TaskList = ({
  classes,
  titleUserName,
  titleUserEmail,
  userText,
  children,
  currentStatus,
  checked,
  handleChange,
  onEdit,
  newSetTaskValue,
  onChangeText,
  editText,
  taskId
}) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <Grid container spacing={0}>
            {/** info task head  */}

            <TitleTaskElement
              text={titleUserName}
              styleClassName={classes.title}
            />
            <TitleTaskElement
              text={titleUserEmail}
              styleClassName={classes.title}
            />

            <AuthAdminContext.Consumer>
              {authAdmin =>
                authAdmin ? (
                  <React.Fragment>
                    {/** If auntification admin  */}
                    {/***************************  SHOW  ADMIN TOOLS PANEL ****************************/}

                    <Grid item xs={4} className={classes.title}>
                      <Paper>
                        {/** admin checbox if auth  */}

                        <AdminStatusBox
                          checkStatus={
                            <Checkbox
                              className={classes.checbox}
                              style={{
                                width: 40,
                                height: 40,
                                position: "relative",
                                top: "-20%"
                              }}
                              color="secondary"
                              checked={checked}
                              onChange={handleChange}
                            />
                          }
                          children={Status(currentStatus)}
                        />
                      </Paper>
                    </Grid>

                    <Paper className={classes.editPaper}>
                      {/** admin tools panel if auth  */}

                      <div>
                        <EditButton onEdit={onEdit} />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={newSetTaskValue}
                        >
                          Submit
                        </Button>
                      </div>
                      {/** admin edit text lable */}

                      {editText ? (
                        <textarea
                          name="textValue"
                          onChange={onChangeText}
                          defaultValue={userText}
                        />
                      ) : (
                        <Typography variant="inherit">{userText}</Typography>
                      )}
                    </Paper>

                    {/**************** FIND ADMIN TOOLS PANEL   *******************/}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/**  status  */}

                    <Grid item xs={4} className={classes.title}>
                      <Paper>status {Status(currentStatus)}</Paper>
                    </Grid>

                    {/** text task  */}
                    <Paper className={classes.muiPaper}>
                      <Typography variant="inherit">{userText}</Typography>
                    </Paper>
                  </React.Fragment>
                )
              }
            </AuthAdminContext.Consumer>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.muiPaper} style={{ height: 260 }}>
            <Grid item sm={4}>
              {/** children = <img /> render  */}
              <Paper>{children} </Paper>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
  titleUserName: PropTypes.string.isRequired,
  userText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

// Render Name Email Status
const TitleTaskElement = ({ text, styleClassName }) => (
  <Grid item xs={4} className={styleClassName}>
    <Paper>
      <TaskTitles text={text} />
    </Paper>
  </Grid>
);

// Show image status = 0 | status = 10
const Status = status =>
  status === 10 ? <PositiveStatus /> : <NegativeStatus />;

// Edit Button if auth admin this button edit text
const EditButton = ({ onEdit }) => (
  <div>
    edit text
    <IconButton name="edit" onClick={onEdit}>
      <img src={EditIcon} alt="" name="edit" onClick={onEdit} />
    </IconButton>
  </div>
);

/**
 * @var {TaskTitles} from render headers (username, email)
 */

const TaskTitles = ({ text }) => (
  <Grid item sm={1}>
    <Typography variant="caption">{text}</Typography>
  </Grid>
);
TaskTitles.propTypes = {
  text: PropTypes.string.isRequired
};

/**
 * @var { MuiButton } button from sort by id username email status
 */

// this button handle query sort & props (buttonActiv) -->> state of arrow icon
const MuiButton = ({ name, onSortSubmit, buttonActive }) =>
  !buttonActive ? (
    <div style={{ display: "inline-flex" }}>
      <Typography variant="inherit">{name}: </Typography>

      <Button
        onClick={onSortSubmit}
        name={name}
        style={{ margin: 5 }}
        variant="fab"
        color="primary"
      >
        <img src={ArrowDown} alt="" name={name} onClick={onSortSubmit} />
      </Button>
    </div>
  ) : (
    <div style={{ display: "inline-flex" }}>
      <Typography variant="inherit">{name}: </Typography>

      <Button
        onClick={onSortSubmit}
        name={name}
        variant="fab"
        color="secondary"
        style={{ margin: 5 }}
      >
        <img src={ArrowUp} alt="" name={name} onClick={onSortSubmit} />
      </Button>
    </div>
  );

MuiButton.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onSortSubmit: PropTypes.func.isRequired
};

const List = withStyles(styles)(TaskList);
const SortButton = withStyles(styles)(MuiButton);

/**
 *  Вraws the entire pagination panel
 * @param { PaginationButtons }
 */
const PaginationButtons = ({
  onSortSubmit,
  classes,
  pageCount,
  totalCount
}) => {
  const isInvalid = pageCount <= 1;
  const isInvalidMax = pageCount >= totalCount;
  return (
    <div className={classes.root}>
      <Typography variant="h6" color="secondary">
        Pagination page
      </Typography>
      <br />
      <Button
        disabled={isInvalid}
        className={classes.button}
        variant="fab"
        onClick={onSortSubmit}
        name="pagleft"
      >
        <img
          onClick={onSortSubmit}
          name="pagleft"
          src={buttonLeft}
          alt=""
          style={{ width: "95%", height: "95%" }}
        />
      </Button>

      <Typography variant="h6" color="primary">
        {pageCount}
      </Typography>
      <Button
        disabled={isInvalidMax}
        className={classes.button}
        variant="fab"
        onClick={onSortSubmit}
        name="pagrigth"
      >
        <img
          onClick={onSortSubmit}
          name="pagrigth"
          src={buttonRigth}
          alt=""
          style={{ width: "95%", height: "95%" }}
        />
      </Button>
    </div>
  );
};
PaginationButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  onSortSubmit: PropTypes.func.isRequired
};

// state of status
const NegativeStatus = () => (
  <Icon component="span" color="secondary">
    not_interested
  </Icon>
);

// state of status
const PositiveStatus = () => (
  <Icon component="span" color="primary">
    check_circle
  </Icon>
);

// admin button edit text
const ButtonEdit = ({ onClick }) => (
  <Button
    variant="contained"
    onClick={onClick}
    color="primary"
    style={{ height: 20 }}
  >
    Edit
  </Button>
);

// panel status element
const AdminStatusBox = ({ children, checkStatus }) => (
  <div
    style={{
      flexdirection: "column",
      display: "flex",
      alignContent: "space-between"
    }}
  >
    <span
      style={{
        flexdirection: "column",
        display: "flex"
      }}
    >
      <Typography variant="button" color="inherit">
        status
      </Typography>
      {children}
    </span>
    <span
      style={{
        flexdirection: "column",
        display: "inline-flex"
      }}
    >
      <Typography variant="subtitle2" color="primary">
        Check status:
      </Typography>
      {checkStatus}
    </span>
  </div>
);
const PaginnationPanel = withStyles(actionsStyles, {
  withTheme: true
})(PaginationButtons);
export {
  List,
  SortButton,
  PaginnationPanel,
  NegativeStatus,
  PositiveStatus,
  ButtonEdit,
  AdminStatusBox
};
