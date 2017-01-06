var http=require('http');
var cheerio=require('cheerio');
var encoding=require('encoding');
var url='http://www.xinruijunshi.com/dljq/index.shtml';
/**
*格式化内容
*/
function filterHtml(html){

	var $=cheerio.load(html);
	var object=$('#wramp');
	var bTitle=object.find('.forum_name').text();
	var list=object.children('.con');
	var sumData={
		'bTitle':bTitle,
		'lists':[]
	};
	list.each(function(msg){
		$(this).find('ul li').each(function(datas){
			var title=$(this).find('.title a').text();
			var time=$(this).find('.date').text();
			var obj={'title':title,'time':time};
			sumData.lists.push(obj);
		});
	});
	//console.log(sumData);
	return sumData;
}

/**
*显示格式化后的内容
*/
function showHtml(formatHtml){
	//console.log(formatHtml);
	console.log(formatHtml.bTitle+'\n');
	formatHtml.lists.forEach(function(item){
		console.log(item.title+'\t'+item.time+'\n');
	});
}
//回调方法可以用json格式去表示
http.get(url,(res)=>{
	var html='';
	//当response有data事件触发的时候，将数据追加到html中
	//data事件不断的被触发，数据不断累加，就获取到了html、
	res.on('data',function(data){
		//如果是gbk的，必须在这里处理字符串,将gb2312转化成utf-8
		//如果是utf8的就不必转了
		data=encoding.convert(data,'utf-8','gb2312');
		html+=data;
	});
	//当数据处理完后触发end事件，打印出数据
	res.on('end',function(){
		var formatHtml=filterHtml(html);	
		showHtml(formatHtml);
		//console.log(html);
	});
}).on('error',function(){
	console.log('远程获取数据超时');
});