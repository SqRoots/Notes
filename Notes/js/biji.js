var thisPath="";
$(document).ready(function(){
	//生成－左侧－分类树
	var today = new Date();
	var froHTML="<ul class='ulItems'>",
		preR=0,
		curR=0,
		nexR=0,
		ii=0,
		iBlank1="icon-folder-close-alt",
		iBlank2="icon-folder-open-alt",
		iClose="icon-folder-close",
		iOpen="icon-folder-open";
	//加载分类树，并生成分类树
	$.getJSON("./post/ContentsTree.json?t="+today.getDate()+Math.random(),function(result){
		$.each(result, function(i,rs){
			curR=rs[1];
			if (ii++<result.length-1) {nexR=result[ii][1]} else {nexR=1}
			if (curR==nexR){
				froHTML+="<li class='Rank"+curR+"' id='li"+i+"' src='./post/"+rs[4]+"'><a class='normal Rank"+curR+"'><i aria-hidden='true' class='"+iBlank2+"'></i><span class='ContentsTree'>"+rs[3]+"</span></a></li>\n";
			}else if (curR<nexR){
				froHTML+="<li class='Rank"+curR+"' id='li"+i+"' src='./post/"+rs[4]+"'><a class='hide Rank"+curR+"'><i aria-hidden='true' class='"+iClose+"'></i><span class='ContentsTree'>"+rs[3]+"</span></a><ul class='hide'>\n";
			}else{
				froHTML+="<li class='Rank"+curR+"' id='li"+i+"' src='./post/"+rs[4]+"'><a class='normal Rank"+curR+"'><i aria-hidden='true' class='"+iBlank2+"'></i><span class='ContentsTree'>"+rs[3]+"</span></a></li>\n"+closeTag(curR,nexR);
			}
		});
		froHTML+="</ul>";
		$("#i-items").html(froHTML+"<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>");
		
		//左侧－分类树：单击被折叠的连接
		$("a.hide").click(function(){
			$("a.normal").removeAttr("style");
			$("a.hide").removeAttr("style");
			$(this).css("color","#00c");
			
			$(this).parent().children("ul.hide").first().slideToggle(100);
			
			if ($(this).children("i").hasClass(iClose)) {
				$(this).children("i").first().removeClass(iClose);
				$(this).children("i").first().addClass(iOpen);
			}else{
				$(this).children("i").first().removeClass(iOpen);
				$(this).children("i").first().addClass(iClose);
			}
			
			thisPath=$(this).parent().attr("src");
			setCookie("cLeft",thisPath,1000);																//设置Cookie
			$("div.content").load(thisPath+"?"+Math.random(),function(){afterLoad(thisPath);});				//加载笔记内容
			document.body.scrollTop=0;
		});
		
		//左侧－分类树：单击普通连接
		$("a.normal").click(function(){
			$("a.normal").removeAttr("style");
			$("a.hide").removeAttr("style");
			$(this).css("color","#00c");
			thisPath=$(this).parent().attr("src");
			setCookie("cLeft",thisPath,1000);																//设置Cookie
			$("div.content").load(thisPath+"?"+Math.random(),function(){afterLoad(thisPath);});				//加载笔记内容
			document.body.scrollTop=0;
		});
	});

	//加载：主体－内容
	var filePath=checkCookie();
	if (filePath.cLeft==""){
		$("div.content").load("./post/00_Home/00_Home.html?"+Math.random(),function(){afterLoad("./post/00_Home/")});
	}else{
		var simplifyPath=(filePath.cLeft).replace(/[^/]*\.html$/,"");
		$("div.content").load(filePath.cLeft+"?"+Math.random(),function(){
			afterLoad(simplifyPath);																					//正文加载后要执行的任务
			$("li[src='"+filePath.cLeft+"'] a").css("color","#00c");													//高亮左侧目录中上次访问的项目
			$("li[src='"+filePath.cLeft+"']").parents("ul.hide").each(function(i,myul){$(myul).slideToggle(100)});		//展开左侧目录中上次访问的项目
			document.body.scrollTop=filePath.cRight;																	//滚动到上次访问的位置
			});
	}


	$('div#content').css('background',filePath.background);													//设置Cookie——背景色
	
	
	//=====================================
	//设置高宽
	var BodyHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	document.getElementById("c-head").style.minHeight=BodyHeight+"px";
	document.getElementById("c-body").style.minHeight=BodyHeight+"px";
	document.getElementById("ContentsTree").style.minHeight=BodyHeight+"px";
	document.getElementById("content").style.minHeight=BodyHeight-40+"px";
	document.getElementById("i-items").style.height=BodyHeight-25+"px";

});
//end--$(document).ready



//函数
//展开所有折叠的－左侧－分类树
function openAll(){
	var iClose="icon-folder-close",
		iOpen="icon-folder-open";
	$("ul.hide").slideDown(200);
	$("ul.ulItems").find("i").removeClass(iClose);
	$("ul.ulItems").find("i").addClass(iOpen);
};

//折叠所有展开的－左侧－分类树
function closeAll(){
	var iClose="icon-folder-close",
		iOpen="icon-folder-open";
	$("ul.hide").slideUp(200);
	$("ul.ulItems").find("i").removeClass(iOpen);
	$("ul.ulItems").find("i").addClass(iClose);
};

//计算－左侧－分类树－需要的关闭标签
function closeTag(p,c){
	var myTag="";
	for (var i=p;i>c;i--){
		myTag+="</ul></li>"
	}
	return myTag+"\n";
};

