//引入http模块
var http=require('http');
var cheerio=require('cheerio');
var url='http://www.imooc.com/learn/637';
/**
*处理获取到的html数据
*/
function filterHtml(html){
	//console.log(html);
	var $=cheerio.load(html);
	//找到每一章
	var chapter=$('.chapter');
	//console.log(chapter);
	// [{
	// 	stitle:'',
	// 	viode:[
	// 		title:'',
	// 		id:''
	// 	]
	// }]
	var sumData=[];//总数据
	chapter.each(function(msg){
		//获取每一章的标题
		var bigtitle=$(this).find('strong').text();
		// console.log('------');
		// console.log(bigtitle);
		// console.log('******');
		var oneData={
			stitle:bigtitle,
			video:[]
		};
		//获取每一章中的视频列表
		var list=$(this).find('.video').children('li');
		list.each(function(msg){
			//获取每节课的标题
			var title=$(this).find('.J-media-item').text();
			//获取每节课的id
			var id=$(this).find('.J-media-item').attr('href').split('video/')[1];
			var onePro={'title':title,'id':id};
			//console.log(title+' '+id+'\n');
			//将列表数组添加到对象中
			oneData.video.push(onePro);
		});
		//将对象添加到大数组中
		sumData.push(oneData);
	});
	//返回处理过的数组
	return sumData;
}
/**
*显示处理后的数据
*/
function showHtml(filterParam){
	//显示每章信息
	filterParam.forEach(function(item){
		//console.log(item.video);
		var stitle=item.stitle;
		// var id=item.video.id;
		// var title=item.video.title;
		console.log(stitle+'\n');
		//显示列表信息
		item.video.forEach(function(value){
			console.log('['+value.id+'] '+value.title+'\n');

		});
		
	});
}

http.get(url,function(res) {
	//声明一个空变量
	var html='';
	//当response有data事件触发的时候，将数据追加到html中
	//data事件不断的被触发，数据不断累加，就获取到了html、
	res.on('data',function(data){
		html+=data;
	});
	//当数据处理完后触发end事件，打印出数据
	res.on('end',function(){
		var filterParam=filterHtml(html);
		//console.log(filterParam);
		showHtml(filterParam);
	});
}).on('error',function(){
	//error事件，获取异常，比如超时
	console.log('获取远程数据超时');
});