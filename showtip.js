//function len(s) { return s.length }
//function left(s, n) { return s.substr(0, n) }
//function right(s, n) { return s.substr(-n) }
//function mid(s, n, m) { return s.substr(n+1, m) }
//function instr(s, find) { return s.indexOf(find) + 1 }

if (typeof(jQuery)=="undefined")
{
    var eleM=document.createElement("script");	
    eleM.type = "text/javascript";
    eleM.src = "/jquery.js";
    pageHeader.appendChild(eleM);
}	
//判断jQuery是否加载

{
var boarddiv = "<div class=tooltip id=tooltipwindow>loading..</div>"; 
$(window).load(function(){
	$(document.body).append(boarddiv); 
});
$("#tooltipwindow").hide();
}	
//创建Div并隐藏


$(document).ready(
	function()
	{
		$("span").mousemove(
			function(e)
			{
				var sname=event.srcElement.innerText;
				var stype=event.srcElement.className;
				
				if (sname.substr(0)=="[", sname.substr(sname.length-1)=="]")
				{
					sname=cutstr(sname,"[","]");
				}
				//判断有无[]并获取内容
				
				floadtxt(sname,stype);		
				
				if  (e.clientX+300>window.innerWidth)
				{
					$("#tooltipwindow").css({left:e.clientX-$("#tooltipwindow").width()-20});
				}
				else
				{
					$("#tooltipwindow").css({left:e.clientX+5});
				}
				if  (e.clientY+$("#tooltipwindow").height()>window.innerHeight)
				{
					$("#tooltipwindow").css({top:e.pageY-$("#tooltipwindow").height()-20});
				}
				else
				{
					$("#tooltipwindow").css({top:e.pageY+5});
				}
				//防止弹出框超出窗口
				
			}//鼠标移动查询并显示
		)
		$("span").mouseout(	
			function()
			{
				$("#tooltipwindow").hide();
				$("#tooltipwindow").html("");
			}		//鼠标移出隐藏提示
		)
	}
)


function floadtxt(sname,stype)		//读取数据库
{
	var sout="";
	var typefile="";
	var filepath="";
	switch (stype)
	{
		case "abEat":
		{
			typefile=filepath+"json_eat.json";
			break;
		}
		case "abZhuangBei":
		case "abImportant":
		{
			typefile=filepath+"json_zhuangbei.json";
			break;
		}
		case "aaNeiGong":
		case "aaQingGong":
		case "aaQuanZhang":
		case "aaYuJian":
		case "aaBingQi":
		case "aaZhiTui":
		case "aaAnDu":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "abNeiGong":
		case "abQingGong":
		case "abQuanZhang":
		case "abYuJian":
		case "abBingQi":
		case "abZhiTui":
		case "abAnDu":
		{
			typefile=filepath+"json_miji.json";
			break;
		}
		default:
		{
			typefile=filepath+"json_zhuangbei.json";
			sout="";
			break;
		}
		//根据类型定义文件
		
	}
	$.getJSON(typefile,function(sdata){
		$.each(sdata,function(k,v){
			$.each(v,function(kk,vv){
				if (vv==sname)
					{
						$.each(v,function(kkk,vvv){
							if (vvv != 0)
							{
								if (vvv !="")			//判断项目是否控制，若空就不显示在提示里
								{
									sout = sout+ kkk+": <span class=&quot"+stype+"&quot>"+vvv+"</span>"+"<br/>";
								}
							}
						})
					}
			})
		})				//历遍查找
		if (sout=="")
		{
			$("#tooltipwindow").html("查询："+sname+"<br/>"+"未找到");
			$("#tooltipwindow").show();
			//$("#tooltipwindow").hide();
		}		//未找到显示提示或隐藏提示
		else
		{
			$("#tooltipwindow").html("查询："+sname+"<br/>"+sout);
			$("#tooltipwindow").show();
		}		//找到数据显示提示
		},
		function(json)
		{
		}		//getJSON结束return F
	)
	sout="";
}

function cutstr(text,start,end)
{
	var s = text.indexOf(start)
	if(s>-1)
	{
		var text2 = text.substr(s+start.length);
		var s2 = text2.indexOf(end);
		if(s2>-1)
		{
			result = text2.substr(0,s2);
		}
		else result = '';
	}
	else result = '';
	return result;
}