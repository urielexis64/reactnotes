import React, { Component } from 'react';
import './Note.css';
import Modal from 'react-modal';

import firebase from 'firebase'
import 'firebase/database'

class Note extends Component {

    state = {
        modalIsOpen: false
    }

    constructor(props) {
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
        this.noteColor = props.noteColor;
        this.db = firebase.database().ref().child('notes');
    }

    handleRemove = id => {
        const response = window.confirm("Are you sure?");
        if (response)
            this.props.removeNote(id);
    }

    setModalState(state) {
        this.setState({
            modalIsOpen: state
        });
    }

    updateNoteContent(noteId, newContent, color) {
        this.db.on('child_changed', snap => {
            this.noteContent = snap.val().noteContent;
            this.noteColor = snap.val().noteColor;
        });
        this.db.child(noteId).update({
            noteContent: newContent,
            noteColor: color
        });
        this.setModalState(false);
    }

    render() {
        return (
            <div>
                <div style={{ backgroundColor: this.noteColor }} className="Note">
                    <p>{this.noteContent}</p>
                    <span
                        onClick={() => this.handleRemove(this.noteId)}>&times;</span>
                    <span
                        onClick={() => this.setModalState(true)}>Edit</span>
                </div>
                <Modal
                    className="Modal"
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.setModalState(false)}
                >
                    <h1>Edit note</h1>
                    <div>
                        <textarea
                            id="txtEditInput"
                            ref={input => { this.textInput = input; }}
                            type="text">
                            {this.noteContent}
                        </textarea>
                        <input
                            defaultValue={this.noteColor}
                            id="modalcolor"
                            ref={colorInput => { this.colorInput = colorInput; }}
                            type="color"
                        />
                    </div>

                    <button
                        className="modalbtn save"
                        onClick={() => this.updateNoteContent(this.noteId, this.textInput.value, this.colorInput.value)}>
                        Close and Save
                    </button>
                    <button
                        className="modalbtn close"
                        onClick={() => this.setModalState(false)}>
                        Close
                    </button>

                </Modal>
            </div>
        );
    }
}

export default Note;