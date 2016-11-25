var AWS = require('aws-sdk');

AWS.config.loadFromPath('keys.json');
AWS.config.update({region: 'ap-northeast-1'});

var dynamodb = new AWS.DynamoDB();
var params = {Limit: 100};
dynamodb.listTables(params, (err, data) => {
	if (err) {
		console.log(err, err.stack);
	} else {
		console.log(data);
	}
});
