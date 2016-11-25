var async = require('async');
var request = require('request');
base = 'http://mabinogi.nexon.co.jp';
url = base + '/community/tradeBoardList.asp?sv=ta';

exports.handler = (event, context) => {
	console.log('====== CALLING LAMBDA FUNCTION: Kipi-Crawler ======');

	async.waterfall([
		function(callback) {
			console.log('===> ASYNC: HTTP REQUEST FUNCTION');
			request(url, (err, res, body) => {
				if (err || res.statusCode != 200) {
					console.log('ERROR: ' + res.statusCode);
					return;
				}
				callback(null, body);
			});
		},
		function(body, callback) {
			console.log('===> ASYNC: PARSE HTML BODY');
			var cheerio = require('cheerio');
			$ = cheerio.load(body, {decodeEntities: false});
			var docs = [];
			$('[class^="list-head"] ~ tr ').each(function() {
				title = $(this).find('[class^="list-title"] > p > a').text();
				url = base + $(this).find('[class^="list-title"] > p > a').prop('href');
				name = $(this).find('[class^="list-name"] > a').text();
				view = String(Number($(this).find('[class^="list-view"]').html()));

				//Trade ID
				m = url.match(/.*ix=(\d*)/);
				if (!m) { return; }
				trade_id = m[1];

				//Trade Type
				imgsrc = $(this).find('[class^="list-icn"] > img').prop('src');
				type = null;
				if (imgsrc.indexOf('trade_buy') >= 0) {
					type = 'TRADE_TYPE_BUY';
				} else if (imgsrc.indexOf('trade_sell') >= 0) {
					type = 'TRADE_TYPE_SELL';
				} else if (imgsrc.indexOf('trade_barter') >= 0) {
					type = 'TRADE_TYPE_BARTER';
				} else if (imgsrc.indexOf('trade_other') >= 0) {
					type = 'TRADE_TYPE_OTHER';
				}

				//Server
				server = null;
				imgsrc = $(this).find('[class^="list-server"] > img').prop('src');
				if (imgsrc.indexOf('tarlach') >= 0) {
					server = 'SERVER_TARLACH';
				} else if (imgsrc.indexOf('mari') >= 0) {
					server = 'SERVER_MARI';
				} else if (imgsrc.indexOf('ruairi') >= 0) {
					server = 'SERVER_RUAIRI';
				}

				docs.push({
					'trade_id':	{'N': trade_id},
					'type':		{'S': type},
					'title':	{'S': title},
					'url':		{'S': url},
					'name':		{'S': name},
					'server':	{'S': server},
					'view':		{'N': view},
				});
			});
			callback(null, docs);
		},
		function(docs, callback) {
			console.log('===> ASYNC: INSERT OR UPDATE TO DYNAMODB');
			var AWS = require('aws-sdk');
			AWS.config.loadFromPath('keys.json');
			AWS.config.update({region: 'ap-northeast-1'});
			var dynamodb = new AWS.DynamoDB();

			var errors = [];
			async.each(docs, function(doc, callback) {
				params = {
					TableName: 'mecha_pentagon',
					Item: doc,
				};
				dynamodb.putItem(params, function(err, data) {
					errors.push(err);
				});
			});
			callback(errors);

		},
	], function(errors) {
		console.log('====== FINISHED LAMBDA FUNCTION: Kipi-Crawler ======');
		console.log(errors);
		context.done(null, "Success!!");
	});
}
