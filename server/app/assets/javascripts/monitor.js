const MonitorTable = props => {
	return <table>
		<thead>
			<tr>
				<th>Account Name</th>
				<th>Account Type</th>
				<th>Monitor Word</th>
				<th>Active</th>
				<th><button>Add</button></th>
			</tr>
		</thead>
		{props.monitors.map((monitor, i) => <MonitorRow key={i} monitor={monitor}/>)}
	</table>;
};

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
