var Editor = React.createClass({
    render: function() {
        var note = this.getNote();
        return (
            e('div', {id: 'editor'},
                e('textarea', {
                    className: 'editor-textarea',
                    value: note.content,
                    onChange: this.props.onChange,
                    placeholder: 'This is where you write markdown'
                }),
                e('button', {className: 'btn btn-danger', onClick: this.props.deleteNote}, 'Delete')    
            )
        );
    },
    handleChange: function() {
        this.setState({value: this.refs.textarea.getDOMNode().value});
    },
    getNote: function() {
        if (this.props.note) {
            return this.props.note;
        }

        return {
            title: 'No notes',
            content: '# You have no notes'
        };
    }
});