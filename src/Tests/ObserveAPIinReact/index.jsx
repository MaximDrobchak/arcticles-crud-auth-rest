import React, { Component } from "react";

/** tools API = axios{  baseURL: "https://uxcandy.com/~shapoval/test-task-backend" } */
/** tools QsUri = module query string conveniently { format: "RFC3986" } */
/** tools md5 = short md5 :)  */
import { API } from "../../Tools";

/**Constants from query */
import {
  DEV_NAME,
  SORT_DIRECTION,
  PAGE,
  SORT_EMAIL,
  SORT_STATUS,
  SORT_USERNAME,
  SORT_FILED
} from "../../constants";

import { LinearProgress, Grid, Typography } from "@material-ui/core";

import { SortButton, List, PaginnationPanel } from "./TaskList";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      isLoading: null,
      toggle: true,
      pageCount: 1,
      totalCount: 1,
      querySortString: `${SORT_DIRECTION}asc&${SORT_FILED}id&${PAGE}1`,
      activeId: false,
      activeUsername: false,
      activeEmail: false,
      activeStatus: false
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const res = await API.get(
        `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}asc&${SORT_FILED}id&${PAGE}${
          this.state.pageCount
        }`
      );

      this.setState({
        tasks: res.data.message.tasks,
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
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}id&${PAGE}${pageCount}`
        );
        this.setState({
          tasks: res.data.message.tasks,
          querySortString: `${SORT_DIRECTION}${sort}&${SORT_FILED}id`
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
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_USERNAME}&${PAGE}${pageCount}`
        );
        this.setState({
          tasks: res.data.message.tasks,
          querySortString: `${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_USERNAME}`
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
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_EMAIL}&${PAGE}${pageCount}`
        );
        this.setState({
          tasks: res.data.message.tasks,
          querySortString: `${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_EMAIL}`
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
          `/?${DEV_NAME}Maksimtest&${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_STATUS}&${PAGE}${pageCount}`
        );
        this.setState({
          tasks: res.data.message.tasks,
          querySortString: `${SORT_DIRECTION}${sort}&${SORT_FILED}${SORT_STATUS}`
        });
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    }

    this.setState({ isLoading: false });

    console.log(this.state.querySortString);
  };

  onClickToPagination = async e => {
    const { pageCount, querySortString } = this.state;
    if (e.target.name === "pagrigth") {
      /***************************************** PAGINATION RIGTH **********************/

      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${querySortString}&${PAGE}${pageCount + 1}`
        );
        console.log(JSON.stringify(res.data.message.tasks, "  ", 2));
        this.setState({
          pageCount: pageCount + 1,
          tasks: res.data.message.tasks,
          isLoading: false
        });
      } catch (error) {
        console.log(JSON.stringify(error));
        this.setState({
          error,
          isLoading: false
        });
      }
    } else if (e.target.name === "pagleft") {
      /***************************************** PAGINATION LEFT **********************/

      try {
        const res = await API.get(
          `/?${DEV_NAME}Maksimtest&${querySortString}&${PAGE}${pageCount - 1}`
        );
        console.log(JSON.stringify(res.data.message.tasks, "  ", 2));
        this.setState({
          pageCount: pageCount - 1,
          tasks: res.data.message.tasks,
          isLoading: false
        });
      } catch (error) {
        console.log(JSON.stringify(error));
        this.setState({
          error,
          isLoading: false
        });
      }
    }
  };
  /**This method from administrator access rights from edit task */

  render() {
    const { tasks, isLoading, pageCount, totalCount } = this.state;

    if (isLoading) return <LinearProgress />;

    return (
      <div>
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
            onClickToPagination={this.onClickToPagination}
            pageCount={pageCount}
          />
        </Grid>

        {!tasks
          ? null
          : tasks.map(task => (
              <div key={task.id}>
                <List
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
            ))}
      </div>
    );
  }
}

export default Home;
