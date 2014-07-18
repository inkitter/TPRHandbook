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


	
$(window).load(
	function()
	{
		var boarddiv = "<div class=tooltip id=tooltipwindow>loading..</div>"; 
		var gtip="<div class=gtip2 id=gtw>ggg</div>"; 
		$(document.body).append(boarddiv); 
		$(document.body).append(gtip); 
		$("#gtw").load("00_index.htm #sddm");
		$("#tooltipwindow").hide();	
	}
)

	//创建Div并隐藏


$(document).ready(function()
{
	$("span").mousemove(function(e)
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
	})
	//鼠标移动查询并显示
	
	$("span").mouseout(function()
	{
		$("#tooltipwindow").hide();
		$("#tooltipwindow").html("");
	})
	//鼠标移出隐藏提示
	
})

function fdistype(sname,stype)
{

	return typefile;
}

function floadtxt(sname,stype)		//读取数据库
{
	var sout="";			//查询到的数据字符串
	var typefile="";		//文件名与路径
	var filepath="";
	var ftype="";		//记录json文件类别
	filepath="";		//自定义json路径
	switch (stype)
	{
		case "abEat":
		{
			typefile=filepath+"json_eat.json";
			ftype="药品";
			break;
		}
		case "abImportant":
		{
			typefile=filepath+"json_zhuangbei.json";
			ftype="任务物品";
			break;
		}
		case "abTianShu":
		{
			typefile=filepath+"json_zhuangbei.json";
			ftype="天书";
			break;
		}
		case "abZhuangBei":
		{
			typefile=filepath+"json_zhuangbei.json";
			ftype="装备";
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
			ftype="武功";
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
			typefile=filepath+"json_wugong.json";
			ftype="秘籍";
			break;
		}
		case "aaTianFu":
		{
			typefile=filepath+"json_tianfu.json";
			ftype="天赋";
			break;
		}
		case "aaChengHao":
		{
			typefile=filepath+"json_chenghao.json";
			ftype="称号";
			break;
		}
		default:
		{
			typefile=filepath+"json_zhuangbei.json";
			sout="notype";
			ftype="无类别";
			break;
		}
	}	//根据类型定义文件
	var vfound=false;
	$(document).ready(function() { 
		$.getJSON(typefile)
			.done(
				function(sdata)
				{
					$.each(
						sdata,
						function(k,v)
						{
							$.each(
								v,
								function(kk,vv)
								{
									switch(ftype)
									{
										case  "药品":
										case "装备":
										{
											if (kk=="物品名称")
											{
												if (vv==sname)
												{
													$.each(
														v,
														function(kkk,vvv)
														{
															if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
														}
													)
												}	//if(vv=sname)
											}
											break;
										}	//case 药品 装备
										
										case  "武功":
										{
											
											switch(kk)
											{
												case "名称":
												{
													if (vv==sname)
													{
														$.each(
															v,
															function(kkk,vvv)
															{
																if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
															}
														)
													}	//if(vv=sname)
													if (sout!="")  vfound=true;
													else vfound=false;
													break;
												}

												case "物品名称":
												{
													if (vv==sname && vfound==false)
													{
														$.each(
															v,
															function(kkk,vvv)
															{
																if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
															}
														)
														if (sout!="")  {vfound=true;ftype="秘籍";}
														else vfound=false;
														
													}	//if(vv=sname)
													break;
												}
											}
											break;
										}	//case 武功
										
										case  "秘籍":
										{
											switch(kk)
											{
												case "物品名称":
												{
													if (vv==sname&& vfound==false)
													{
														$.each(
															v,
															function(kkk,vvv)
															{
																if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
															}
														)
													}	//if(vv=sname)
												}
											}
											break;
										}	//case 秘籍
										
										case  "天赋":
										case "称号":
										{
											if (kk=="名称")
											{
												if (vv==sname)
												{
													$.each(
														v,
														function(kkk,vvv)
														{
															if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
														}
													)
												}	//if(vv=sname)
											}
											break;
										}	//case 天赋 称号
										
										default:
										{
											if (vv==sname)
											{
												$.each(
													v,
													function(kkk,vvv)
													{
														if (vvv != 0)		if (vvv !="")		sout = sout+ fsoutadd(kkk,vvv,stype);	
													}
												)
											}	//if(vv=sname)
										}	//case default
											break;
									}
								}	//function(kk,vv)
							)
						}	//function(k,v)
					)
					//历遍查找
					var perstring="查询：<b style='font-size:10px;'>["+ftype+"]</b>"+"<span class='"+stype+"' style='font-size:12px;'>"+sname+"</span><br/>";
					switch (sout)
					{
						case "":
						{
							switch(ftype)
							{
								case "任务物品":
								case "天书":
								{
									$("#tooltipwindow").html(perstring+sout);
									break;
								}
								default:
								{
									$("#tooltipwindow").html(perstring+"未找到");
									break;
								}
							}
							$("#tooltipwindow").show();
							break;
						}
						case "notype":
						{
							$("#tooltipwindow").html(perstring+"数据库无此类别");
							$("#tooltipwindow").show();
							break;
						}
						default:
						{
							$("#tooltipwindow").html(perstring+sout);
							$("#tooltipwindow").show();
							break;
						}
					}
				}	//function(sdata)
			)   //.done
			.fail(
				function()
				{
					sout=sout+"<br/>查询失败";
					$("#tooltipwindow").html("查询："+sname+"<br/>"+sout);
					$("#tooltipwindow").show();
				}	
			)	//.fail
	})
}

function fsoutadd(kkk,vvv,stype)
{
	var sout = kkk+":"+"<span class='"+stype+"' style='font-size:12px;'>"+vvv+"</span><br/>"
	return sout;
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

var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id)
{	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';

}
// close showed layer
function mclose()
{
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

// close layer when click-out
document.onclick = mclose; 