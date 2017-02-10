import { getExecution } from '../../actions/executionActions'
import { refreshToken } from '../../actions/authActions'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from "react-router"
import Collapse, { Panel } from 'rc-collapse'
import Moment from 'react-moment';
import { getCommandById } from '../../actions/commandActions';
import { getGroupById } from '../../actions/groupActions';

class Execution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: false,
      activeKey: [0],
      time: 2,
      groupNames: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.redirecLog = this.redirecLog.bind(this);
  }

  componentWillMount(){
    this.props.getExecution().then(()=>{
      console.log('get Execution response: ', this.props);
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getExecution()
        })
      }

    });
  }

  onRefresh() {
    console.log('refresh triggered');
    this.props.getExecution().then(()=>{
      console.log('get Execution response: ', this.props);
      if(this.props.errors.code === 'UNAUTHORIZED'){
        this.props.refreshToken().then(() => {
          this.props.getExecution()
        })
      }

    });
  }

  onChange(activeKey) {
    this.setState({
      activeKey
    });
  }

  generateCommandName(commandId) {
    this.props.getCommandById(commandId).then(() => {

    });
  }

  redirecLog() {

  }

  generateGroupName(groupId) {
    this.props.getGroupById(groupId).then(() => {
      return this.props.group.name
    });
  }

  millisToMinutesAndSeconds(millis) {
   let minutes = Math.floor(millis / 60000);
   let seconds = ((millis % 60000) / 1000).toFixed(0);
   return minutes + " min :" + (seconds < 10 ? '0' : '') + seconds + "sec";
  }

  getGroups(groupsArr) {
    const items = [];

    if(groupsArr) {
      groupsArr.map((groups, i) => {
        const statusClass = this.setStatusClass(groups.status);
        items.push(
          <Panel header={
            <span>{groups._id}
              <span className={`label ${statusClass} pull-right`}>{groups.status}</span>
              <span><i className="fa fa-calendar-o"></i> <Moment>{groups.startedAt}</Moment></span>
              <span><i className="fa fa-clock-o"></i> {this.millisToMinutesAndSeconds(groups.elapsedTime)}</span>
            </span>

          } key={i}>
              {groups.members ? (
                <Collapse defaultActiveKey="0">
                  {this.getMembers(groups.members)}
                </Collapse>
              ) : (<p></p>)}
          </Panel>
        )
      });
    }

    return items;
  }

  getMembers(membersArr) {
    const items = [];

    if(membersArr){
      membersArr.map((members, i) => {
        const statusClass = this.setStatusClass(members.status);
        items.push(
          <Panel header={
            <span>{members._id}
              {members.log ? (
                <span> <a onClick={() => this.redirecLog.bind(this)}  href={members.log} target="_blank">Logs</a></span>
              ) : (<span></span>)}
              <span className={`label ${statusClass} pull-right`}>{members.status}</span>
              <span><i className="fa fa-calendar-o"></i> <Moment>{members.startedAt}</Moment></span>
              <span><i className="fa fa-clock-o"></i> {this.millisToMinutesAndSeconds(members.elapsedTime)}</span>
            </span>
          } key={i}>
              {members.type === 'group' ? (
                <Collapse defaultActiveKey="0">
                  {this.getGroups(members.members)}
                </Collapse>
              ) : (<p></p>)}
          </Panel>
        )
      });
    }

    return items;
  }

  setStatusClass(status) {
    let statusClass = ''
    switch (status) {
      case 'SUCCEEDED':
          statusClass = "label-success";
        break;
      case 'FAILED':
          statusClass = "label-danger";
        break;
      case 'STARTED':
          statusClass = "label-warning";
        break;
      case 'PENDING':
          statusClass = "label-info";
        break;
      case 'QUEUED':
          statusClass = "label-primary";
        break;
      default:
    }

    return statusClass;
  }

  getItems() {
    const items = [];

    if(this.props.executions){

      this.props.executions.map((executions, i) => {
        const statusClass = this.setStatusClass(executions.status.status);
        items.push(
          <Panel header={
              <span>{executions.status._id}
                <span className={`label ${statusClass} pull-right`}>{executions.status.status}</span>
                <span><i className="fa fa-calendar-o"></i> <Moment>{executions.status.startedAt}</Moment></span>
                <span><i className="fa fa-clock-o"></i> {this.millisToMinutesAndSeconds(executions.status.elapsedTime)}</span>
              </span>
              } key={i}>
              {executions.status.members ? (
                <Collapse defaultActiveKey="0">
                  {this.getMembers(executions.status.members)}
                </Collapse>
              ) : (<p></p>)}
          </Panel>
        )
      })
    }

    return items;
  }


  render(){

    const activeKey = this.state.activeKey;
    const accordion = this.state.accordion;

    return (
      <div className="Execution">
        <button className="add-btn btn btn-info" onClick={this.onRefresh.bind(this)} ><i className="fa fa-refresh"></i> Refresh</button>
        <h1>Executions</h1>
        <Collapse
          accordion={accordion}
          onChange={this.onChange}
          activeKey={activeKey}
        >
          {this.getItems()}
        </Collapse>
      </div>
    );
  }
}

Execution.propTypes = {
  getExecution: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
  refreshToken: React.PropTypes.func,
  getCommandById: React.PropTypes.func,
  getGroupById: React.PropTypes.func
}

Execution.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return{
    executions: state.executionReducer.executions,
    errors: state.executionReducer.errors,
    links: state.executionReducer.links,
    command: state.commandReducer.command,
    group: state.groupReducer.group
  }

}

export default connect(mapStateToProps, { getExecution, refreshToken, getCommandById, getGroupById })(Execution);
