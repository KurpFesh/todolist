import React, { Component } from 'react';

import Modal from '../Modal/Modal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import './AddTaskButton.css';

class AddTaskButton extends Component {
    state = { 
        modal: false
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() { 
        return (
            <div className='addTaskButton'>
                <button onClick={this.toggleModal}>
                    Add task
                </button>
                {
                    this.state.modal 
                    && <>
                        <Modal onClose={this.toggleModal}>
                            <AddTaskForm onClose={this.toggleModal} />
                        </Modal>
                    </>
                }
            </div>
         );
    }
}

export default AddTaskButton;