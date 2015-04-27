// The markdown converter.
var converter = new Showdown.converter();

var Preview = React.createClass({
    render: function() {
        return e('div', {id: 'preview'},
            e('div', {id: 'preview-md', dangerouslySetInnerHTML: {
                __html: converter.makeHtml(this.props.content)
            }})
        )
    }
});