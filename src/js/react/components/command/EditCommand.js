import TextFieldGroup from '../common/TextFieldGroup';
import { patchCommand } from '../../actions/commandActions';
import { connect } from 'react-redux';

class EditCommand extends React.Component {


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

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

EditCommand.PropTypes = {
  patchCommand: React.PropTypes.func,
  errors: React.PropTypes.object.isRequired,
  id: React.PropTypes.string
}

EditCommand.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.commandReducer.errors,
    id: state.commandReducer.id
  }
}

export default connect(mapStateToProps, { patchCommand })(EditCommand);
