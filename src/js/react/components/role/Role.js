import { getRoles } from '../../actions/roleActions'
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
        this.props.refreshToken();
        this.props.getRoles();
      }
    })
  }

  render(){

    const roleArr = _.valuesIn(this.props.roles)
    const roleLength = this.props.roles.length > 0;
    return (
      <div>
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
            { roleLength ? (
              roleArr.map((roles, i) => {
                return (
                  <tr key={i}>
                     <td>{roles.name}</td>
                     <td>{roles.createdAt}</td>
                     <td>
                      <Link className="btn btn-sm btn-warning"  >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <button className="btn btn-sm btn-danger">
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

export default connect(mapStateToProps, { getRoles, refreshToken })(Role)
