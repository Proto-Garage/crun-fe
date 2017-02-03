import { getCommand, deleteCommand } from '../../actions/commandActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from "react-router";

class Command extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: []
    };

  }

  componentWillMount(){
    this.props.getCommand();
  }

  deleteCommandEvent(data){
    this.props.deleteCommand(data).then(() => {
      this.props.getCommand();
    });
  }


  render(){

    const commandArr = _.valuesIn(this.props.commands);

    return (
      <div className="command">
        <Link className="add-btn btn btn-success" to="/addCommand" ><i className="fa fa-plus"></i>Add Command</Link>
        <table className="table table-bordered table-compresed table-responsive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Command</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            commandArr.map((commands, i) => {
              return (
                <tr key={i}>
                   <td>{commands.name}</td>
                   <td>{commands.command}</td>
                   <td>
                    <Link className="btn btn-sm btn-warning" to={`/editCommand/${commands._id}`} >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <button onClick={() => this.deleteCommandEvent(commands._id)} className="btn btn-sm btn-danger">
                            <i className="fa fa-trash-o"></i>
                    </button>
                   </td>
               </tr>
              )

             })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

Command.propTypes = {
  getCommand: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  deleteCommand: React.PropTypes.func.isRequired

}

Command.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return{
    commands: state.commandReducer.commands,
    errors: state.commandReducer.errors,
    links: state.commandReducer.links
  }

}

export default connect(mapStateToProps, { getCommand, deleteCommand })(Command);
