import TextFieldGroup from '../common/TextFieldGroup';
import { postRole } from '../../actions/roleActions';
import { connect } from 'react-redux';

class AddRole extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
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
    this.setState({ isLoading: true });
    console.log('submit data: ', this.state);

    this.props.postRole(this.state).then(() => {
        if(this.props.errors.message){
          this.setState({errors: this.props.errors, isLoading: false});
        }else{
          this.context.router.push('/roles')
        }
      }
    );
  }

  componentWillMount() {

  }

  render(){

    console.log('edit role props: ', this.props);

    const { name, isLoading, errors } = this.state;

    return(
      <div className="col-md-6 col-md-offset-3">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="name"
            label="Name"
            value={name}
            error={errors.name}
            onChange={this.onChange}
          />
          <div className="form-group">
            <button className="btn btn-warning" disabled={isLoading}>
            <i className="fa fa-save"></i> Update Role</button>
          </div>
        </form>
      </div>
    )
  }

}

AddRole.propTypes = {
  postRole: React.PropTypes.func,
  errors: React.PropTypes.object.isRequired,
  id: React.PropTypes.string
}

AddRole.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    errors: state.roleReducer.errors,
    id: state.roleReducer.id
  }
}

export default connect(mapStateToProps, { postRole })(AddRole);
