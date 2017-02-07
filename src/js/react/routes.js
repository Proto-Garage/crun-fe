import React from "react";
import { Route, IndexRoute } from "react-router";

import Layout from "./components/Layout";
import userPage from "./components/user/User";
import rolePage from "./components/role/Role";
import addUserPage from "./components/user/AddUser";
import commandPage from "./components/command/Command";
import addCommandPage from "./components/command/AddCommand";
import editCommandPage from './components/command/EditCommand';
import groupPage from "./components/group/Group";
import executionPage from "./components/execution/Execution";
import loginPage from "./components/login/Login";
import dashboardPage from "./components/dashboard/Dashboard";
import addRolePage from "./components/role/AddRole";
import editRolePage from "./components/role/EditRole";
import addGroupPage from "./components/group/AddGroup"

import requireAuth from "./utils/requireAuth";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={dashboardPage} />
    <Route path="login" component={loginPage} />
    <Route path="users" component={requireAuth(userPage)} />
    <Route path="addUser" component={requireAuth(addUserPage)} />
    <Route path="roles" component={requireAuth(rolePage)} />
    <Route path="commands" component={requireAuth(commandPage)} />
    <Route path="addCommand" component={requireAuth(addCommandPage)} />
    <Route path="editCommand/:commandId" component={requireAuth(editCommandPage)} />
    <Route path="groups" component={requireAuth(groupPage)} />
    <Route path="addGroup" component={requireAuth(addGroupPage)} />
    <Route path="execution" component={requireAuth(executionPage)} />
    <Route path="addRole" component={requireAuth(addRolePage)} />
    <Route path="editRole/:roleId" component={requireAuth(editRolePage)} />
  </Route>
)
