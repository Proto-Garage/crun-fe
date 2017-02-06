import TextFieldGroup from '../common/TextFieldGroup';
import { postUser } from '../../actions/userAction';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getRoles} from '../../actions/roleActions';
import _ from 'lodash';

class AddUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      roles: [],
      isLoading: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logChange = this.logChange.bind(this);

  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    console.log('submit data: ', this.state);

    let data = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.postUser(data).then(() => {
        if(this.props.errors.message){
          this.setState({errors: this.props.errors, isLoading: false});
          this.props.refreshToken().then(() => {
            this.props.postUser()
          })
        }else{
          this.context.router.push('/users')
        }
      }
    );
  }

  logChange(val) {
      console.log("Selected: " + val);
  }

  componentWillMount(){
    this.props.getRoles().then(() => {
      console.log('this role props: ', this.props)
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getRoles()
        })
      }
    })
  }

  render(){

    const { username, password, role, isLoading, errors } = this.state;

    const roleArr = _.valuesIn(this.props.roles);

    const options =  [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two', clearableValue: false }
    ];

    return(
      <div className="col-md-6 col-md-offset-3">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="username"
            label="Username"
            value={username}
            error={errors.username}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
          />

          <div className="form-group"><button className="btn btn-primary" disabled={isLoading}>Create User</button></div>
        </form>
      </div>
    )
  }

}

AddUser.propTypes = {
  postUser: React.PropTypes.func,
  errors: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  getRoles: React.PropTypes.func.isRequired,
}

AddUser.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.userReducer.errors,
    id: state.userReducer.id,
    roles: state.roleReducer.roles
  }
}

export default connect(mapStateToProps, { postUser, getRoles })(AddUser);
