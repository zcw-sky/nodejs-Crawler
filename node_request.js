/**
*测试评论mooc
*/
var http=require('http');
var querystring=require('querystring');
//设置请求参数
var postData=querystring.stringify({
	'content':'Buffer.isBuffer(chunk) 我打印出来类型是string',
	'mid':'8837'
});
//设置头信息
var options = {
  hostname: 'www.imooc.com',
  port: 80,
  path: '/course/docomment',
  method: 'POST',
  headers: {
    'Accept':'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
	'Connection':'keep-alive',
	'Content-Length':postData.length,
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Cookie':'PHPSESSID=8ve06ttp393p1ccao0qm56aka2; imooc_uuid=8c4e17ef-b690-44a1-bb3b-9f7c26abb411; imooc_isnew=1; imooc_isnew_ct=1483667681; loginstate=1; apsid=EzZjhkMTE2MzhiNzQ3NzU3N2MyNjNiOTVhMDViNDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzI4MjU4NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4NDQ3MTQxMzNAcXEuY29tAAAAAAAAAAAAAAAAAAAAADY3MGU5M2Y1OTkyNjI0NzgzMmI2NTJhOWQwYjRiOThicVBvWHFQb1g%3DYW; last_login_username=844714133%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1483667683; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1483690107; cvde=586ef8e16b1a9-36',
	'Host':'www.imooc.com',
	'Origin':'http://www.imooc.com',
	'Referer':'http://www.imooc.com/video/8837',
	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest',
  }
};
//开始请求
var req = http.request(options, (res) => {
  console.log('STATUS:'+res.statusCode);
  console.log('HEADERS:'+JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('BODY:'+{chunk});    
    console.log(Buffer.isBuffer(chunk));
    console.log(typeof chunk);
  });
  res.on('end', () => {
    console.log('评论完毕');
  });
});

req.on('error', (e) => {
  console.log('problem with request: ${e.message}');
});

// write data to request body
req.write(postData);
req.end();