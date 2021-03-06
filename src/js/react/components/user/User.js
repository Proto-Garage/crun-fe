import { getUsers } from '../../actions/userAction'
import { refreshToken } from '../../actions/authActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from "react-router"




class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentWillMount(){
    this.props.getUsers().then(() => {
      console.log('this user props: ', this.props)
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getUsers()
        })
      }
    })
  }

  render(){

    const userArr = _.valuesIn(this.props.users)

    return (
      <div>
        <Link className="add-btn btn btn-success" to="/addUser" ><i className="fa fa-plus"></i>Add User</Link>
        <h1>Users</h1>
        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <td>Username</td>
              <td>Created At</td>
              <td>Roles</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
          {this.props.users ? (userArr.map((users, i) => {
            return (
              <tr key={i}>
                 <td>{users.username}</td>
                 <td>{users.createdAt}</td>
                 <td>
                 <ul>
                   {users.roles ? (users.roles.map((roles, index) => {
                     return (
                       <li key={index}>{roles}</li>
                     )
                   })) : (<li>No Roles assign</li>)}
                  </ul>
                 </td>
                 <td>
                  <Link className="btn btn-sm btn-warning" >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button className="btn btn-sm btn-danger">
                          <i className="fa fa-trash-o"></i>
                  </button>
                 </td>
             </tr>
            )
          })): (<tr>No Users Found</tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

User.propTypes = {
  getUsers: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  refreshToken: React.PropTypes.func
}

User.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return{
    users: state.userReducer.users,
    links: state.userReducer.links,
    errors: state.userReducer.errors
  }
}

export default connect(mapStateToProps, { getUsers, refreshToken })(User)
