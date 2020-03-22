import React, { Component } from 'react';
import './NoteForm.css';

export default class NoteForm extends Component {

    constructor() {
        super();
        this.addNote = this.addNote.bind(this);
    }

    addNote() {
        const noteText = this.textInput.value;
        const colorInput = this.colorInput.value;
        if (noteText.trim() === '') {
            return;
        }

        this.props.addNote(noteText, colorInput);
        this.textInput.value = '';
        this.textInput.focus();
    }

    render() {
        return (
            <div className="NoteForm">
                <input
                    id="txtInput"
                    ref={input => { this.textInput = input; }}
                    placeholder="Write a note"
                    type="text"
                />

                <input
                    id="color"
                    ref={colorInput => { this.colorInput = colorInput; }}
                    type="color"
                />

                <button
                    onClick={this.addNote}>
                    Add Note
                </button>

            </div>
        )
    }
}
