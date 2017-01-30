import React from "react";
import { Route, IndexRoute } from "react-router";

import Layout from "./components/Layout";
import userPage from "./components/user/User";
import rolePage from "./components/role/Role";
import commandPage from "./components/command/Command";
import groupPage from "./components/group/Group";
import executionPage from "./components/execution/Execution";
import loginPage from "./components/login/Login";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={loginPage} />
    <Route path="users" component={userPage} />
    <Route path="roles" component={rolePage} />
    <Route path="commands" component={commandPage} />
    <Route path="groups" component={groupPage} />
    <Route path="Executions" component={executionPage} />
  </Route>
)
