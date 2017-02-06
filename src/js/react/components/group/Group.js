import { getGroups } from '../../actions/groupActions'
import { refreshToken } from '../../actions/authActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from "react-router"

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

  render(){


    return (
      <div>
        <h1>Groups</h1>
        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <td>Name</td>
              <td>Created At</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }

}

Group.propTypes = {
  getGroups: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  refreshToken: React.PropTypes.func
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

export default connect(mapStateToProps, { getGroups, refreshToken })(Group)
