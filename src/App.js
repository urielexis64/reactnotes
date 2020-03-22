import React from 'react';
import './App.css';
import Note from './Note/Note'
import NoteForm from './NoteForm/NoteForm'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      notes: [
        { noteId: 1, noteContent: 'note 1' },
        { noteId: 2, noteContent: 'note 2' },
        { noteId: 3, noteContent: 'note 3' },
        { noteId: 4, noteContent: 'note 4' }
      ]
    };
  }

  removeNote(){
    
  }


  render() {
    return (
    <div className="notesHeader">
        <div>
          <h1>React y Firebase App</h1>
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
                  />
                )
              })
            }
          </ul>
        </div>

        <div className="notesFooter">

            <NoteForm/>
        </div>

      </div>
    );
  }
}

export default App;
