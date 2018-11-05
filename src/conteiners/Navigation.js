import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants";

import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

/**Navigation panel */

const Navigation = ({ setRender }) => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          {/**Navigation Link HomePage  */}
          <Link to={routes.HOME} style={{ textDecoration: "none" }}>
            <Button>
              <Typography color="secondary" variant="button">
                {" "}
                Task List
              </Typography>
            </Button>
          </Link>

          {/**Navigation Link Create task  */}
          <Link to={routes.ADD_TASK} style={{ textDecoration: "none" }}>
            <Button>
              <Typography color="secondary" variant="button">
                {" "}
                Create Task
              </Typography>
            </Button>
          </Link>

          {/**Button Sign In  */}

          {setRender}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
