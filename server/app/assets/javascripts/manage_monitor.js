$.getJSON("/api/monitor/get").then(data => {
	ReactDOM.render(
		<MonitorTable monitors={data.monitors}/>,
		document.getElementById("content")
	);
});
