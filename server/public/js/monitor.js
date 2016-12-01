const MonitorTable = React.createClass({displayName: "MonitorTable",
	render() {
		return React.createElement("table", {id: "table"}, 
			React.createElement("thead", null, 
				React.createElement("tr", null, 
					React.createElement("th", null, "Account Name"), 
					React.createElement("th", null, "Account Type"), 
					React.createElement("th", null, "Monitor Word"), 
					React.createElement("th", null, "Active"), 
					React.createElement("th", null, React.createElement("button", {onClick: this.newRowClick}, "Add"))
				)
			), 
			this.props.monitors.map((monitor, i) => React.createElement(MonitorRow, {key: i, monitor: monitor}))
		);
	},

	newRowClick(e) {
		return React.createElement("tbody", null, 
			React.createElement("tr", null, 
				React.createElement("td", null, React.createElement("input", {type: "text"})), 
				React.createElement("td", null, React.createElement("input", {type: "text"})), 
				React.createElement("td", null, React.createElement("input", {type: "text"})), 
				React.createElement("td", null, React.createElement("input", {type: "checkbox", defaultChecked: "true"})), 
				React.createElement("td", null)
			)
		);
	},
});

const MonitorRow = props => {
	const monitor = props.monitor;
	return React.createElement("tbody", null, 
		React.createElement("tr", null, 
			React.createElement("td", null, monitor.AccountName), 
			React.createElement("td", null, monitor.AccountType), 
			React.createElement("td", null, monitor.Word), 
			React.createElement("td", null, React.createElement("input", {type: "checkbox", defaultChecked: monitor.Active}))
		)
	);
};

const NewRow = props => {
	return React.createElement("tbody", null, 
		React.createElement("tr", null, 
			React.createElement("td", null, React.createElement("input", {type: "text"})), 
			React.createElement("td", null, React.createElement("input", {type: "text"})), 
			React.createElement("td", null, React.createElement("input", {type: "text"})), 
			React.createElement("td", null, React.createElement("input", {type: "checkbox", defaultChecked: "true"})), 
			React.createElement("td", null)
		)
	);
};
