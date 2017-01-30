
export default class User extends React.Component {

  render(){
    return (
      <div>
        <table className="table table-responsive">
          <thead>
            <tr><td>Username</td>
              <td>Created At</td>
              <td>Roles</td>
              <td>Action</td>
            </tr></thead>
          <tbody>
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
            </tr></tbody>
        </table>
        <div className="row">
          <div className="col-sm-2">
            <button className="btn btn-sm btn-success"><i className="fa fa-plus" /> Add User</button>
          </div>
        </div>
      </div>
    );
  }
}
