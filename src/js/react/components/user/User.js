import { connect } from 'react-redux';
import UserList from './UserList';

class User extends React.Component {

  render(){
    return (
      <div>
        <h1>User</h1>
      </div>
    );
  }
}

User.propTypes = {
  users: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return{
    users: state.user
  }
}

export default connect(mapStateToProps)(User)
