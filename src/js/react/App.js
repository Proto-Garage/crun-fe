import Layout from "./components/Layout";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import User from "./components/layouts/User";
import Role from "./components/layouts/Role";
import Command from "./components/layouts/Command";
import Group from "./components/layouts/Group";
import Execution from "./components/layouts/Execution";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="users" component={User}></Route>
      <Route path="roles" component={Role}></Route>
      <Route path="commands" component={Command}></Route>
      <Route path="groups" component={Group}></Route>
      <Route path="Executions" component={Execution}></Route>
    </Route>
  </Router>,
  app);
