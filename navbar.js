var Navbar = React.createClass({
	render: function() {
		var options = this.props.notes.map(function(note, index){
			return e('option', {value: index}, note.title);
		});

		var note = this.props.notes[this.props.currentNote];
		return e('div', {

			// Navbar attributes
			id: 'navbar'
		},
			// Navbar children
			e('span', {className: 'navbar-note-title'}, (note ? note.title : 'Click "New" to create a note -->')),
			e('div', {className: 'navbar-controls'},
				e('select', {onChange: this.handleSelectChange, style: {marginRight: 20, display: (this.props.notes.length ? 'inline-block' : 'none')}}, options),
				e('button', {onClick: this.props.createNote}, 'New'),
				e('button', {onClick: this.props.toggleEditor, disabled: !this.props.notes.length}, (this.props.editorIsOpen ? 'Save' : 'Edit')),
				e('button', {onClick: this.props.deleteNote, disabled: !this.props.notes.length}, 'Delete')
			)
		);
	},
	handleSelectChange: function(event) {
		var value = event.target.value;
		this.props.handleChange(value);
	}
});