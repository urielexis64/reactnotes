import React, { Component } from 'react';
import './App.css';
import Note from './Note/Note'
import NoteForm from './NoteForm/NoteForm'

import firebase from 'firebase'
import { DB_CONFIG } from './config/config'
import 'firebase/database'

class App extends Component {

  constructor() {
    super();
    this.state = {
      notes: [
      ]
    };

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent,
        noteColor: snap.val().noteColor
      })
      this.setState({ notes });
    });

    this.db.on('child_removed', snap => {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].noteId === snap.key) {
          notes.splice(i, 1);
        }
      }
      this.setState({ notes });
    });

  }

  removeNote(noteId) {
    this.db.child(noteId).remove();
  }

  addNote(note, color) {
    /* let{notes} = this.state;
    notes.push({
      noteContent: note,
      noteId: notes.length+1
    }); 
    this.setState({notes});*/
    this.db.push().set({
      noteContent: note,
      noteColor: color
    });
  }

  removeAll() {
    const response = window.confirm('Are you sure?');
    if (!response) return;
    firebase.database().ref('notes').remove();
    this.setState({
      notes: []
    });
  }


  render() {
    return (
      <div className="notesHeader">
        <div>
          <h1>Quick Notes</h1>
          <button id='borrarTodo' onClick={this.removeAll}>Remove all</button>
        </div>
        <div className="notesBody">
          <ul>
            {
              this.state.notes.map(note => {
                return (
                  <Note
                    noteContent={note.noteContent}
                    noteId={note.noteId}
                    key={note.noteId}
                    noteColor={note.noteColor}
                    removeNote={this.removeNote}
                  />
                )
              })
            }
          </ul>
        </div>

        <div className="notesFooter">

          <NoteForm
            addNote={this.addNote}
          />
        </div>

      </div>
    );
  }
}

export default App;
