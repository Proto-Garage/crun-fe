import TextFieldGroup from '../common/TextFieldGroup';
import { createCommand } from '../../actions/commandActions';
import { connect } from 'react-redux';
import { refreshToken } from '../../actions/authActions'

class AddCommand extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      command: '',
      cwd: '',
      isLoading: false,
      errors: {},
      env: [{
        key: '',
        value: ''
      }],
      changedValues: [{
        env: {}
      }]
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      env: [{
        [e.target.name]: e.target.value
      }]
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log('submit data: ', this.state);

    let data = {
      name: this.state.name,
      command: this.state.command,
      cwd: this.state.cwd
    }

    this.props.createCommand(data).then(() => {
        if(this.props.errors.code === 'UNAUTHORIZED'){
          this.props.refreshToken().then(() => {
            this.props.createCommand(data)
          })
        }else if(this.props.errors.code === 'INVALID_REQUEST'){
          this.setState({
            errors: this.props.errors,
            isLoading: false
          })
        }else{
          this.context.router.push('/commands')
        }
      }
    );
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

  render(){

    const { name, command, cwd, isLoading, errors, env, timeout  } = this.state;

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

                console.log('this.state', this.state.env);

                return (
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <input type="text" onChange={this.onChange} value={env.key} className="form-control" name={"value"+index} />
                      </div>
                      <div className="col-md-8">
                        <input type="text" onChange={this.onChange} value={env.value} className="form-control" name={"value"+index} />
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
