import { Link } from "react-router";

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      collapsed: true
    }
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render(){

    console.log("Header: ", this.props);

    const { location } = this.props;
    const { collapsed } = this.state;
    const userActive = location.pathname === "users" ? "active" : "";
    const roleActive = location.pathname === "roles" ? "active" : "";
    const commandActive = location.pathname === "commands" ? "active" : "";
    const groupActive = location.pathname === "groups" ? "active" : "";
    const executionActive = location.pathname === "executions" ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.toggleCollapse.bind(this)}>
               <span className="sr-only">Toggle navigation</span>
               <span className="icon-bar" />
               <span className="icon-bar" />
               <span className="icon-bar" />
             </button>
              <Link className="navbar-brand" to="/">{this.props.title}</Link>
            </div>

            <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="login">Login</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
