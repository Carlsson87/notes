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
			e('h3', {className: 'navbar-note-title', style: {display: 'inline'}}, (note ? note.title : 'Click "New" to create a note -->')),
			e('div', {className: 'navbar-controls'},
				e('select', {
					onChange: this.handleSelectChange,
					style: {marginRight: 20, display: (this.props.notes.length ? 'inline-block' : 'none')},
					value: this.props.currentNote
				}, options),
				e('div', {className: 'btn-group'},
					e('button', {className:'btn btn-primary', onClick: this.props.createNote}, 'New note'),
					e('button', {className:'btn btn-danger', onClick: this.props.deleteNote, disabled: !this.props.notes.length}, 'Delete')
				)
			)
		);
	},
	handleSelectChange: function(event) {
		var value = event.target.value;
		this.props.handleChange(value);
	}
});