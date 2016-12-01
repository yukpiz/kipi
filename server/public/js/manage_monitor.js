$.getJSON("/api/monitor/get").then(data => {
	ReactDOM.render(
		React.createElement(MonitorTable, {monitors: data.monitors}),
		document.getElementById("content")
	);
});
