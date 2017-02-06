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
      errors: {},
      env: [{
        key: '',
        value: ''
      }]
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.patchCommand(this.state).then(() => {
      if(this.props.errors.message){

      }else{
        this.context.router.push('/commands')
      }
    });
  }

  addEnv(e) {
    e.preventDefault();
    this.setState({
      env: this.state.env.concat({
        key: '',
        value: ''
      })
    })
  }

  removeEnv(e) {
    e.preventDefault();
    this.setState({
      env: this.state.env.splice(index, 1)
    })
  }

  componentWillMount(){
    this.props.getCommandById(this.props.params.commandId).then(() => {
      this.setState({
        commandId: this.props.params.commandId,
        name: this.props.command.name,
        command: this.props.command.command,
        cwd: this.props.command.cwd,
        env: this.props.command.env,
        timeout: this.props.command.timeout
      })
    })
  }

  render(){

    const { name, command, cwd, isLoading, errors, env, timeout } = this.state

    return(
      <div className="col-md-6 col-md-offset-3">
        <h1>Update Command</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="name"
            label="Name"
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

          <div className="form-group">
            <label className="control-label">ENV</label>

            {
              this.state.env.map((env, index) => {

                this.onChange = this.onChange.bind(this);

                return (
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <input type="text" onChange={this.onChange} className="form-control" value="" name="key" />
                      </div>
                      <div className="col-md-8">
                        <input type="text" onChange={this.onChange} className="form-control" value="" name="value" />
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <button onClick={this.addEnv.bind(this)} className="btn pull-right btn-success">Add ENV</button>
              <button onClick={this.removeEnv.bind(this)} className="btn pull-right btn-danger">Remove</button>
            </div>
          </div>

          <TextFieldGroup
            field="timeout"
            label="Timeout"
            value={timeout}
            onChange={this.onChange}
          />

          <div className="form-group">
            <label className="control-label">Enable</label>
            <input type="radio" name="enable" id="" value="true" />Yes
            <input type="radio" name="enable" id="" value="false" />No
          </div>

          <div className="form-group">
            <button className="btn btn-warning" disabled={isLoading}>
              <i className="fa fa-save"></i> Update Command
            </button>
          </div>
        </form>
      </div>
    )
  }

}

EditCommand.propTypes = {
  patchCommand: React.PropTypes.func.isRequired,
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
