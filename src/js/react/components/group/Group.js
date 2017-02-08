import { getGroups, deleteGroup } from '../../actions/groupActions'
import { postExecution } from '../../actions/executionActions'
import { refreshToken } from '../../actions/authActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from "react-router"
import { getCommand } from '../../actions/commandActions'

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentWillMount(){
    this.props.getGroups().then(() => {
      console.log('this groups props: ', this.props)
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getGroups()
        })
      }
    })
  }

  deleteGroupEvent(data) {
    this.props.deleteGroup(data).then(() => {
      this.props.getGroups();
    })
  }

  executedGroupEvent(data) {
    let submitted = {
      group: data
    }
    this.props.postExecution(submitted).then(() => {
      this.context.router.push('/execution')
    });
  }

  render(){

    const groupArr =  _.valuesIn(this.props.groups)

    return (
      <div>
        <Link className="add-btn btn btn-success" to="/addGroup" ><i className="fa fa-plus"></i>Add Group</Link>
        <h1>Groups</h1>
        <table className="table table-responsive table-bordered table-condensed">
          <thead>
            <tr>
              <td>Name</td>
              <td>Queue</td>
              <td>Created At</td>
              <td>Execution Type</td>
              <td>Members</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.props.groups ? (groupArr.map((groups, i) => {
                return (
                  <tr key={i}>
                    <td>{groups.name}</td>
                    <td>{groups.queue}</td>
                    <td>{groups.createdAt}</td>
                    <td>{groups.executionType}</td>
                    <td>
                      {groups.members ? (groups.members.map((members, index) => {
                        return members.type === 'command' ?
                          <div className="alert alert-success" role="alert" key={index}>
                            <p>Type: {members.type}</p>
                            <p>{members._id}</p>
                          </div>
                          :
                          <div className="alert alert-warning" role="alert" key={index}>
                            <p>Type: {members.type}</p>
                            <p>{members._id}</p>
                          </div>
                      })) : ('No members found')}
                    </td>
                    <td>
                      <Link className="btn btn-sm btn-warning" >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <button onClick={() => this.deleteGroupEvent(groups._id)} className="btn btn-sm btn-danger">
                              <i className="fa fa-trash-o"></i>
                      </button>
                      <button onClick={() => this.executedGroupEvent(groups._id)} className="btn btn-sm btn-success">
                              <i className="fa fa-play-circle"></i>
                      </button>
                    </td>
                  </tr>
                )
            })) : (<tr></tr>)}
          </tbody>
        </table>
      </div>
    );
  }

}

Group.propTypes = {
  getGroups: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  refreshToken: React.PropTypes.func,
  getCommand: React.PropTypes.func.isRequired,
  deleteGroup: React.PropTypes.func.isRequired,
  postExecution: React.PropTypes.func.isRequired
}

Group.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return{
    groups: state.groupReducer.groups,
    links: state.groupReducer.links,
    errors: state.groupReducer.errors
  }
}

export default connect(mapStateToProps, { getGroups, refreshToken, getCommand, deleteGroup, postExecution })(Group)
