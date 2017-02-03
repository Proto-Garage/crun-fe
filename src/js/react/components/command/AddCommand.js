import TextFieldGroup from '../common/TextFieldGroup';
import { createCommand } from '../../actions/commandActions';
import { connect } from 'react-redux';

class AddCommand extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
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
    this.props.createCommand(this.state).then(
      (res) => this.context.router.push('/commands')
    );
  }

  render(){

    const { name, command, cwd, isLoading, errors } = this.state;

    return(
      <div className="col-md-6 col-md-offset-3">
        <h1>Create Command</h1>
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
          <div className="form-group"><button className="btn btn-primary" disabled={isLoading}>Create Command</button></div>
        </form>
      </div>
    )
  }

}

AddCommand.propTypes = {
  createCommand: React.PropTypes.func,
  errors: React.PropTypes.object.isRequired,
  id: React.PropTypes.string
}

AddCommand.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.commandReducer.errors,
    id: state.commandReducer.id
  }
}

export default connect(mapStateToProps, { createCommand })(AddCommand);
