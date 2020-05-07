import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNotes, addNotes, saveNotes } from '../../redux/actions/notes';

import { getNote } from '../../redux/selectors';

import './NotesInput.css';

class NotesInput extends Component {
    state = { 
        inputValue: '',
        isChangable: false
    }

    componentDidMount() {
        this.props.getNotes();
    }

    componentWillReceiveProps(newProps) {
        this.setDefaultInputValue(newProps.note); 
    }

    onInputChange = (event) => {
        this.setState({ inputValue: event.target.value})
    }

    onSubmitHandle = (event) => {
        event.preventDefault();

        const { note, addNotes, saveNotes } = this.props;
        const { inputValue } = this.state;
        if( !note.id ) {
            addNotes({
                text: inputValue,
                taskId: note.taskId 
            });
        } else {
            saveNotes(note, inputValue);
        }
        this.onFocusLost();
    }

    editNotes = () => {
        this.setState({ isChangable: true });
    }

    onFocusLost = () => {
        this.setState({ isChangable: false });
    }

    renderNotes = (note, isChangable) => {
        return (
            (isChangable || !note.text)
            ?   <form onSubmit={this.onSubmitHandle}>
                    <input
                        autoFocus
                        value={this.state.inputValue}
                        onChange={this.onInputChange}
                        onBlur={this.onFocusLost}
                    />
               </form>
            :   <div>
                    <p onClick={this.editNotes}>
                        {note.text}
                        <span className='hint'> (click to edit)</span>
                    </p>
                </div>

        );
    }

    setDefaultInputValue = (note) => {
        if( note.text!==undefined && note.text !== this.state.inputValue) 
            {
                this.setState({ inputValue: note.text });
            }
    }

    render() { 
        const { note } = this.props;
        const { inputValue, isChangable } = this.state;
        return ( 
            <div className='notesInput'>
                <h4>Notes:</h4>
                { this.renderNotes(note, isChangable)}
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        note: getNote(state)
    }
}
 
export default connect(mapStateToProps, { getNotes, addNotes, saveNotes })(NotesInput);