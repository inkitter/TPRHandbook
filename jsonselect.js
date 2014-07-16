/**
 * JSON Select v0.0.1 (2012/7/16)
 *   By etherdream
 */
(function() {
	var __proto = Object.prototype;

	//
	// 模板: __tmpl
	// 参数: $C
	// 说明: 记录并返回_list对象中匹配$C的元素集合
	//
	var __tmpl = function(_list) {
		var _ret = [];
		var _i = -1;

		for(var _k in _list) {
			var _e = _list[_k];
			
			if(_e && _e != __proto[_k]) {
				if($C)
					_ret[++_i] = _e;
			}
		}
		return _ret;

	}.toString();


	//
	// 常用函数
	//
	function len(s) { return s.length }
	function left(s, n) { return s.substr(0, n) }
	function right(s, n) { return s.substr(-n) }
	function mid(s, n, m) { return s.substr(n+1, m) }
	function instr(s, find) { return s.indexOf(find) + 1 }


	//
	// 扩展运算符
	//
	var __alias = [
		/@/g,			'_e.',	// 用 @ 访问子元素属性
		/<>/g,			'!=',	// 可以用 <> 代替 !=
		/AND/gi,		'&&',	// 可以用 AND 代替 &&
		/OR/gi,			'||',	// 可以用 OR 代替 ||
		/NOT/gi,		'!',	// 可以用 NOT 代替 !
		/([^=<>])=([^=]|$)/g, '$1==$2'
								// 可以用 = 代替 ==，但不影响原先的"==", "<=", ">="
	];

	var __rQuote = /""/g;
	var __rQuoteTmp = /!~/g;


	//
	// 将查询字符解释成js代码
	//
	function __interpret(exp) {
		//
		// 不解释字符串文本
		//   字符串包括在"..."内
		//   连续两个""转义成一个"
		//
		exp = exp.replace(__rQuote, '!~');

		var arr = exp.split('"');
		var i, n = arr.length;
		var k = __alias.length;


		for(i = 0; i < n; i += 2) {
			var s = arr[i];

			// 扩展运算符
			for(var j = 0; j < k; j += 2)
				s = s.replace(__alias[j], __alias[j + 1]);

			arr[i] = s;
		}

		//
		// 还原转义的"
		//
		for(i = 1; i < n; i += 2) {
			arr[i] = arr[i].replace(__rQuoteTmp, '\\"')
		}

		return arr.join('"');
	}


	//
	// 将字符串编译成函数
	//
	function __compile() {
		return eval('0,' + arguments[0]);
	}


	//
	// select方法实现
	//
	var __cache = {};
	
	//__proto.select = function(exp) {
//		if(!exp)
//			return [];
//
//		var fn = __cache[exp];
//
//		try {
//			if(!fn) {
//				var code = __interpret(exp);			//解释表达式
//				code = __tmpl.replace('$C', code);		//应用到模版
//
//				fn = __cache[exp] = __compile(code);	//实例化函数
//			}
//
//			return fn(this);							//查询当前对象
//		}
//		catch(e) {
//			return [];
//		}
//	}

})();