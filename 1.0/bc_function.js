<!--
function left_time () {//L-B
    var a = _('.bc_left_time_l_a')[0];
    var b = _('.bc_left_time_l_b')[0];
    var bcDate = new Date();
    var week = bcDate.getDay();
    var year = bcDate.getFullYear();
    var month = bcDate.getMonth() + 1;
    var day = bcDate.getDate();
    switch (week) {
	    case 1:
		    a.innerText = '星期一';
		    break;
	    case 2:
		    a.innerText = '星期二';
		    break;
	    case 3:
		    a.innerText = '星期三';
		    break;
	    case 4:
		    a.innerText = '星期四';
		    break;
	    case 5:
		    a.innerText = '星期五';
		    break;
	    case 6:
		    a.innerText = '星期六';
		    break;
	    case 7:
		    a.innerText = '星期日';
		    break;
	    default:
		    break;
    }
    b.innerText = year + '/' + month + '/' + day;
    clock();
	function clock () {
		var now = new Date();
		var hr  = now.getHours();
		hr = hr>=12 ? hr-12 : hr;
		var min = now.getMinutes();
		var sec = now.getSeconds();
        hrX = hr + min/60;
		minX = min + sec/60;
       





		var ctx = document.getElementById('canvas');
		ctx.width = 300;
		ctx.height = 300;
		ctx = ctx.getContext('2d');
		ctx.clearRect(0,0,300,300);
		ctx.translate(150,150);
		ctx.strokeStyle = '#3D3D3C';
		ctx.fillStyle = 'red';
		ctx.lineWidth = 3;
		ctx.lineCap = 'butt';
		ctx.save();

		/*//秒点
		for (var i = 0;i<60;i++) {
			ctx.beginPath();
			ctx.rotate(Math.PI/30);
			ctx.moveTo(140,0);
			ctx.lineTo(150,0);
			ctx.stroke();
		}
		//时点
		for (var i = 0;i<12;i++) {
			ctx.beginPath();
			ctx.rotate(Math.PI/6);
			ctx.moveTo(130,0);
			ctx.lineTo(150,0);
			ctx.lineWidth = 6;
			ctx.stroke();
		}*/
		
		//时针
		ctx.beginPath();
		var vs = (hrX - 3)*((2*Math.PI)/12);
		ctx.rotate((hrX - 3)*((2*Math.PI)/12));
		ctx.moveTo(0,0);
		ctx.lineTo(70,0);
		ctx.lineWidth = 14;
		ctx.lineCap = 'round';
		ctx.stroke();
        

		//分针
		ctx.beginPath();
		ctx.rotate(-vs);
		vs = (minX - 15)*((2*Math.PI)/60);
	    ctx.rotate((minX - 15)*((2*Math.PI)/60));
		ctx.moveTo(0,0);
		ctx.lineTo(110,0);
		ctx.lineWidth = 14;
		ctx.lineCap = 'round';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,12,0,2*Math.PI);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,15,1.25*Math.PI,1.4*Math.PI);
		ctx.strokeStyle = '#1D1D1D';
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,15,0.585*Math.PI,1.15*Math.PI);
		ctx.strokeStyle = '#1D1D1D';
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,15,1.6*Math.PI,0.4*Math.PI);
		ctx.strokeStyle = '#1D1D1D';
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,18,0,2*Math.PI);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 4;
		ctx.stroke();


		//秒针
		ctx.beginPath();
		ctx.rotate(-vs);
		ctx.rotate( (sec - 15)*((2*Math.PI)/60) );
		ctx.lineWidth = 6;
		ctx.strokeStyle = 'red';
		ctx.moveTo(-20,0);
		ctx.lineTo(137,0);
		ctx.lineCap = 'round';
		ctx.stroke();
		//中心点
		ctx.fillStyle = '#1D1D1D';
		ctx.beginPath();
		ctx.arc(0,0,10,0,2*Math.PI);
		ctx.fill();
		requestAnimationFrame(clock);
	}
};
function call_click(){//B-HL-HJ
	window.converIf = 0;//通话是否接通标识[0代表未接通，1代表接通中]
	var callVoi;//状态音频元素
	var setTi;//判断状态监听器
	var ga = true,gb = true,gc = false,gd = false;
	_('.bc_r_c_a_c_r_b_c').events('click',function () {//呼叫按钮
		if (!ga) return;
		ga = false;
        var a = _('.global_call_click')[0];
        if (!a) insetEl(),callVoi = _('.ctfj_call')[0],a = _('.global_call_click')[0];
		a.css({'opacity':'0'}).show().animation({'opacity':'1'},100);
		_('.global_call_click_now_call').show();
		callVoi.play();
		requestAnimationFrame(get_call_dataID);
		setTi = setInterval(function () {
			if (converIf !== 1) return;
			_('.global_call_click_now_call').hide();callVoi.pause();_('.global_call_click_b').show();
			requestAnimationFrame(callTime);
			clearInterval(setTi);
			requestAnimationFrame(answer);
			gc = true;
		},1);
		this.stopBubble();
	});
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	setInterval(function () {if (converIf === 0 && gc) return (gc = false) + requestAnimationFrame(serverOff);},1);
	function serverOff () {//服务器断开
		gd = true;
		clearInterval(setTi);
		_('.global_call_click_b_c_c_s')[0].innerText = '00:';
		_('.global_call_click_b_c_c_f')[0].innerText = '00:';
		_('.global_call_click_b_c_c_m')[0].innerText = '00';
		_('.global_call_click_b').hide();
		_('.global_call_click_now_call').hide();
		_('.global_call_click').hide();
		callVoi.pause();
		requestAnimationFrame(function () {
			var a = _('.prompt__')[0];
			if (!a) prompt(),a = _('.prompt__')[0];
			a.innerText = '对方已挂断或通讯已关闭!';
			a.show().css({'opacity':'0'}).animation({'opacity':'1'},1000,function () {this.delay(2000).animation({'opacity':'0'},2000,function () {});});
			gb = true;ga = true;gd = false;
		});
	}
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	_('.bc_r_c_a_c_r_b_han_c_c_z1').events('click',function () {//挂断按钮
		gc = false;
		if (gd) return;
		clearInterval(setTi);
		_('.global_call_click_b_c_c_s')[0].innerText = '00:';
		_('.global_call_click_b_c_c_f')[0].innerText = '00:';
		_('.global_call_click_b_c_c_m')[0].innerText = '00';
        _('.global_call_click_b').hide();
        _('.global_call_click_now_call').hide();
		_('.global_call_click').hide();
		callVoi.pause();
		converIf = 0;
		this.stopBubble();
		requestAnimationFrame(hangup);
		ga = true;
	});
    _('.bc_r_c_a_c_r_b_han_c_c_z2').events('click',function () {//处置按钮
		if (!gb) return;
		gb = false;
        var a = _('.prompt__')[0];
		if (!a) prompt(),a = _('.prompt__')[0];
		a.innerText = '处置成功!';
		a.show().css({'opacity':'0'}).animation({'opacity':'1'},1000,function () {this.delay(2000).animation({'opacity':'0'},2000,function () {gb = true;});});
        this.stopBubble();
	});
    _('.bc_r_c_a_c_r_b_han_c_c_z3').events('click',function () {//增员按钮
		if (!gb) return;
		gb = false;
        var a = _('.prompt__')[0];
		if (!a) prompt(),a = _('.prompt__')[0];
		if (window.getComputedStyle(this,null).backgroundColor.RGBToHex() == '#FC8E62') {
            this.style.backgroundColor = '#999999';
			a.innerText = '请求增援成功';
			a.show().css({'opacity':'0'}).animation({'opacity':'1'},1000,function () {this.delay(2000).animation({'opacity':'0'},2000,function () {gb = true;});});
		} else {
            this.style.backgroundColor = '#FC8E62';a.innerText = '已为你取消增援';
			a.show().css({'opacity':'0'}).animation({'opacity':'1'},1000,function () {this.delay(2000).animation({'opacity':'0'},2000,function () {gb = true;});});
		}
		this.stopBubble();
	});
	function insetEl () {//通话样式
		var sty = ".global_call_click {" +
						"display: none;position: fixed;z-index: 9000;top: 0;left: 0;width: 100%;height: 100%;" +
						"background: rgba(0,0,0,0.4);" +
					"}" +
					".global_call_click_x {" +
						"position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;padding: 20px;width: 400px;height: 300px;border-radius: 3px;background: #AA95B9;" +
					"}" +
					".global_call_click_a {" +
						"padding: 0 0 20px 0;width: 100%;height: 24px;line-height: 24px;text-align: center;font-size: 36px;font-weight: bold;color: #95C995;" +
						"border-bottom: 2px solid #95C995;" +
					"}" +
					".global_call_click_now_call {display: black;position: absolute;top: 80px;left: 20px;width: 400px;height: 240px;}" +
					".global_call_click_b {display: none;position: relative;margin: 15px 0 0 0;width: 100%;height: 244px;}" +
					".global_call_click_b_x {position: absolute;margin: auto;top: 0;bottom: 0;width: 100%;height: 120px;background: #E3E0E5;font-size: 0;}" +
					".global_call_click_b_a {display: inline-block;vertical-align: top;width: 74px;padding: 0 10px 0 0;height: 120px;line-height: 120px;text-align: right;" +
						 "font-size: 24px;color: #999999;border-right: 1px solid #B2A2C1;background: #CEC9D3;" +
					"}" +
					".global_call_click_b_c {" +
						"display: inline-block;vertical-align: top;width: 315px;text-align: center;" +
					"}" +
					".global_call_click_b_c_x {font-size: 0;}" +
					".global_call_click_b_c_c {display: inline-block;vertical-align: top;height: 120px;line-height: 120px;font-size: 60px;font-weight: bold;letter-spacing: 8px;color: #FC8E62;}" +
					".global_call_click_b_mic {position: absolute;top: -7px;left: 20px;width: 30px;height: 60px;border: 1px solid #8B7E93;border-radius: 30px;overflow: hidden;}" +
					".global_call_click_b_mic_a {position: absolute;z-index: 2;bottom: 0;left: 0;width: 100%;height: 12px;background: #7C7481;}" +
					".global_call_click_b_mic_b {position: absolute;z-index: 1;margin: auto;bottom: 0;left: 0;right: 0;width: 10px;height: 40px;background: #AAE583;}" +
					".global_call_click_b_mic_this {left: auto;top: auto;bottom: -7px;right: 20px;}";
		jax.agFun.insertStyle(sty);
		var styDiv = "<div class=\"global_call_click\">" +
					  "<div class=\"global_call_click_x\"><!--呼叫连接-->" +
						"<div class=\"global_call_click_a\">呼叫中...</div>" +
						"<div class=\"global_call_click_b\">" +
						  "<div class=\"global_call_click_b_mic\">" +
							"<div class=\"global_call_click_b_mic_a\"></div>" +
							"<div class=\"global_call_click_b_mic_b global_call_click_b_mic_b_z1\"></div>" +
						  "</div>" +
						  "<div class=\"global_call_click_b_mic global_call_click_b_mic_this\">" +
							"<div class=\"global_call_click_b_mic_a\"></div>" +
							"<div class=\"global_call_click_b_mic_b global_call_click_b_mic_b_z2\"></div>" +
						  "</div>" +
						  "<div class=\"global_call_click_b_x\">" +
							"<div class=\"global_call_click_b_a\">时长:</div>" +
							"<div class=\"global_call_click_b_c\">" +
								"<div class=\"global_call_click_b_c_x\">" +
								  "<div class=\"global_call_click_b_c_c global_call_click_b_c_c_s\">00:</div>" +
								  "<div class=\"global_call_click_b_c_c global_call_click_b_c_c_f\">00:</div>" +
								  "<div class=\"global_call_click_b_c_c global_call_click_b_c_c_m\">00</div>" +
								"</div>" +
							"</div>" +
						  "</div>" +
						"</div>" +
						"<div class=\"global_call_click_now_call\"><img src=\"img/now_call.gif\" /></div>" +
						"<audio class=\"ctfj_call\" loop>" +
						  "<source src=\"file/call.mp3\" type=\"audio/mp3\">" +
						"</audio><!--连线中声音-->" +
					  "</div>" +
				  "</div>";
		var styDivX = document.createElement('div');
		styDivX.innerHTML = styDiv;
		document.body.appendChild(styDivX);
	}
    function callTime () {//通话秒表
		var s = _('.global_call_click_b_c_c_s')[0];
		var f = _('.global_call_click_b_c_c_f')[0];
		var m = _('.global_call_click_b_c_c_m')[0];
		setTi = setInterval(function () {
			var a = parseInt(m.innerText.replace(':',''));
			var b = parseInt(f.innerText.replace(':',''));
			var c = parseInt(s.innerText.replace(':',''));
            a = a + 1;
			if (a == 60) {a = 0;b = b + 1;}
			if (b == 60) {b = 0;c = c + 1;}
			if (c == 24) {a = 0;b = 0;c = 0;}
			if (a < 10) {a = '0' + a.toString();} else {a = a.toString();}
			if (b < 10) {b = '0' + b.toString();} else {b = b.toString();}
			if (c < 10) {c = '0' + c.toString();} else {c = c.toString();}
			m.innerText = a;
			f.innerText = b + ':';
			s.innerText = c + ':';
		},1000);
	}






	//global_call_click_b_mic_b_z1    通话中对方
	//global_call_click_b_mic_b_z2    通话中自己

    //global_call_click    呼叫层显示
	//global_call_click_b  通话中
    //global_call_click_now_call    连线中
    //id=\"ctfj_call        打开 连线中   音
    //prompt__        提示   层

}
function hl_cost_move () {//B-HL-HY-B
	var setStyle = ".hl_cost_move__ {" +
						"display: none;position: fixed;z-index: 8000;top: 50%;left: 50%;" +
						"transform: translate(-50%,-50%);" +
						"-ms-transform: translate(-50%,-50%);" +
						"-moz-transform: translate(-50%,-50%);" +
						"-webkit-transform: translate(-50%,-50%);" +
						"-o-transform: translate(-50%,-50%);" +
						"width: 400px;height: 500px;box-shadow: 0 0 15px #999999;border-radius: 4px;background: white;" +
					"}" +
					".hl_cost_move__t {width: 100%;height: 60px;line-height: 60px;text-align: center;font-size: 18px;font-weight: bold;color: #666666;background: #B4F28B;}" +
					".hl_cost_move__c {padding: 0 20px;width: 360px;height: 420px;overflow-y: scroll;}" +
					".hl_cost_move__c_x {width: 100%;min-height: 421px;}" +
					".hl_cost_move__c_c {width: 100%;font-size: 0;margin: 10px 0 0 0;border-bottom: 1px solid #C9DEBC;border-radius: 0 0 3px 0;}" +
					".hl_cost_move__c_c_a {display: inline-block;vertical-align: top;" +
						"padding: 0 10px;width: 260px;height: 30px;line-height: 30px;color: #767676;" +
						"overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" +
					"}" +
					".hl_cost_move__c_c_b {display: inline-block;vertical-align: top;" +
						"width: 80px;height: 30px;line-height: 30px;text-align: center;font-size: 14px;font-weight: bold;color: #FC8E62;border-radius: 20px 3px 3px 6px;background: #C9DEBC;" +
					"}" +
					".hl_cost_move__close {position: absolute;top: 0;right: 0;font-size: 0;}" +
					".hl_cost_move__close_xa {display: inline-block;vertical-align: top;width: 0;height: 0;padding: 0;border-width: 10px;" +
						"border-style: solid;border-color: rgba(0,0,0,0.5) rgba(0,0,0,0.5) transparent transparent;" +
					"}" +
					".hl_cost_move__close_xb {display: inline-block;vertical-align: top;position: relative;width: 30px;height: 20px;background: rgba(0,0,0,0.5);/*background: #8B9186;*/}" +
					".hl_cost_move__close_xb_c {position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;width: 16px;height: 16px;" +
						"background: transparent url(img/bc.png) no-repeat scroll -906px -42px;" +
						"transform-origin: center center;" +
						"-ms-transform-origin: center center;" +
						"-moz-transform-origin: center center;" +
						"-webkit-transform-origin: center center;" +
						"-o-transform-origin: center center;" +
						"transform: scale(0.895,0.895);" +
						"-ms-transform: scale(0.895,0.895);" +
						"-moz-transform: scale(0.895,0.895);" +
						"-webkit-transform: scale(0.895,0.895);" +
						"-o-transform: scale(0.895,0.895);" +
					"}";
    var setDiv = "<div class=\"hl_cost_move__\">" +
					"<div class=\"hl_cost_move__close\">" +
					  "<div class=\"hl_cost_move__close_xa\"></div>" +
					  "<div class=\"hl_cost_move__close_xb\"><div class=\"hl_cost_move__close_xb_c\"></div></div>" +
					"</div>" +
					"<div class=\"hl_cost_move__t\">今日费用</div>" +
					"<div class=\"hl_cost_move__c\">" +
					  "<div class=\"hl_cost_move__c_x\">" +
						"<div class=\"hl_cost_move__c_c\">" +
						  "<div class=\"hl_cost_move__c_c_a\">病房取暖费</div>" +
						  "<div class=\"hl_cost_move__c_c_b\">&#65509;30</div>" +
						"</div>" +
					  "</div>" +
					"</div>" +
				  "</div>";
	jax.agFun.insertStyle(setStyle);
	var a = document.createElement('div');
    a.innerHTML = setDiv;
	document.body.appendChild(a);
	_('.hl_c_hy_c_l_a_move').events('click',function () {
        _('.hl_cost_move__')[0].show();this.stopBubble();
	});
	_('.hl_c_hy_c_l_a_c_move').events('click',function () {_('.hl_cost_move__')[0].show();this.stopBubble();});//兼容
	_('.hl_cost_move__close')[0].events('touchstart',function () {
        _('.hl_cost_move__close_xa').css({'border-color':'rgba(238,0,0,0.5) rgba(238,0,0,0.5) transparent transparent'});
		_('.hl_cost_move__close_xb').css({'background':'rgba(238,0,0,0.5)'});
		this.stopBubble();
	});
	_('.hl_cost_move__close')[0].events('touchmove',function () {
        _('.hl_cost_move__close_xa').css({'border-color':'rgba(0,0,0,0.5) rgba(0,0,0,0.5) transparent transparent'});
		_('.hl_cost_move__close_xb').css({'background':'rgba(0,0,0,0.5)'});
		this.stopBubble();
	});
	_('.hl_cost_move__close')[0].events('touchend',function () {
        _('.hl_cost_move__close_xa').css({'border-color':'rgba(0,0,0,0.5) rgba(0,0,0,0.5) transparent transparent'});
		_('.hl_cost_move__close_xb').css({'background':'rgba(0,0,0,0.5)'});
		this.parentNode.hide();
		this.stopBubble();
	});
}
//-----------------
function cost_details_1280_800 () {//B-FY-C-BA
    _('.fy_c_c_b_b_b_a_c_c').events('click',function () {
		var a = this.index('.fy_c_c_b_b_b_a_c_c');
		if (a > 6) {a = a - 7;}
        _('.fy_c_c_b_b_b_a_tx').css({'left':75 + a*65 + 'px'});
	});
	_('.fy_c_c_b_b_b_a_x_zx').events('click',function () {
		_('.fy_c_c_b_b_b_a_tx').css({'left':75 + 'px'});
		var a = this.index('.fy_c_c_b_b_b_a_x_zx');
        if (a == 0) {
			_('.fy_c_c_b_b_b_a_c_exx')[0].style.left = '-455px';
            _('.fy_c_c_b_b_b_a_c_exx').animation({'left':'0;'},150,'Quad');
		} else if (a == 1) {
			_('.fy_c_c_b_b_b_a_c_exx')[0].style.left = '0';
            _('.fy_c_c_b_b_b_a_c_exx').animation({'left':'-455px'},150,'Quad');
		}
	});
}
function cost_details_1360_768 () {//B-FY-C-BA    [兼容]
    _('.fy_c_c_b_b_b_a_c_c').events('click',function () {
		var a = this.index('.fy_c_c_b_b_b_a_c_c');
		if (a > 6) {a = a - 7;}
        _('.fy_c_c_b_b_b_a_tx').css({'left':138 + a*80 + 'px'});
	});
	_('.fy_c_c_b_b_b_a_x_zx').events('click',function () {
		_('.fy_c_c_b_b_b_a_tx').css({'left':138 + 'px'});
		var a = this.index('.fy_c_c_b_b_b_a_x_zx');
        if (a == 0) {
			_('.fy_c_c_b_b_b_a_c_exx')[0].style.left = '-560px';
            _('.fy_c_c_b_b_b_a_c_exx').animation({'left':'0;'},150,'Quad');
		} else if (a == 1) {
			_('.fy_c_c_b_b_b_a_c_exx')[0].style.left = '0';
            _('.fy_c_c_b_b_b_a_c_exx').animation({'left':'-560px'},150,'Quad');
		}
	});
}
//-----------------
function navigation () {//B-DH-RA
    
}
function mission () {//B-BZ-R
	_('.bz_c_c_b_c_xj').events('click',function () {
        var o = _('.bz_c_c_b_c_xjcon_video')[0];
		if (!o) return styeVi(),_('.bz_c_c_b_c_xjcon_video')[0].show();
		if (o.style.display == 'block') return;
        o.show();     
		this.stopBubble();this.preventDefault();
	});
	function styeVi () {
		var va = true;
        var a = ".bz_c_c_b_c_xjcon_video {display: block;position: fixed;z-index: 9900;top: 50%;left: 50%;min-width: 700px;min-height: 400px;box-shadow: 0 0 15px #666666;background: black;" +
					"transform: translate(-50%,-50%);" +
					"-ms-transform: translate(-50%,-50%);" +
					"-moz-transform: translate(-50%,-50%);" +
					"-webkit-transform: translate(-50%,-50%);" +
					"-o-transform: translate(-50%,-50%);" +
				"}" +
				".bz_c_c_b_c_xj_vi_enlar {position: absolute;bottom: 8px;right: 20px;width: 22px;height: 22px;background: #4B4B4B url(img/bc.png) no-repeat scroll -776px 0;/*-804px 0;*/}" +
			    ".bz_c_c_b_c_xj_vi_enlar:active {box-shadow: 0 0 15px #F7956C;background-color: #333333;}" +
				".hl_cost_move__close_z1 {position: absolute;z-index: 200;top: 0;right: 0;font-size: 0;}" +
				".hl_cost_move__close_xa_z1 {display: inline-block;vertical-align: top;width: 0;height: 0;padding: 0;border-width: 10px;" +
					"border-style: solid;border-color: rgba(118,238,0,0.8) rgba(118,238,0,0.8) transparent transparent;" +
				"}" +
				".hl_cost_move__close_xb_z1 {display: inline-block;vertical-align: top;position: relative;width: 30px;height: 20px;background: rgba(118,238,0,0.8);/*background: #8B9186;*/}" +
				".hl_cost_move__close_xb_c {position: absolute;margin: auto;top: 0;bottom: 0;left: 0;right: 0;width: 16px;height: 16px;" +
					"background: transparent url(img/bc.png) no-repeat scroll -906px -42px;" +
					"transform-origin: center center;" +
					"-ms-transform-origin: center center;" +
					"-moz-transform-origin: center center;" +
					"-webkit-transform-origin: center center;" +
					"-o-transform-origin: center center;" +
					"transform: scale(0.895,0.895);" +
					"-ms-transform: scale(0.895,0.895);" +
					"-moz-transform: scale(0.895,0.895);" +
					"-webkit-transform: scale(0.895,0.895);" +
					"-o-transform: scale(0.895,0.895);" +
				"}";
		var b = "<div class=\"bz_c_c_b_c_xjcon_video\">" +
					"<video id=\"xjcon_video__\" width=\"100%\" height=\"100%\" controls>" +
					  "<source src=\"file/test.mp4\" type=\"video/mp4\">" +
					"</video>" +
					"<div class=\"bz_c_c_b_c_xj_vi_enlar\"></div>" +
					"<div class=\"hl_cost_move__close_z1\">" +
					  "<div class=\"hl_cost_move__close_xa_z1\"></div>" +
					  "<div class=\"hl_cost_move__close_xb_z1\"><div class=\"hl_cost_move__close_xb_c\"></div></div>" +
					"</div>" +
				  "</div>";
		jax.agFun.insertStyle(a);
		var c = document.createElement('div');
		c.innerHTML = b;
		document.body.appendChild(c);
		var oa = _('.hl_cost_move__close_z1')[0];
		var ob = _('.hl_cost_move__close_xa_z1')[0];
		var oc = _('.hl_cost_move__close_xb_z1')[0];
		//---------------
		var sreecX = document.body.clientWidth;
		var sreecY = document.body.clientHeight;
		var oo = _('.bz_c_c_b_c_xjcon_video')[0];
		var videoID = document.getElementById('xjcon_video__');
		var en = _('.bz_c_c_b_c_xj_vi_enlar')[0];
        var Vtime;
		var true_a = true,true_b = false;
		oa.events('touchstart',function () {
			ob.css({'border-color':'rgba(255,127,0,0.5) rgba(255,127,0,0.5) transparent transparent'});
			oc.css({'background':'rgba(255,127,0,0.5)'});
			this.stopBubble();
			this.preventDefault();
		});
		oa.events('touchmove',function () {
			ob.css({'border-color':'rgba(118,238,0,0.8) rgba(118,238,0,0.8) transparent transparent'});
			oc.css({'background':'rgba(118,238,0,0.8)'});
			this.stopBubble();
			this.preventDefault();
		});
		oa.events('touchend',function () {
			ob.css({'border-color':'rgba(118,238,0,0.8) rgba(118,238,0,0.8) transparent transparent'});
			oc.css({'background':'rgba(118,238,0,0.8)'});
			this.parentNode.hide();
			this.stopBubble();
			this.preventDefault();

            clearTimeout(Vtime);
			oo.css({'width':'700px','height':'400px'});
			en.css({'right':'20px'});
			videoID.pause();
		});
        //---------------
        en.events('click',function () {
			true_b = true;
			videoID.pause();
			if (oo.clientWidth == 700) {
                oo.css({'width':sreecX + 'px','height':sreecY + 'px'});
				if (sreecX == 1360) {
                    en.css({'right':'300px','background-position':'-804px 0'});
				} else {
                    en.css({'right':'108px','background-position':'-804px 0'});
				}
				Vtime = setTimeout(function () {videoID.controls = false;en.hide();oa.hide();clearTimeout(Vtime);true_a = true;},5000);
			} else if (oo.clientWidth == sreecX) {
			    oo.css({'width':'700px','height':'400px'});
				en.css({'right':'20px','background-position':'-776px 0'});
				if (Vtime) clearTimeout(Vtime),en.show(),oa.show();
			}
			this.stopBubble();this.preventDefault();
			true_b = false;
		});
		oo.events('click',function () {va = true;
		    if (true_b) return;
            if (!true_a) return;
			true_a = false;
			if (oo.clientWidth == sreecX) {
				clearTimeout(Vtime);videoID.controls = true;en.show();oa.show();
				Vtime = setTimeout(function () {videoID.controls = false;en.hide();oa.hide();clearTimeout(Vtime);},5000);
			}
			true_a = true;
			this.stopBubble();
		});
		document.events('touchstart',function () {va = false;});
		document.events('click',function () {
			if (!va) {
				oo.hide();
				clearTimeout(Vtime);
				oo.css({'width':'700px','height':'400px'});
				en.css({'right':'20px'});
				videoID.pause();
			}
		    va = false;
		});
	}
}
function medi_set () {//B-SZ-R-LD 
	var a_true = false;
    _('.sz_c_c_c_c_r_c_ld_b_a').events('click',function (e) {
		if (a_true) return a_true = false;
        var e = e || event;
		var a = this.find('.sz_c_c_c_c_r_c_ld_b_a_c')[0];
		a.style.width = e.offsetX + 'px';
		var b = this.closest('.sz_c_c_c_c_r_c_ld_b');
		var c = b.find('.sz_c_c_c_c_r_c_ld_b_c')[0];
		c.innerText = Number((e.offsetX/200).toFixed(2).toString().replace('0.','')) + '%';
	});
    _('.sz_c_c_c_c_r_c_ld_b_a_c_x').events('click',function () {a_true = true;
        var a = this.closest('.sz_c_c_c_c_r_c_ld_b');
		var b = a.find('.sz_c_c_c_c_r_c_ld_b_a_c')[0];
		b.style.width = b.clientWidth + 'px';
	});
	var x;
    _('.sz_c_c_c_c_r_c_ld_b_a_c_x').events('touchstart',function (e) {var e = e || window.event;x = e.changedTouches[0].clientX;this.stopBubble(e);this.preventDefault(e);});
	_('.sz_c_c_c_c_r_c_ld_b_a_c_x').events('touchmove',function (e) {
		var e = e || event;
        var mx = e.changedTouches[0].clientX - x;
        var a = this.closest('.sz_c_c_c_c_r_c_ld_b');
		var b = a.find('.sz_c_c_c_c_r_c_ld_b_a_c')[0];
		b.style.width = b.clientWidth + mx + 'px';
		var c = a.find('.sz_c_c_c_c_r_c_ld_b_c')[0];
		c.innerText = Number((b.clientWidth/200).toFixed(2).toString().replace('0.','')) + '%';
		this.stopBubble(e);this.preventDefault(e);
	});
    _('.sz_c_c_c_c_r_c_ld_b_a_c_x').events('touchmove',function (e) {
        var a = this.closest('.sz_c_c_c_c_r_c_ld_b');
		var b = a.find('.sz_c_c_c_c_r_c_ld_b_a_c')[0];
		if (b.clientWidth > 200) {
			b.style.width = '198px';
			var c = a.find('.sz_c_c_c_c_r_c_ld_b_c')[0];
			c.innerText = '100%';
		}
	});
}
function medi_remind () {//B-SZ-R-TX
	var x;
	var moa,mob,moc;
    _('.sz_c_c_c_c_r_c_sy_sw_c_x').events('touchstart',function (e) {
		var e = e || event;
        x = e.changedTouches[0].clientX;
	});
    _('.sz_c_c_c_c_r_c_sy_sw_c_x').events('touchmove',function (e) {
		this.stopBubble(e);this.preventDefault(e);
        var e = e || event;
		var mx = e.changedTouches[0].clientX;
		var a = _('.prompt__')[0];
		var b = this.closest('.sz_c_c_c_c_r_c');
		var c = b.find('.count_time')[0];
		if (!a) prompt(),a = _('.prompt__')[0];

		var swiSty = b.find('.sz_c_c_c_c_r_c_sy_c_c_c_c');
		if (mx > x) {//向右	
			var aa = b.find('.sz_c_c_c_c_r_c_sy_c_c_c_x1')[0];
			get_time_ele(aa);
			aa = null;
			var bb = b.find('.sz_c_c_c_c_r_c_sy_c_c_c_x2')[0];
			get_time_ele(aa,bb);
			bb = null;
		    var cc = b.find('.sz_c_c_c_c_r_c_sy_c_c_c_x3')[0];
			get_time_ele(aa,bb,cc);
			cc = null;
			var stat_time = s_time_work(c,this,swiSty,b);

            if (stat_time) return a.innerText = '时间设置错误,必须大于实时时间！',a.show().css({'opacity':'0'}).animation({'opacity':'1'},500,function () {this.delay(1000).animation({'opacity':'0'},1000,function () {gb = true;});});
			this.style.left = '61px';
            this.style.backgroundColor = '#A2E871';
			a.innerText = '已开启!';
			c.show();
			b.timerSwi = true;
			_(swiSty).css({'background-color':'#999999','color':'#666666'});
	    } else if (mx < x) {//向左
			this.style.left = '2px';
            this.style.backgroundColor = '#818181';
			a.innerText = '已关闭!';
			c.hide();
			this.timingIf = null;
			clearTimeout(this.timing);
			b.timerSwi = null;
			_(swiSty).css({'background-color':'#F5FFF2','color':'#F7956C'});
		}
		a.show().css({'opacity':'0'}).animation({'opacity':'1'},500,function () {this.delay(1000).animation({'opacity':'0'},1000,function () {gb = true;});});
	});
	//--------------------------
	var hy;
	_('.sz_c_c_c_c_r_c_sy_c_c_c_con').css({'top':'20px'});
    _('.sz_c_c_c_c_r_c_sy_c_c_c').events('touchstart',function (e) {
		var pr = this.closest('.sz_c_c_c_c_r_c');
		if (pr.timerSwi) return;
        var e = e || event;
		hy = e.changedTouches[0].clientY;
	});
    _('.sz_c_c_c_c_r_c_sy_c_c_c').events('touchmove',function (e) {
		var pr = this.closest('.sz_c_c_c_c_r_c');
		if (pr.timerSwi) return;
		this.stopBubble();this.preventDefault();
        var e = e || event;
		var my = e.changedTouches[0].clientY;
		var a = this.find('.sz_c_c_c_c_r_c_sy_c_c_c_con')[0];
		var aa = this.find('.sz_c_c_c_c_r_c_sy_c_c_c_x1')[0];
		var b = this.find('.sz_c_c_c_c_r_c_sy_c_c_c_x2')[0];
		var c = this.find('.sz_c_c_c_c_r_c_sy_c_c_c_x3')[0];
		var dis = parseInt(a.style.top);
		a.style.top = dis + (my - hy) + 'px';
		if (dis > 20) return a.style.top = '20px';
		if (!b && !c && dis < -1382) return a.style.top = '-1382px';
		if ((b || c) && dis < -3580) return a.style.top = '-3580px';
	});
	//-----------------
	_('.sz_time_off_c_c').events('click',function () {
		var o = this.parentNode.parentNode.parentNode;
		var d = o.find('.sz_time_off_play')[0];
		d.ficti.pauseX();
		o.parentNode.removeChild(o);
	});
	_('.sz_time_off_close').events('click',function () {
		var o = this.parentNode.parentNode;
		var d = o.find('.sz_time_off_play')[0];
		d.ficti.pauseX();
		o.parentNode.removeChild(o);
	});
	function get_time_ele (a,b,c) {
		var o = a ? a : b ? b : c ? c : 0;
		var oAall = o.querySelectorAll('div');
		var t = parseInt(o.style.top);
		var ele;
		if (t <= 20 && t > -20) {
			ele = oAall[0];
		} else if (t < -20 && t > -80) {
			ele = oAall[1];
		} else if (t < -80 && t > -140) {
            ele = oAall[2];
		} else if (t < -140 && t > -200) {
            ele = oAall[3];
		} else if (t < -200 && t > -260) {
            ele = oAall[4];
		} else if (t < -260 && t > -320) {
            ele = oAall[5];
		} else if (t < -320 && t > -380) {
            ele = oAall[6];
		} else if (t < -380 && t > -440) {
            ele = oAall[7];
		} else if (t < -440 && t > -500) {
            ele = oAall[8];
		} else if (t < -500 && t > -560) {
            ele = oAall[9];
		} else if (t < -560 && t > -620) {
            ele = oAall[10];
		} else if (t < -620 && t > -680) {
            ele = oAall[11];
		} else if (t < -680 && t > -740) {
            ele = oAall[12];
		} else if (t < -740 && t > -800) {
            ele = oAall[13];
		} else if (t < -800 && t > -860) {
            ele = oAall[14];
		} else if (t < -860 && t > -920) {
            ele = oAall[15];
		} else if (t < -920 && t > -980) {
            ele = oAall[16];
		} else if (t < -980 && t > -1040) {
            ele = oAall[17];
		} else if (t < -1040 && t > -1100) {
            ele = oAall[18];
		} else if (t < -1100 && t > -1160) {
            ele = oAall[19];
		} else if (t < -1160 && t > -1220) {
            ele = oAall[20];
		} else if (t < -1220 && t > -1280) {
            ele = oAall[21];
		} else if (t < -1280 && t > -1340) {
            ele = oAall[22];
		} else if (t < -1340 && t > -1400) {
            ele = oAall[23];
		} else if (t < -1400 && t > -1460) {
            ele = oAall[24];
		} else if (t < -1460 && t > -1520) {
            ele = oAall[25];
		} else if (t < -1520 && t > -1580) {
            ele = oAall[26];
		} else if (t < -1580 && t > -1640) {
            ele = oAall[27];
		} else if (t < -1640 && t > -1700) {
            ele = oAall[28];
		} else if (t < -1700 && t > -1760) {
            ele = oAall[29];
		} else if (t < -1760 && t > -1820) {
            ele = oAall[30];
		} else if (t < -1820 && t > -1880) {
            ele = oAall[31];
		} else if (t < -1880 && t > -1940) {
            ele = oAall[32];
		} else if (t < -1940 && t > -2000) {
            ele = oAall[33];
		} else if (t < -2000 && t > -2060) {
            ele = oAall[34];
		} else if (t < -2060 && t > -2120) {
            ele = oAall[35];
		} else if (t < -2120 && t > -2180) {
            ele = oAall[36];
		} else if (t < -2180 && t > -2240) {
            ele = oAall[37];
		} else if (t < -2240 && t > -2300) {
            ele = oAall[38];
		} else if (t < -2300 && t > -2360) {
            ele = oAall[39];
		} else if (t < -2360 && t > -2420) {
            ele = oAall[40];
		} else if (t < -2420 && t > -2480) {
            ele = oAall[41];
		} else if (t < -2480 && t > -2540) {
            ele = oAall[42];
		} else if (t < -2540 && t > -2600) {
            ele = oAall[43];
		} else if (t < -2600 && t > -2660) {
            ele = oAall[44];
		} else if (t < -2660 && t > -2720) {
            ele = oAall[45];
		} else if (t < -2720 && t > -2780) {
            ele = oAall[46];
		} else if (t < -2780 && t > -2840) {
            ele = oAall[47];
		} else if (t < -2840 && t > -2900) {
            ele = oAall[48];
		} else if (t < -2900 && t > -2960) {
            ele = oAall[49];
		} else if (t < -2960 && t > -3020) {
            ele = oAall[50];
		} else if (t < -3020 && t > -3080) {
            ele = oAall[51];
		} else if (t < -3080 && t > -3140) {
            ele = oAall[52];
		} else if (t < -3140 && t > -3200) {
            ele = oAall[53];
		} else if (t < -3200 && t > -3260) {
            ele = oAall[54];
		} else if (t < -3260 && t > -3320) {
            ele = oAall[55];
		} else if (t < -3320 && t > -3380) {
            ele = oAall[56];
		} else if (t < -3380 && t > -3440) {
            ele = oAall[57];
		} else if (t < -3440 && t > -3500) {
            ele = oAall[58];
		} else if (t < -3500 && t > -3560) {
            ele = oAall[59];
		} else if (t < -3560 && t > -3620) {
            ele = oAall[60];
		}

 
		a ? moa = ele : 
			b ? mob = ele :
			c ? moc = ele : 0;
	}
    function s_time_work (o,va,vb,vc) {
        var a = o.find('.count_time_con_c_a')[0];
        var b = o.find('.count_time_con_c_b')[0];
        var c = o.find('.count_time_con_c_c')[0];
		var time = new Date();
		var s = time.getHours();
		var f = time.getMinutes();
		var m = time.getSeconds();


		var ma = parseInt(moa.innerText);
		var mb = parseInt(mob.innerText);
		var mc = parseInt(moc.innerText);

        
		var ys = (ma*60*60 + mb*60 + mc);
		var ss = (s*60*60 + f*60 + m);
		if (ys <= ss) return true;

		var get_set = ys - ss;
		ma = parseInt(get_set/60/60);
		mb = parseInt((get_set - ma*60*60)/60);
		mc = parseInt((get_set - ma*60*60 - mb*60));

		ma = (ma < 10) ? '0' + ma.toString() : ma.toString();
		mb = (mb < 10) ? '0' + mb.toString() : mb.toString();
		mc = (mc < 10) ? '0' + mc.toString() : mc.toString();

        a.innerText = ma;b.innerText = mb;c.innerText = mc;
		requestAnimationFrame(function () {timin_han(a,b,c,o,va,vb,vc);});
	}
	function timin_han (a,b,c,o,va,vb,vc) {//倒计时动画
		if (va.timingIf) return;
        va.timingIf = true;
		va.timing = setInterval(function () {
			var tia = parseInt(a.innerText);
			var tib = parseInt(b.innerText);
			var tic = parseInt(c.innerText);
			if (tia == 0 && tib == 0 && tic == 0) {//结束
				var elo = va.closest('.sz_c_c_c_c_r_c');
                var ind = elo.index('.sz_c_c_c_c_r_c');
                if (ind == 2) {
                    requestAnimationFrame(function () {prompt_b('输液提醒','你的输液时间到了,请做好准备','file/sz_sysj.mp3');});
				} else if (ind == 3) {
                    requestAnimationFrame(function () {prompt_b('吃药提醒','你的吃药时间到了','file/sz_sycy.mp3');});
				} else if (ind == 4) {
                    requestAnimationFrame(function () {prompt_b('手术提醒','你的手术时间到了,请做好准备','file/sz_syss.mp3');});
				} else if (ind == 5) {
                    requestAnimationFrame(function () {prompt_b('检查提醒','你的检查时间到了,请做好准备','file/sz_syjc.mp3');});
				}
				o.hide();
				va.style.left = '2px';
				va.style.backgroundColor = '#818181';
				_(vb).css({'background-color':'#F5FFF2','color':'#F7956C'});
				vc.timerSwi = null;
				va.timingIf = null;
				return clearTimeout(va.timing);//##########################
			}
			if (tic == 0) {
				tic = 60;
				if (tib == 0 && tia != 0) {
					tib = 59;tia = tia - 1;
				} else if (tib != 0) {
					tib = tib - 1;
				}
			}
			tic = tic - 1;
			tia = (tia < 10) ? '0' + tia.toString() : tia.toString();
			tib = (tib < 10) ? '0' + tib.toString() : tib.toString();
			tic = (tic < 10) ? '0' + tic.toString() : tic.toString();
			a.innerText = tia;b.innerText = tib;c.innerText = tic;
		},1000);
	}
}
function cost_prop () {//B-FY-C-AA
	var a,b,c,d,e,f,g;
	a = 50;//挂号费
	b = 25;//检查费
	c = 5;//药费
	d = 5;//床位费
	e = 5;//治疗费
	f = 5;//住院费
	g = 5;//其它
    cost_p_right();
    cost_p_canvas();
	function cost_p_right () {
	    var oa = _('.fy_c_c_b_a_b_c_a_i');
		oa[0].style.width = a + '%';
		oa[1].style.width = b + '%';
		oa[2].style.width = c + '%';
		oa[3].style.width = d + '%';
		oa[4].style.width = e + '%';
		oa[5].style.width = f + '%';
		oa[6].style.width = g + '%';
        var ob = _('.fy_c_c_b_a_b_c_b_a_c');
		ob[0].innerText = a;
		ob[1].innerText = b;
		ob[2].innerText = c;
		ob[3].innerText = d;
		ob[4].innerText = e;
		ob[5].innerText = f;
		ob[6].innerText = g;
	}
	function cost_p_canvas () {
		var ctx = document.getElementById('cost_prop');  
		ctx.width = 300;
		ctx.height = 300;
		ctx = ctx.getContext('2d');
		ctx.translate(150,150);
		ctx.fillStyle = 'blue';
		ctx.lineWidth = 86;
		ctx.save();
		 
		//挂号费
		ctx.beginPath();
		ctx.strokeStyle = '#9CCB6E';
		ctx.arc(0,0,106,0,(2*Math.PI)/100*a);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#628BBF';
		ctx.rotate((2*Math.PI)/100*a);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*b);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#E7BD33';
		ctx.rotate((2*Math.PI)/100*b);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*c);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#D87438';
		ctx.rotate((2*Math.PI)/100*c);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*d);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#A5A1E6';
		ctx.rotate((2*Math.PI)/100*d);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*e);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#BB93B3';
		ctx.rotate((2*Math.PI)/100*e);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*f);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = '#6CC9AD';
		ctx.rotate((2*Math.PI)/100*f);
		ctx.arc(0,0,106,0,(2*Math.PI)/100*g);
		ctx.stroke();
	}
}
function naviga_coor () {//B-DH-RA
	var a = '从病床出发向右40米&上电梯到4层&向左100米&向右100米&向左20米&img/men_1.png';
    a = a.split('&');
	requestAnimationFrame(navi_co_draw);
    function navi_co_draw () {
		var ctx = document.getElementById('naviga_coor');
		ctx.width = 300;
		ctx.height = 300;
		ctx = ctx.getContext('2d');
		ctx.clearRect(0,0,300,300);
		ctx.translate(150,150);
		ctx.strokeStyle = '#FC8E62';
		ctx.lineWidth = 6;
		ctx.lineCap = "round";
		ctx.rotate(-0.5*Math.PI);
		ctx.save();
		var rec = -0.5*Math.PI;
		//------------------------------
		var oa = _('.dh_c_c_r_b_con_content')[0];
		oa.innerHTML = '';
		var ob = document.getElementById('dh_c_c_r_b_con_arr_img');
		var text = 'dfd';
		var stD = {};
		stD = Object.defineProperty(stD,'styDiv',{
			set: function (va) {return this.attr = va;},
			get: function () {
				return this.attr = "<div class=\"dh_c_c_r_b_con_c\">" +
						"<div class=\"dh_c_c_r_b_con_c_i\"></div>" +
						"<div class=\"dh_c_c_r_b_con_c_ix\"></div>" +
						"<div class=\"dh_c_c_r_b_con_c_c\">" +
						  "<div class=\"dh_c_c_r_b_con_c_c_con\">" + text + "</div>" +
						"</div>" +
					  "</div>";
			}
		});
		stD.styDiv = "<div class=\"dh_c_c_r_b_con_c\">" +
						"<div class=\"dh_c_c_r_b_con_c_i\"></div>" +
						"<div class=\"dh_c_c_r_b_con_c_ix\"></div>" +
						"<div class=\"dh_c_c_r_b_con_c_c\">" +
						  "<div class=\"dh_c_c_r_b_con_c_c_con\">" + text + "</div>" +
						"</div>" +
					  "</div>";
		for (var i = 0;i<a.length;i++) {
			if (a[i] == '') continue;
			if (a[i].match('左')) {
				var pos = Number((/[0-9]+/g).exec(a[i]))/2;
				ctx.rotate(-0.5*Math.PI);
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(pos,0);
				ctx.stroke();
				ctx.translate(pos,0);
				rec += -0.5*Math.PI;
				//--------------
				text = a[i].toString();
				var obj = document.createElement('div');
				obj.innerHTML = stD.styDiv;
				oa.appendChild(obj);
			} else if (a[i].match('右')) {
				var pos = Number((/[0-9]+/g).exec(a[i]))/2;
				ctx.rotate(0.5*Math.PI);
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(pos,0);
				ctx.stroke();
				ctx.translate(pos,0);
				rec += 0.5*Math.PI;
				//--------------
				text = a[i].toString();
				var obj = document.createElement('div');
				obj.innerHTML = stD.styDiv;
				oa.appendChild(obj);
			} else if (a[i].match('前')) {
				var pos = Number((/[0-9]+/g).exec(a[i]))/2;
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(pos,0);
				ctx.stroke();
				ctx.translate(pos,0);
				//--------------
				text = a[i].toString();
				var obj = document.createElement('div');
				obj.innerHTML = stD.styDiv;
				oa.appendChild(obj);
			} else if (a[i].match('后')) {
				var pos = Number((/[0-9]+/g).exec(a[i]))/2;
				ctx.rotate(1*Math.PI);
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(pos,0);
				ctx.stroke();
				ctx.translate(pos,0);
				rec += 1*Math.PI;
				//--------------
				text = a[i].toString();
				var obj = document.createElement('div');
				obj.innerHTML = stD.styDiv;
				oa.appendChild(obj);
			} else if (a[i].match('层')) {
				var pos = Number((/[0-9]+/g).exec(a[i]));
				ctx.beginPath();
				ctx.fillStyle = '#999999';
				ctx.arc(0,0,4,0,(2*Math.PI));
				ctx.globalCompositeOperation="source-over";
				ctx.fill();
				ctx.beginPath();
				ctx.font = '14px normal';
				ctx.globalCompositeOperation="destination-over";
				ctx.fillText('第' + pos + '层',10,0);
				//--------------
				text = a[i].toString();
				var obj = document.createElement('div');
				obj.innerHTML = stD.styDiv;
				oa.appendChild(obj);
			} else if (a[i].match(/[\/\.]/g)) {
				ctx.rotate(-rec);
				var end = document.createElement('img');
				end.src = 'img/nav_end.png';
				end.onload = function () {ctx.drawImage(end,-15,-40);};
				
				//--------------
				ob.src = a[i].toString();
			}
		}
	}
}
//######################################
function getData_1080_800 () {//获取数据
	window.datas = [];
    if (window.XMLHttpRequest) {xmlhttp=new XMLHttpRequest();} else {xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			datas = this.responseText;
			requestAnimationFrame(fillData_1080_800);
	    }
	};
	xmlhttp.open('GET','http://192.168.2.251:8091/GetBedsByIP.ashx?ip=192.168.2.128',true);
	xmlhttp.send();
}
function fillData_1080_800 () {//填入数据
	datas = eval(datas);
    //alert(datas[0]);
}
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//websocket

