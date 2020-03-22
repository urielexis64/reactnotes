import React, { Component } from 'react';
import './Note.css'

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteId = props.noteId;
        this.noteContent = props.noteContent;
        this.noteColor = props.noteColor;        
    }

    handleRemove = id => {
        const response = window.confirm("Are you sure?");
        if (response)
            this.props.removeNote(id);
    }   

    render() {
        return (
            <div style={{backgroundColor: this.noteColor}} className="Note">
                <p>{this.noteContent}</p>
                <span
                    onClick={() => this.handleRemove(this.noteId)}>&times;</span>
            </div>
        );
    }
}

export default Note;