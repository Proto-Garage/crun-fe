import { Link } from "react-router";
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';


class Header extends React.Component {

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

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render(){

    const { isAuthenticated } = this.props.auth;

    const { location } = this.props;
    const { collapsed } = this.state;
    const userActive = location.pathname === "users" ? "active" : "";
    const roleActive = location.pathname === "roles" ? "active" : "";
    const commandActive = location.pathname === "commands" ? "active" : "";
    const groupActive = location.pathname === "groups" ? "active" : "";
    const executionActive = location.pathname === "executions" ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
      </ul>
    );


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
              { isAuthenticated ? userLinks : guestLinks }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}


export default connect(mapStateToProps, { logout })(Header);