/*
//#################定义兼容的开启/关闭媒体设备 (摄像头麦克风) 工具方法
var MediaUtils = {
     //
     // 获取用户媒体设备(处理兼容的问题)
     // @param videoEnable {boolean} - 是否启用摄像头
     // @param audioEnable {boolean} - 是否启用麦克风
     // @param callback {Function} - 处理回调
     //
    getUserMedia: function (videoEnable, audioEnable, callback) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            || navigator.msGetUserMedia || window.getUserMedia;
        var constraints = {video: videoEnable, audio: audioEnable};
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                callback(false, stream);
            })['catch'](function(err) {
                callback(err);
            });
        } else if (navigator.getUserMedia) {
            navigator.getUserMedia(constraints, function (stream) {
                callback(false, stream);
            }, function (err) {
                callback(err);
            });
        } else {
            callback(new Error('Not support userMedia'));
        }
    },

    //
     // 关闭媒体流
     // @param stream {MediaStream} - 需要关闭的流
     //
    closeStream: function (stream) {
        if (typeof stream.stop === 'function') {
            stream.stop();
        }
        else {
            var trackList = [stream.getAudioTracks(), stream.getVideoTracks()];

            for (var i = 0; i < trackList.length; i++) {
                var tracks = trackList[i];
                if (tracks && tracks.length > 0) {
                    for (var j = 0; j < tracks.length; j++) {
                        var track = tracks[j];
                        if (typeof track.stop === 'function') {
                            track.stop();
                        }
                    }
                }
            }
        }
    }
};

//################定义录制音视频的各个接口 (录制/停止/播放)


// 用于存放 MediaRecorder 对象和音频Track，关闭录制和关闭媒体设备需要用到
var recorder, mediaStream;

// 用于存放录制后的音频文件对象和录制结束回调
var recorderFile, stopRecordCallback;

// 用于存放是否开启了视频录制
var videoEnabled = false;

// 录制短语音
function startRecord(enableVideo) {
    videoEnabled = enableVideo;
    MediaUtils.getUserMedia(enableVideo, true, function (err, stream) {
        if (err) {
            throw err;
        } else {
            // 通过 MediaRecorder 记录获取到的媒体流
            recorder = new MediaRecorder(stream);
            mediaStream = stream;
            var chunks = [], startTime = 0;
            recorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
            recorder.onstop = function (e) {
                recorderFile = new Blob(chunks, { 'type' : recorder.mimeType });
                chunks = [];
                if (null != stopRecordCallback) {
                    stopRecordCallback();
                }
            };
            recorder.start();
        }alert('aa');
    });
}

// 停止录制
function stopRecord(callback) {
    stopRecordCallback = callback;
    // 终止录制器
    recorder.stop();
    // 关闭媒体流
    MediaUtils.closeStream(mediaStream);
}

// 播放录制的音频
function playRecord() {
    var url = URL.createObjectURL(recorderFile);
    var dom = document.createElement(videoEnabled ? 'video' : 'audio');
    dom.autoplay = true;
    dom.src = url;
    if (videoEnabled) {
        dom.width = 640;
        dom.height = 480;
        dom.style.zIndex = '9999999';
        dom.style.position = 'fixed';
        dom.style.left = '0';
        dom.style.right = '0';
        dom.style.top = '0';
        dom.style.bottom = '0';
        dom.style.margin = 'auto';
        document.body.appendChild(dom);
    }
}

// 启动录制视频 (若需要录制音频参数指定为 false 即可)
startRecord(true);
// 5秒后结束录制并播放
setTimeout(function () {
    // 结束
    stopRecord(function () {alert('a');
        // 播放
        playRecord();
    });
}, 15000);
*/
//如果需要将录制的媒体发送给服务器，可以使用 FormData 的方式 。
/*var data = new FormData();

data.append("username", "test");
data.append("userfile", recorderFile);

var req = new XMLHttpRequest();
req.open("POST", "http://xxx/xxx");
req.send(data);*/























