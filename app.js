// Alias some shiz.
var e = React.createElement;

/**
 * Application Component.
 */
var App = React.createClass({
    getInitialState: function() {
        if (!localStorage.hasOwnProperty('notes')) {
            localStorage.setItem('notes', JSON.stringify([]));
        }
        var notes = JSON.parse(localStorage.getItem('notes'));

        return {
            notes: notes,
            currentNote: null,
            editorIsOpen: false
        };
    },
    render: function () {
        var note = this.state.notes[this.state.currentNote];
        return e('div', {

            // App attributes
        },

            // App children
            e(Navbar, {
                notes: this.state.notes,
                currentNote: this.state.currentNote,
                editorIsOpen: this.state.editorIsOpen,
                toggleEditor: this.toggleEditor,
                handleChange: this.handleNoteChange,
                createNote: this.createNewNote,
                deleteNote: this.deleteNote
            }),
            (this.state.editorIsOpen ? e(Editor, {note: note, onChange: this.handleChange}) : null ),
            e(Preview, {content: (note ? note.content : '#You have no notes')})
        );
    },
    handleChange: function(event) {
        this.state.notes[this.state.currentNote].content = event.target.value;
        this.setState({
            notes: this.state.notes
        });
    },
    toggleEditor: function() {

        if (this.state.editorIsOpen) {
            this.saveNotes(this.state.notes);
        }

        this.setState({
            editorIsOpen: !this.state.editorIsOpen
        });
    },
    createNewNote: function() {
        var notes = this.state.notes;

        var title = prompt('Note title');

        if (title === null) return;

        var count = notes.push({title: title, content: ''});

        this.saveNotes(notes);

        this.setState({
            currentNote: count - 1,
            editorIsOpen: true
        });
    },
    deleteNote: function() {
        this.state.notes.splice(this.state.currentNote, 1);
        this.saveNotes(this.state.notes);

        this.setState({
            notes: this.state.notes,
            editorIsOpen: false
        });

    },
    saveNotes: function(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    handleNoteChange: function(value) {    
        this.setState({
            currentNote: parseInt(value, 10)
        });
    }
});

React.render(e(App, null), document.getElementById('app'));