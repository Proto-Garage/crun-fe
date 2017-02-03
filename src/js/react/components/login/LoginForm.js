import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../server/validations/login';
import { connect } from 'react-redux';
import { login, isLoginned } from '../../actions/authActions';
import _ from 'lodash';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      inputError: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { inputError, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ inputError });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(()=>{
        if(this.props.errors.message){
          this.setState({errors: this.props.errors, isLoading: false});
        }else{
          this.context.router.push('/')
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { inputError, username, password, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.message && <div className="alert alert-danger">{errors.message}</div> }

        <TextFieldGroup
          field="username"
          label="Username"
          value={username}
          error={inputError.username}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={inputError.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.auth.errors
  }
}

export default connect(mapStateToProps, { login })(LoginForm);