//########################
function prompt () {//提示样式
	var a = ".prompt__ {" +
				"display: none;position: fixed;z-index: 9200;left: 50%;top: 50%;" +
				"padding: 10px 40px;font-size: 14px;font-weight: bold;color: white;border-radius: 4px;background: rgba(0,0,0,0.6);" +
				"transform: translate(-50%,-50%);" +
				"-ms-transform: translate(-50%,-50%);" +
				"-moz-transform: translate(-50%,-50%);" +
				"-webkit-transform: translate(-50%,-50%);" +
				"-o-transform: translate(-50%,-50%);" +
			"}";
	var b = "<div class=\"prompt__\">已经处理</div>";
	jax.agFun.insertStyle(a);
	var c = document.createElement('div');
	c.innerHTML = b;
	document.body.appendChild(c);
}
function prompt_b (va,vb,vc) {//提示样式2
	var b = "<style type=\"text/css\">" +
	            ".sz_time_off {" +
					"position: fixed;z-index: 8800;top: 50%;left: 50%;width: 400px;background: #9897A9;" +
					"transform: translate(-50%,-50%);" +
					"-ms-transform: translate(-50%,-50%);" +
					"-moz-transform: translate(-50%,-50%);" +
					"-webkit-transform: translate(-50%,-50%);" +
					"-o-transform: translate(-50%,-50%);" +
				"}" +
				".sz_time_off_play {display: block;position: relative;top: 0;left: 0;}" +
				".sz_time_off_c {width: 100%;height: 100%;}" +
				".sz_time_off_c_a {width: 100%;height: 40px;line-height: 40px;text-align: center;font-weight: bold;color: #C4C7D5;background: #8588A9;}" +
				".sz_time_off_close {position: absolute;top: 12px;right: 12px;width: 16px;height: 16px;background: transparent url(img/bc.png) no-repeat scroll -841px 0;}" +
				".sz_time_off_close:active {background-position: -864px 0;}" +
				".sz_time_off_c_b {margin: 40px;max-width: 360px;font-size: 24px;color: #F7956C;}" +
				".sz_time_off_c_c {margin: 0 20px 20px 20px;width: 360px;height: 40px;line-height: 40px;text-align: center;color: #D8E0B7;border-radius: 6px;box-shadow: 5px 3px 6px #6F7C40;background: #99B438;}" +
				".sz_time_off_c_c:active {background: #F7956C;}" +
		    "</style>" +
	          "<div class=\"sz_time_off\">" +
				"<div class=\"sz_time_off_close\"></div>" +
				"<div class=\"sz_time_off_c\">" +
				  "<div class=\"sz_time_off_c_a\">" + va + "提醒</div>" +
				  "<div class=\"sz_time_off_c_b\">" + vb + "</div>" +
				  "<div class=\"sz_time_off_c_c\">确定</div>" +
				"</div>" +
		        "<audio class=\"sz_time_off_play\" hidden loop src=\"" + vc + "\"></audio>" +
			  "</div>";
	var c = document.createElement('div');
	c.innerHTML = b;
	document.body.appendChild(c);
	var d = c.find('.sz_time_off_play')[0];
	d.ficti = d.mediumInitial();
	d.ficti.playX();
}
function defa_rem_time (o) {//设置默认时间
	var a = o.find('.sz_c_c_c_c_r_c_sy_c_c_c_x1')[0];
	var b = o.find('.sz_c_c_c_c_r_c_sy_c_c_c_x2')[0];
	var c = o.find('.sz_c_c_c_c_r_c_sy_c_c_c_x3')[0];
    var time = new Date();
	var s = time.getHours();
	var f = time.getMinutes();
	var m = time.getSeconds();
    requestAnimationFrame(function () {rem_time_if(a,s);});
    requestAnimationFrame(function () {rem_time_if(b,f);});
    requestAnimationFrame(function () {rem_time_if(c,m);});
	function rem_time_if (o,va) {
		if (va == 0) {
            o.style.top = '20px';
		} else if (va == 1) {
            o.style.top = '-40px';
		} else if (va == 2) {
            o.style.top = '-100px';
		} else if (va == 3) {
            o.style.top = '-160px';
		} else if (va == 4) {
            o.style.top = '-220px';
		} else if (va == 5) {
            o.style.top = '-280px';
		} else if (va == 6) {
            o.style.top = '-340px';
		} else if (va == 7) {
            o.style.top = '-400px';
		} else if (va == 8) {
            o.style.top = '-460px';
		} else if (va == 9) {
            o.style.top = '-520px';
		} else if (va == 10) {
            o.style.top = '-580px';
		} else if (va == 11) {
            o.style.top = '-640px';
		} else if (va == 12) {
            o.style.top = '-700px';
		} else if (va == 13) {
            o.style.top = '-760px';
		} else if (va == 14) {
            o.style.top = '-820px';
		} else if (va == 15) {
            o.style.top = '-880px';
		} else if (va == 16) {
            o.style.top = '-940px';
		} else if (va == 17) {
            o.style.top = '-1000px';
		} else if (va == 18) {
            o.style.top = '-1060px';
		} else if (va == 19) {
            o.style.top = '-1120px';
		} else if (va == 20) {
            o.style.top = '-1180px';
		} else if (va == 21) {
            o.style.top = '-1240px';
		} else if (va == 22) {
            o.style.top = '-1300px';
		} else if (va == 23) {
            o.style.top = '-1360px';
		} else if (va == 24) {
            o.style.top = '-1420px';
		} else if (va == 25) {
            o.style.top = '-1480px';
		} else if (va == 26) {
            o.style.top = '-1540px';
		} else if (va == 27) {
            o.style.top = '-1600px';
		} else if (va == 28) {
            o.style.top = '-1660px';
		} else if (va == 29) {
            o.style.top = '-1720px';
		} else if (va == 30) {
            o.style.top = '-1780px';
		} else if (va == 31) {
            o.style.top = '-1840px';
		} else if (va == 32) {
            o.style.top = '-1900px';
		} else if (va == 33) {
            o.style.top = '-1960px';
		} else if (va == 34) {
            o.style.top = '-2020px';
		} else if (va == 35) {
            o.style.top = '-2080px';
		} else if (va == 36) {
            o.style.top = '-2140px';
		} else if (va == 37) {
            o.style.top = '-2200px';
		} else if (va == 38) {
            o.style.top = '-2260px';
		} else if (va == 39) {
            o.style.top = '-2320px';
		} else if (va == 40) {
            o.style.top = '-2380px';
		} else if (va == 41) {
            o.style.top = '-2440px';
		} else if (va == 42) {
            o.style.top = '-2500px';
		} else if (va == 43) {
            o.style.top = '-2560px';
		} else if (va == 44) {
            o.style.top = '-2620px';
		} else if (va == 45) {
            o.style.top = '-2680px';
		} else if (va == 46) {
            o.style.top = '-2740px';
		} else if (va == 47) {
            o.style.top = '-2800px';
		} else if (va == 48) {
            o.style.top = '-2860px';
		} else if (va == 49) {
            o.style.top = '-2920px';
		} else if (va == 50) {
            o.style.top = '-2980px';
		} else if (va == 51) {
            o.style.top = '-3040px';
		} else if (va == 52) {
            o.style.top = '-3100px';
		} else if (va == 53) {
            o.style.top = '-3160px';
		} else if (va == 54) {
            o.style.top = '-3220px';
		} else if (va == 55) {
            o.style.top = '-3280px';
		} else if (va == 56) {
            o.style.top = '-3340px';
		} else if (va == 57) {
            o.style.top = '-3400px';
		} else if (va == 58) {
            o.style.top = '-3460px';
		} else if (va == 59) {
            o.style.top = '-3520px';
		}
	}
}


















//-->





































