import { getUsers } from '../../actions/userActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from "react-router";

export default function UserList({ users }) {

  const message = (
    <tr>No Users Found</tr>
  );

  const userList = (
    <tr><td>user123</td>
      <td>01/01/2016</td>
      <td>
        <span className="label label-success">Admin</span>
        <span className="label label-default">Frontend</span>
      </td>
      <td>
        <button className="btn btn-warning">
          <i className="fa fa-pencil" />
        </button>
        <button className="btn btn-danger">
          <i className="fa fa-trash-o" />
        </button>
      </td>
    </tr>
  )

  return(
    <table className="table table-responsive">
      <thead>
        <tr><td>Username</td>
          <td>Created At</td>
          <td>Roles</td>
          <td>Action</td>
        </tr></thead>
      <tbody>
        {users.length === 0 ? message : userList}
      </tbody>
    </table>
  )
}

UserList.propTypes = {
  users: React.PropTypes.array.isRequired
}
