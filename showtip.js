function len(s) { return s.length }
function left(s, n) { return s.substr(0, n) }
function right(s, n) { return s.substr(-n) }
function mid(s, n, m) { return s.substr(n+1, m) }
function instr(s, find) { return s.indexOf(find) + 1 }

if (typeof(jQuery)=="undefined"){
    var eleM=document.createElement("script");	
    eleM.type = "text/javascript";
    eleM.src = "/jquery.js";
    pageHeader.appendChild(eleM);
}	//判断jQuery是否加载

{
var boarddiv = "<div class=tooltip id=tooltipwindow>loading..</div>"; 
$(window).load(function(){
	$(document.body).append(boarddiv); 
});
$("#tooltipwindow").hide();
}	//创建Div并隐藏

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
				$("#tooltipwindow").css({top:e.pageY+5,left:e.pageX+15}).show();		//移入显示提示
				floadtxt(sname,stype);
			}
		)
		$("span").mouseout(	
			function()
			{
				$("#tooltipwindow").hide();
				$("#tooltipwindow").html("");
			}		//移出隐藏提示
		)
	}
)

function fshowtipwin(sname,stype)		//显示提示框
{
	var e=event||window.event;
	var tip=document.getElementById("tooltipwindow"); 
	tip.style.top=e.clientY;
	tip.style.left=e.clientX+10;
	tip.style.visibility = "visible";
	//显示提示框并根据鼠标移动
	
	//if (!sname){sname="null";}
	//判断参数是否为空
	
	floadtxt(sname,stype);	//调用读取数据库
}

function floadtxt(sname,stype)		//读取数据库
{
	var sout="";
	var typefile="json";
	var filepath="./";
	switch (stype)
	{
		case "abEat":
		{
			typefile=filepath+"json_eat.json";
			break;
		}
		case "abZhuangBei":
		{
			typefile=filepath+"json_zhuangbei.json";
			break;
		}
		case "abImportant":
		{
			typefile=filepath+"json_zhuangbei.json";
			break;
		}
		case "aaNeiGong":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaQingGong":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaQuanZhang":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaYuJian":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaBingQi":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaZhiTui":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		case "aaAnDu":
		{
			typefile=filepath+"json_wugong.json";
			break;
		}
		default:
		{
			typefile=filepath+"json_wugong.json";
			sout="nofile";
			break;
		}
	}
	$.getJSON(typefile,function(sdata){
		$.each(sdata,function(k,v){
			$.each(v,function(kk,vv){
				if (vv==sname)
					{
						$.each(v,function(kkk,vvv){
							if (vvv != 0)
							{
								if (vvv !="")
								{
									sout = sout+ kkk+": <span class=&quot"+stype+"&quot>"+vvv+"</span>"+"<br/>";
								}
							}
						})
					}
			})
		})
		if (!sout)
			{
				sout="nodata";
			}
		else
			{
				$("#tooltipwindow").show();
			}
		//sout = "file:" + typefile + "(" + stype + ")" + "<br/>" + sout;
		$("#tooltipwindow").html(sout);
		},
		function(json)
		{
		}
	)
	
	sout="";

}


function ftiptxt(tiptxt)	//在提示框显示内容
{
	//var showt=tiptxt.物品名称+tiptxt.序号;
	$("#tooltipwindow").html(tiptxt);
}



function fhidetip()			//隐藏提示框
{
	var tip=document.getElementById("tooltipwindow");  
	tip.style.visibility = "hidden";
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