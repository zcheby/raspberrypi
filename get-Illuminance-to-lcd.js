// 1. mobile backendのSDKの読み込み
var NCMB = require("/home/pi/node_modules/ncmb");

// 2. mobile backendアプリとの連携
var ncmb = new NCMB(process.env.NCMB_APP_KEY, process.env.NCMB_CLIENT_KEY);

var Illuminance = ncmb.DataStore("Illuminance");

setInterval(function() {
	Illuminance.fetchAll()
		.then(function(results) {
			// 最新照度を取得
			var illuminance = results[results.length - 1].illuminance;
			var date = results[results.length - 1].date;
			console.log(illuminance);
			console.log(date);
		
			var exec = require('child_process').exec;
			var child;
			// LCDに照度を表示
			child = exec("python i2clcd.py " + "Illuminance" + " " + illuminance, function (error, stdout, stderr) {
				if (error != null) {
					console.log('exec error:' + error);
				}
			});
		});
}, 10000);