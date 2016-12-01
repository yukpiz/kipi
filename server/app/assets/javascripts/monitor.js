const MonitorTable = React.createClass({
	render() {
		return <table id="table">
			<thead>
				<tr>
					<th>Account Name</th>
					<th>Account Type</th>
					<th>Monitor Word</th>
					<th>Active</th>
					<th><button onClick={this.newRowClick}>Add</button></th>
				</tr>
			</thead>
			{this.props.monitors.map((monitor, i) => <MonitorRow key={i} monitor={monitor}/>)}
		</table>;
	},

	newRowClick(e) {
		return <tbody>
			<tr>
				<td><input type="text"/></td>
				<td><input type="text"/></td>
				<td><input type="text"/></td>
				<td><input type="checkbox" defaultChecked="true"/></td>
				<td></td>
			</tr>
		</tbody>;
	},
});

const MonitorRow = props => {
	const monitor = props.monitor;
	return <tbody>
		<tr>
			<td>{monitor.AccountName}</td>
			<td>{monitor.AccountType}</td>
			<td>{monitor.Word}</td>
			<td><input type="checkbox" defaultChecked={monitor.Active}/></td>
		</tr>
	</tbody>;
};

const NewRow = props => {
	return <tbody>
		<tr>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="checkbox" defaultChecked="true"/></td>
			<td></td>
		</tr>
	</tbody>;
};
