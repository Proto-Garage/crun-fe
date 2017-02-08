import TextFieldGroup from '../common/TextFieldGroup';
import Select from 'react-select';
import { postGroup, getGroups } from '../../actions/groupActions';
import { connect } from 'react-redux';
import { refreshToken } from '../../actions/authActions';
import ReactSelect from 'react-select';
import { getCommand } from '../../actions/commandActions';
import _ from 'lodash'

class AddGroup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      errors: {},
      commandOptions: [],
      commandValues: [],
      groupOptions: [],
      groupValues: []
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectGroupChange = this.handleSelectGroupChange.bind(this);
  }

  componentWillMount(){

    this.props.getCommand().then(()=>{
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getCommand()
        })
      }
      const commandOptionArr = [];
      this.props.commands.map((commands, index) => {
        commandOptionArr.push({label: commands.name, value: commands._id})
      });
      this.setState({commandOptions: commandOptionArr})
    });

    this.props.getGroups().then(() => {
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getGroups()
        })
      }
      console.log('this.props.groups: ', this.props.groups);
      const groupOptionArr = [];
      this.props.groups.map((groups, index) => {
        groupOptionArr.push({label: groups.name, value: groups._id})
      });
      console.log('groupOptionArr: ', groupOptionArr);
      this.setState({groupOptions: groupOptionArr})
    });

  }

  handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ commandValues: value });
	}

  handleSelectGroupChange (value) {
    console.log('You\'ve selected:', value);
		this.setState({ groupValues: value });
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    const membersArr = [];

    if(this.state.commandValues != ""){
      const submittedCommands = this.state.commandValues.split(",");
      submittedCommands.map((command, i) => {
        membersArr.push({
          _id: command,
          type: "command"
        })
      });
    }

    if(this.state.groupValues != ""){
      const submittedGroups = this.state.groupValues.split(",");
      submittedGroups.map((group, i) => {
        membersArr.push({
          _id: group,
          type: "group"
        })
      });
    }


    let data = {
      name: this.state.name,
      queue: this.state.queue,
      executionType: this.state.executionType,
      enabled: this.state.enable,
      members: membersArr
    }

    console.log('submitted data', data);

    this.props.postGroup(data).then(() => {
        if(this.props.errors.code === 'UNAUTHORIZED'){
          this.props.refreshToken().then(() => {
            this.props.postGroup(data)
          })
        }else if(this.props.errors.code === 'INVALID_REQUEST'){
          this.setState({
            errors: this.props.errors,
            isLoading: false
          })
        }else{
          this.context.router.push('/groups')
        }
    });

  }


  render(){

    const { name, queue, executionType, enable, members, isLoading, errors } = this.state;

    return(
      <div className="col-md-6 col-md-offset-3">
        <form onSubmit={this.onSubmit}>

          { errors.message && <div className="alert alert-danger">{errors.message}</div> }

          <TextFieldGroup
            field="name"
            label="Name"
            value={name}
            error={errors.name}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="queue"
            label="Queue"
            value={queue}
            error={errors.queue}
            onChange={this.onChange}
          />

          <div className="form-group">
            <label className="control-label">Execution Type</label>
            <select onChange={this.onChange} name="executionType" className="form-control">
              <option value="series">Series</option>
              <option value="parallel">Parallel</option>
            </select>
          </div>

          <div className="form-group">
            <label className="control-label">Enable</label>
            <input onChange={this.onChange} type="radio" name="enable" id="" value="true" />Yes
            <input onChange={this.onChange} type="radio" name="enable" id="" value="false" />No
          </div>

          <div className="form-group">
            <label className="control-label">Members</label>
          </div>

          <div className="form-group">
            <label className="control-label">Commands</label>
            <Select multi simpleValue disabled={this.state.disabled} value={this.state.commandValues}
            placeholder="Select Commands" options={this.state.commandOptions} onChange={this.handleSelectChange} />
          </div>

          <div className="form-group">
            <label className="control-label">Group</label>
            <Select multi simpleValue disabled={this.state.disabled} value={this.state.groupValues}
            placeholder="Select Groups" options={this.state.groupOptions} onChange={this.handleSelectGroupChange} />
          </div>

          <div className="form-group"><button className="btn btn-primary" disabled={isLoading}>Create Group</button></div>
        </form>
      </div>
    )
  }

}

AddGroup.propTypes = {
  postGroup: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  getCommand: React.PropTypes.func.isRequired,
  getGroups: React.PropTypes.func.isRequired,
  label: React.PropTypes.string
}

AddGroup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.groupReducer.errors,
    id: state.groupReducer.id,
    commands: state.commandReducer.commands,
    errors: state.commandReducer.errors,
    groups: state.groupReducer.groups
  }
}

export default connect(mapStateToProps, { postGroup, getCommand, getGroups })(AddGroup);
