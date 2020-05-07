import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DragSource } from 'react-dnd';
import { createComponent } from 'effector-react';
import { tasks, selectedTask } from '../../redux/store';
import { selectTask, completeTask, deleteTask } from '../../redux/events/tasks';
import { completeSubtask, deleteSubtask } from '../../redux/events/subtasks';

import './TaskItem.css';

import CompleteTaskButton from '../CompleteTaskButton/CompleteTaskButton';
import DeleteTaskButton from '../DeleteTaskButton/DeleteTaskButton';

function throttle(func, ms) {

    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

function generatePlaceholder(item) {
    const placeholder = document.createElement('div');
    placeholder.id = 'drag-placeholder';
    placeholder.style.cssText =
        `display:none;
         position:fixed;
         z-index:100000;
         pointer-events:none;
         border:4px solid lightblue;
         border-radius:20px;
         padding:8px;
         width:10%;
         text-align:center;
         font-size:18px`;
        
    placeholder.innerHTML = ReactDOMServer.renderToStaticMarkup(<div>{item.task.title}</div>);
    return placeholder;
}

function createMouseMoveHandler() {
  let currentX = -1;
  let currentY = -1;

  return function(event) {
    let newX = event.clientX - 8;
    let newY = event.clientY - 2;

    if (currentX === newX && currentY === newY) {
      return;
    }

    const dragPlaceholder = document.getElementById('drag-placeholder');
    const transform = 'translate(' + newX + 'px, ' + newY + 'px) rotate(3deg)';

    if(dragPlaceholder){ dragPlaceholder.style.transform = transform; }
    if(dragPlaceholder){ dragPlaceholder.style.display = 'block'; }
  };
}

const mouseMoveHandler = createMouseMoveHandler();

const throttledMoveHandler = throttle(createMouseMoveHandler(), 16);

const taskSource = {
    beginDrag(props) {
        document.addEventListener('dragover', throttledMoveHandler);
        document.body.insertBefore(
          generatePlaceholder(props),
          document.body.firstChild
        );
        return props;
    },
    endDrag(props, monitor) {
        document.removeEventListener('dragover', throttledMoveHandler);
        let child = document.getElementById('drag-placeholder');
        child.parentNode.removeChild(child);

        if (!monitor.didDrop()) {
            return;
        }
    }
}

function collect(connect, monitor) {
    return {
      dragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }
}

const TaskItem = createComponent(
    selectedTask,
    (props, selectedTask) => {

        const onCompleteTask = (task) => {
            if(subtask) {
                completeSubtask(task);
            } else {
                completeTask(task);
            }
        }
    
        const onDeleteTask = (taskId) => {
            if(subtask) {
                deleteSubtask(taskId);
            } else {
                deleteTask(taskId);
                if(selectedTask && taskId === selectedTask.id) {
                    selectTask(null);
                }
    
            }
        }
    
        const onTaskSelect = (task) => {
            if(!selectedTask || task.id !== selectedTask.id) {
                selectTask(task);
            }
        }
    
        const { task, subtask } = props;
        const className = `taskItem${task.completed?' completedTask':''}`;
        return (
            props.dragSource( 
                <div style={{opacity: props.isDragging ? 0.5 : 1}}>
                    <div className={className}>
                        <CompleteTaskButton
                            onClick={() => onCompleteTask(task)}
                        />
                        <div
                            className='taskTitle'
                            onClick={() => {!subtask && onTaskSelect(task)} }                   
                        >
                            {task.title}
                        </div>
                        <DeleteTaskButton
                            onClick={() => onDeleteTask(task.id)}
                        />
                    </div>
                </div>
            )
        );
    }
);
 
export default DragSource('TASK', taskSource, collect)(TaskItem);

selectedTask.on(
    selectTask,
    (state, payload) => {
        return payload;
    }
)

tasks.on(
    completeTask,
    (state,payload) => {
        return {
            ...state,
            [payload.id]: {
                ...state[payload.id],
                completed: !state[payload.id].completed
            }
        }
    }
)

tasks.on(
    deleteTask,
    (state,payload) => {
        const result = {};
        Object.keys(state).forEach( taskId => {
            if(taskId !== payload) {
                result[taskId] = state[taskId];
            }
        });
        return result;
    }
)