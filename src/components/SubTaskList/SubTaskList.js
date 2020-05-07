import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSubtasks } from '../../redux/actions/subtasks';

import './SubTaskList.css';

import TaskItem from '../TaskItem/TaskItem';
import SubTaskInput from '../SubTaskInput/SubTaskInput';

import { getSubtaskList } from '../../redux/selectors';

class SubTaskList extends Component {

    componentDidMount() {
        this.props.getSubtasks();
    }

    renderSubtasks = (subtasks) => { 
        return subtasks && Object.keys(subtasks).length > 0
        ? Object.keys(subtasks).map( id => ( 
            <TaskItem key={`${subtasks[id].id}.${subtasks[id].title}`} task={subtasks[id]} subtask/>
        ))
        : null
    }

    render() { 
        const { subtasks } = this.props;
        return ( 
            <div className='subtaskList'>
                { this.renderSubtasks(subtasks) }
                <SubTaskInput />
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        subtasks: getSubtaskList(state)
    }
}
 
export default connect(mapStateToProps, { getSubtasks })(SubTaskList);