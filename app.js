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
            currentNote: notes.length ? notes.length-1 : null
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
                toggleEditor: this.toggleEditor,
                handleChange: this.handleNoteChange,
                createNote: this.createNewNote,
                deleteNote: this.deleteNote
            }),
            e(Editor, {note: note, onChange: this.handleChange}),
            e(Preview, {content: (note ? note.content : '#You have no notes')})
        );
    },
    handleChange: function(event) {
        this.state.notes[this.state.currentNote].content = event.target.value;
        this.setState({
            notes: this.state.notes
        });
        this.saveNotes(this.state.notes);
    },
    createNewNote: function() {
        var notes = this.state.notes;

        var title = prompt('Note title');

        if (title === null) return;

        var count = notes.push({title: title, content: ''});

        this.saveNotes(notes);

        this.setState({
            currentNote: count - 1
        });
    },
    deleteNote: function() {
        this.state.notes.splice(this.state.currentNote, 1);
        this.saveNotes(this.state.notes);
        var count = this.state.notes.length;
        this.setState({
            notes: this.state.notes,
            currentNote: count ? count -1 : null
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