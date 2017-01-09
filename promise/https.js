var https=require('https');

var fs=require('fs');

var options={
	key:'key.pem',
	cert:'cert.pem'
};

https.createServer(options,function(req,res) {
	// body...
	res.writeHead(200);
	res.end('hellow nodejs success');
}).listen(8066);