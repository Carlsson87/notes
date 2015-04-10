// Alias some shiz.
var e = React.createElement;
// The markdown converter.
var converter = new Showdown.converter();

var exampleNotes = [
    {
        title: 'Example note',
        content: 'This is *markdown*'
    }
];

var Editor = React.createClass({
    render: function() {
        return (
            e('div', {className: 'note-editor'},
                e('textarea', {className: 'editor-textarea', value: this.props.note.content, onChange: this.props.onChange})
            )
        );
    },
    handleChange: function() {
        this.setState({value: React.findDOMNode(this.refs.textarea).value});
    },
});

var Preview = React.createClass({
    render: function() {
        return e('div', {
            className: 'note-preview',
            dangerouslySetInnerHTML: {
                __html: converter.makeHtml(this.props.content)
            }
        })
    }
});

/**
 * Application Component.
 */
var App = React.createClass({
    getInitialState: function() {
        return {
            notes: exampleNotes,
            currentNote: 0
        };
    },
    render: function () {
        var sidebarProps = {
            notes: this.state.notes
        };

        var note = this.state.notes[this.state.currentNote];

        return e('div', {style: {height: '100%'}}, 
            e('div', {className: 'navbar'}, e('span', {className: 'navbar-logo'}, 'Notes')),
            e('div', {className: 'content'},
                e(Editor, {note: note, onChange: this.handleChange}),
                e(Preview, {content: note.content})
            )
        );
    },
    handleChange: function(event) {

        this.state.notes[this.state.currentNote].content = event.target.value;

        this.setState({
            notes: this.state.notes
        });
    }
});

React.render(e(App, null), document.getElementById('app'));