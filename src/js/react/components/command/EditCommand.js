import TextFieldGroup from '../common/TextFieldGroup';
import { patchCommand, getCommandById } from '../../actions/commandActions';
import { connect } from 'react-redux';

class EditCommand extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      commandId: '',
      name: '',
      command: '',
      cwd: '',
      isLoading: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

  }

  componentWillMount(){
    this.props.getCommandById(this.props.params.commandId);
  }

  render(){

    const { name, command, cwd, isLoading, errors } = this.state

    return(
      <div className="col-md-6 col-md-offset-3">
        <h1>Update Command</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="name"
            label="Name"
            defaultValue={this.props.commands.name}
            value={name}
            error={errors.name}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="command"
            label="Command"
            value={command}
            error={errors.command}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="cwd"
            label="CWD"
            value={cwd}
            onChange={this.onChange}
          />
          <div className="form-group"><button className="btn btn-primary" disabled={isLoading}>Create Command</button></div>
        </form>
      </div>
    )
  }

}

EditCommand.propTypes = {
  patchCommand: React.PropTypes.func,
  getCommandById: React.PropTypes.func.isRequired
}

EditCommand.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.commandReducer.errors,
    command: state.commandReducer.command
  }
}

export default connect(mapStateToProps, { patchCommand, getCommandById })(EditCommand);
