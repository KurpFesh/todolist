import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

import './Modal.css';

const Modal = (props) => {
    const { onClose, children } = props;
    return (
        <>
            <Backdrop onClick={onClose} />
            <div className='modal'>
                { children }
            </div>
        </> 
    );
}
 
export default Modal;