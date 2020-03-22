import React, { Component } from 'react';
import './NoteForm.css';

export default class NoteForm extends Component {

    constructor(params) {
        super(params);
    }

    render() {
        return (
            <div className="NoteForm">
                <input type="text" />
                <button>
                    Add Note
                </button>

            </div>
        )
    }
}
