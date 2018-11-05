import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/** tools API = axios{  baseURL: "https://uxcandy.com/~shapoval/test-task-backend" } */
/** tools QsUri = module query string conveniently { format: "RFC3986" } */
/** tools md5 = short md5 :)  */
import { API, QsUri, md5 } from "../Tools";

import AuthAdminContext from "../Auth/AuthAdminContext";
/**Constants from query */
import {
  DEV_NAME,
  SORT_DIRECTION,
  PAGE,
  SORT_EMAIL,
  SORT_STATUS,
  SORT_USERNAME,
  SORT_FILED,
  SORT_ID
} from "../constants";

import { LinearProgress, Grid, Typography } from "@material-ui/core";

import { Marker } from "../components/SignIn";
import { SortButton, List, PaginnationPanel } from "../components/TaskList";

/**
 *
 * @param { AdminList } state {
 * 		@var  checked , @var {this.props.currentStatus === 10 ? true : false} -> this condition is intended to
 *  	determine the initial position of the flag, depending on the status of the task
 *		@var { editText } This state is used to control the activation of @var {<textarea>} for text editing.
 *		@var { textValue } value change text + existing text
 *		@var { taskId} These are the states for passing the task ID to the query string.
 *
 * 	}
 *
 * @param { AdminList } function {
 * 		@var { newSetTaskValue } This method is designed to send data to the server to edit the task.
 *		@var { handleChange } This method is used to activate the checkbox when you click
 *		@var { onEdit} This method is intended for text editing buttons.
 *
 * 	}
 *
 */

class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.currentStatus === 10 ? true : false,
      editText: false,
      textValue: this.props.userText + "",
      taskId: this.props.taskId
    };
  }
  newSetTaskValue = () => {
    const { taskId, textValue } = this.state;

    // determine the status from the query string
    const statusValue = this.state.checked ? "10" : "0";

    // encoding string
    const status = QsUri("status") + "=" + QsUri(statusValue);
    const text = QsUri("text") + "=" + QsUri(textValue);

    // create string params from signature
    const params_string = `${status}&${text}&token=beejee`;

    // create signzture
    const signature = md5(params_string);

    // append data form payload
    const dataForm = new FormData();
    dataForm.append("status", statusValue);
    dataForm.append("text", textValue);
    dataForm.append("token", "beejee");
    dataForm.append("signature", signature);

    // query send server from edit task
    API.post(`/edit/${taskId}/?developer=Maksimtest`, dataForm)
      .then(res => JSON.stringify(res, "  ", 2))
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({ editText: false });
  };

  //active chebox
  handleChange = event => {
    this.setState({ checked: event.target.checked });
  };

  // change input value textarea
  onChangeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // button edit text
  onEdit = e => {
    if (e.target.name === "edit")
      this.setState({ editText: !this.state.editText });
  };
  render() {
    const {
      taskId,
      currentStatus,
      titleUserName,
      titleUserEmail,
      children,
      userText
    } = this.props;
    return (
      <List
        /** Render if auth Admin panel admin  */

        checked={this.state.checked}
        handleChange={this.handleChange}
        onEdit={this.onEdit}
        newSetTaskValue={this.newSetTaskValue}
        onChangeText={this.onChangeText}
        editText={this.state.editText}
        /** This props.value from render data in Task List in object @var Home */
        taskId={taskId} // this props task.id
        currentStatus={currentStatus} // render status
        titleUserName={titleUserName} // render username
        titleUserEmail={titleUserEmail} // render email
        userText={userText} // render body task text
        /**render image  */

        children={children}
      />
    );
  }
}

/**
 * This file displays a list of tasks and contains
 * all the logic regarding the list of tasks,
 * the request to the server, the display of the main content.
 * @param { Home } state {
 * 		@var { tasks } list of tasks
 *		@var { isLoading } state indecator loading
 *		@var { toggle } helper flag from moments when you need to bring the logic back
 *		@var { pageCount } from count and render pagination pageCount
 *
 * 	}
 *
 */

