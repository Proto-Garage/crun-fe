import { getRoles, deleteRole } from '../../actions/roleActions'
import { refreshToken } from '../../actions/authActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from "react-router"



class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: []
    };
  }

  componentWillMount(){
    this.props.getRoles().then(() => {
      console.log('this role props: ', this.props)
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getRoles()
        })
      }
    })
  }

  deleteRoleEvent(data){
    this.props.deleteRole(data).then(() => {
      this.props.getRoles()
    });
  }


  render(){

    const roleArr = _.valuesIn(this.props.roles)

    return (
      <div>
        <Link className="add-btn btn btn-success" to="/addRole" ><i className="fa fa-plus"></i>Add Role</Link>
        <h1>Roles</h1>
        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <td>Name</td>
              <td>Created At</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            { this.props.roles ? (
              roleArr.map((roles, i) => {
                return (
                  <tr key={i}>
                     <td>{roles.name}</td>
                     <td>{roles.createdAt}</td>
                     <td>
                      <button className="btn btn-sm btn-danger" onClick={() => this.deleteRoleEvent(roles._id)}>
                              <i className="fa fa-trash-o"></i>
                      </button>
                     </td>
                 </tr>
               );
             })) : (<tr>No Roles Found</tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Role.propTypes = {
  getRoles: React.PropTypes.func.isRequired,
  deleteRole: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  refreshToken: React.PropTypes.func
}

Role.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return{
    roles: state.roleReducer.roles,
    links: state.roleReducer.links,
    errors: state.roleReducer.errors
  }
}

export default connect(mapStateToProps, { getRoles, refreshToken, deleteRole })(Role)