//左侧－分类树：是否添加特殊标志
function LeftSign(n){
	switch (n){
		case 1:
			return("<i aria-hidden='true' class='icon-thumbs-up-alt'></i>");
		case 2:
			return("<i aria-hidden='true' class='icon-warning-sign'></i>");
		default:
			return("");
	}
};

//文章－目录：生成函数，仅前3级
function contentsGen(){
	var myhtml=new Array(),
		hol=new Array(0,0,0),
		tag="";
	$("div.content").find("h1,h2,h3").each(function(i,hn){
		tag=$(hn).get(0).tagName;
		if (tag=="H1"){
			hol[0]+=1;
			hol.splice(1,2,0,0);
			myhtml[i]="<li class='contentA1' href='#"+hn.getAttribute("id")+"'><span class='hol'>"+hol.slice(0,1).join(".")+"</span><span class='hco'>"+$(hn).text()+"</span></a><br/>";
		}else if (tag=="H2"){
			hol[1]+=1;
			hol.splice(2,1,0);
			myhtml[i]="<li class='contentA2' href='#"+hn.getAttribute("id")+"'><span class='hol'>"+hol.slice(0,2).join(".")+"</span><span class='hco'>"+$(hn).text()+"</span></a><br/>";
		}else if (tag=="H3"){
			hol[2]+=1;
			myhtml[i]="<li class='contentA3' href='#"+hn.getAttribute("id")+"'><span class='hol'>"+hol.join(".")+"</span><span class='hco'>"+$(hn).text()+"</span></a><br/>";
		}
	});
	$("#ArticleContents").html("<center style='font-size:18px;font-weight:bold;font-family:'Microsoft Yahei'>文章目录</center><br/>"+myhtml.join(""));

	$("div.content").find("a").each(function(i,na){$(na).attr("target","_blank")});		//在新窗口打开链接
};

//当滚动屏幕时，高亮当前文章目录
var tt,aFlag=0;
function currentHn(){
	var documentationPanes = $.makeArray($("div.content").find("h1,h2,h3,h4,h5,h6")).reverse();
	$("#ArticleContents").find("li[href]:first").css("color","#00c");
	$(window).on("scroll", function() {
		$("#ArticleContents").find("li").removeAttr("style","color");
		$.each(documentationPanes,function(i,ai){
			var offset = $(ai).offset();
			if (offset.top <= window.scrollY+10||i==documentationPanes.length-1) {
				$("#ArticleContents").find("li[href='#" + $(ai).attr("id") + "']").css("color","#00c");
				setCookie("cRight",document.body.scrollTop,1000);			//设置Cookie
				
				//高亮文章中的标题
				/*
				if (aFlag==0){
					tipEnd();
					$(ai).css("background","#ee5");
					$(ai).nextUntil("h6,h5,h4,h3,h2,h1").css("background","#eea");
					clearTimeout(tt);
					tt=setTimeout("tipEnd()",500);
				}
				*/
				return false;
			}
		});
	});
}



//提醒目录在文章中的位置
var thisID="",t;
function aClick(){
	$("li.contentA1,li.contentA2,li.contentA3,li.contentA4,li.contentA5,li.contentA6").click(function(){
		aFlag=1;
		thisID=$(this).attr("href");
		tipEnd();
		document.body.scrollTop=$(thisID).offset().top;
		clearTimeout(t);
		t=setTimeout("tipBack(thisID)",100);
	});
}
function tipBack(thisID){	
		$(thisID).css("background","#ee5");
		$(thisID).nextUntil("h6,h5,h4,h3,h2,h1").css("background","#eea");
		clearTimeout(t);
		t=setTimeout("tipEnd()",500);
		aFlag=0;
}
function tipEnd(){
	$("div.content").find("h1,h2,h3,h4,h5,h6,table,img,p,blockquote,li,ul,ol,a,pre").removeAttr("style");
}


//修正图片地址
function correctimgsrc(imgPath){
	$("div.content").find("img").each(function(i,imgn){
		$(imgn).attr("src","./"+imgPath.replace(/[^/]*\.html$/,"")+$(imgn).attr("src"));
	});
	
}

//加载文章后的操作
function afterLoad(thisPath){
	contentsGen();
	currentHn();
	correctimgsrc(thisPath);
	$("pre.mathematica").addClass("prettyprint lang-mma");
	$("pre.mma").addClass("prettyprint lang-mma");
	$("pre.sql").addClass("prettyprint lang-sql");
	if($("pre.mma").length+$("pre.mathematica").length>0){
		jQuery.getScript("./plugs/google-code-prettify/mma/lang-mma.js",function(){prettyPrint();});
	}else{
		prettyPrint();
	};
	
	aClick();
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"content"]);
	
	if ($("div#content").text()==""){$("div#content").html("<h1>请点击子文件夹</h1>")};							//如果内容为空，设置默认值
}

//导航折叠按钮动画
function colorShow(){
	$("#backgroudColors").css({
		"width":"60px",
		"height":"115px",
		"opacity":"1"
	});
}
function colorClose(){
	 $("#backgroudColors").css({
		 "width":"0",
		 "height":"0",
		 "opacity":"0"
	});
}


//Cookies
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function checkCookie(){
	cLeftValue=getCookie('cLeft');
	cRightValue=getCookie('cRight');
	background=getCookie('background');
	cLeftValue=(cLeftValue!=null) ? cLeftValue : "";
	cRightValue=(cRightValue!=null) ? cRightValue : "";
	background=(background!=null) ? background : "";
	return	{
		"cLeft":cLeftValue,
		"cRight":cRightValue,
		"background":background
	};
}