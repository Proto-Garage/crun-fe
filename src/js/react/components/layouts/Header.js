import { Link } from "react-router";

export default class Header extends React.Component {

  // handleChange(e) {
  //   let title = e.target.value;
  //   this.props.changeTitle(title);
  // }

  render(){

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">{this.props.title}</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li activeClassName="active"><Link to="users">Users</Link></li>
                <li activeClassName="active"><Link to="roles">Role</Link></li>
                <li activeClassName="active"><Link to="commands">Commands</Link></li>
                <li activeClassName="active"><Link to="groups">Groups</Link></li>
                <li activeClassName="active"><Link to="executions">Executions</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
