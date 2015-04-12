var Editor = React.createClass({
    render: function() {
        return (
            e('div', {id: 'editor'},
                e('textarea', {className: 'editor-textarea', value: this.props.note.content, onChange: this.props.onChange})
            )
        );
    },
    handleChange: function() {
        this.setState({value: React.findDOMNode(this.refs.textarea).value});
    },
});