/**
 * @param { Home } state {
 * this state from active animation button  sort
 * 		@var { activeId, activeUsername, activeEmail, activeStatus }
 * 	}
 *
 */

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      isLoading: null,
      toggle: true,
      pageCount: 1,
      totalCount: 1,
      flag: false,
      activeId: false,
      activeUsername: false,
      activeEmail: false,
      activeStatus: false
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const res = await API.get(`/?${DEV_NAME}Maksimtest`);

      this.setState({
        tasks: res.data.message.tasks.reverse(),
        isLoading: false,
        totalCount: Math.ceil(res.data.message.total_task_count / 3)
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  /**This method sort all button */
  onSortSubmit = async e => {
    const { toggle, pageCount } = this.state;

    this.setState({
      isLoading: true,
      activeId: false,
      activeEmail: false,
      activeUsername: false,
      activeStatus: false
    });

    /***************************************** SORT BY ID **********************/
    if (e.target.name === "id") {
      this.setState({
        toggle: !this.state.toggle,
        activeId: !this.state.activeId
      });
      let sort = "";
      toggle ? (sort = "desc") : (sort = "asc");
      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}id`
        );
        this.setState({
          tasks: res.data.message.tasks.reverse()
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "username") {
      /***************************************** SORT BY USERNAME **********************/

      this.setState({
        toggle: !this.state.toggle,
        activeUsername: !this.state.activeUsername
      });
      let sort = "";
      toggle ? (sort = "desc") : (sort = "asc");
      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_USERNAME}`
        );
        this.setState({
          tasks: res.data.message.tasks.reverse()
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "email") {
      /***************************************** SORT BY EMAIL **********************/

      this.setState({
        toggle: !this.state.toggle,
        activeEmail: !this.state.activeEmail
      });
      let sort = "";
      toggle ? (sort = "desc") : (sort = "asc");
      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_EMAIL}`
        );
        this.setState({
          tasks: res.data.message.tasks.reverse()
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "status") {
      /***************************************** SORT BY STATUS **********************/
      this.setState({
        toggle: !this.state.toggle,
        activeStatus: !this.state.activeStatus
      });
      let sort = "";
      toggle ? (sort = "desc") : (sort = "asc");
      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_STATUS}`
        );
        this.setState({
          tasks: res.data.message.tasks.reverse()
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "pagrigth") {
      /***************************************** PAGINATION RIGTH **********************/

      this.setState({ pageCount: pageCount + 1 });
      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${PAGE}${pageCount}`
        );

        this.setState({
          tasks: res.data.message.tasks,
          isLoading: false
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "pagleft") {
      /***************************************** PAGINATION LEFT **********************/
      if (!this.state.flag) {
        this.setState({ pageCount: pageCount + 1 });
      }
      this.setState({ pageCount: pageCount - 1 });

      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${PAGE}${pageCount}`
        );

        this.setState({
          tasks: res.data.message.tasks.reverse(),
          isLoading: false
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
      this.setState({ flag: true });
    }

    this.setState({ isLoading: false });
  };

  /**This method from administrator access rights from edit task */

  render() {
    const { tasks, isLoading, pageCount, totalCount } = this.state;

    if (isLoading) return <LinearProgress />;

    return (
      <div>
        {
          /***  Header Administrator on , Context */
          <AuthAdminContext.Consumer>
            {authAdmin => (authAdmin ? <Marker text="Administrator" /> : null)}
          </AuthAdminContext.Consumer>
        }

        {/** Tools panel buttons of sort */}
        <Grid container spacing={16}>
          <Grid item xs={8}>
            <Typography component="h1" variant="h5">
              Sort by:
            </Typography>

            <SortButton
              onSortSubmit={this.onSortSubmit}
              buttonActive={this.state.activeId}
              name="id"
            />
            <SortButton
              onSortSubmit={this.onSortSubmit}
              buttonActive={this.state.activeUsername}
              name="username"
            />
            <SortButton
              onSortSubmit={this.onSortSubmit}
              buttonActive={this.state.activeEmail}
              name="email"
            />
            <SortButton
              onSortSubmit={this.onSortSubmit}
              buttonActive={this.state.activeStatus}
              name="status"
            />
          </Grid>

          {/** Paginator panel */}
          <PaginnationPanel
            totalCount={totalCount}
            onSortSubmit={this.onSortSubmit}
            pageCount={pageCount}
          />
        </Grid>

        {!tasks
          ? null
          : tasks
              .map(task => (
                <div key={task.id}>
                  <AdminList
                    taskId={task.id}
                    currentStatus={task.status} // render status
                    titleUserName={task.username} // render username
                    titleUserEmail={task.email} // render email
                    userText={task.text} // render body task text
                    /** Render if auth Admin panel admin  */

                    /**render image  */

                    children={
                      <img
                        src={task.image_path}
                        alt=""
                        style={{
                          maxWidth: 320,
                          maxHeight: 240,
                          minHeight: "100%",
                          minWeight: "100%"
                        }}
                      />
                    }
                  />
                </div>
              ))
              .reverse()}
      </div>
    );
  }
}

export default withRouter(Home);
