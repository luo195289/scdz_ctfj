<!--
document.ready(function () {
  //---------护理
	  _('.bc_left_c_con').events('click',function (e) {
		  var a = this.index('.bc_left_c_con');
		  _('.bc_l_nv').css({'top':a*89 + 'px'});
		  _('.bc_right_c').css({'display':'none'});
		  _('.bc_right_c')[a].css({'display':'block'});
		  this.stopBubble(e);
	  });
	  _('.bc_r_c_a_c_l_a_t_c').events('click',function () {
		  var a = this.index('.bc_r_c_a_c_l_a_t_c');
		  _('.bc_r_c_a_c_l_a_t_c').css({'background':'#999999'});
		  this.style.background = '#FC8E62';
		  _('.bc_r_c_a_c_l_a_c_con').css({'display':'none'});
		  _('.bc_r_c_a_c_l_a_c_con')[a].css({'display':'block'});
		  this.stopBubble(e);
	  });
  //---------医生
	  _('.ys_c_c_l_t_x_c').events('touchstart',function () {
		  this.style.backgroundX = this.style.background;
		  this.style.background = '#F7956C';
		  var a = _('.ys_c_c_l_t_c_c');
		  var b;
		  for (var i = 0;i<a.length;i++) {
			  if (window.getComputedStyle(a[i]).getPropertyValue("display") == 'block') {
				  b = i;
				  b = (this.className == 'ys_c_c_l_t_x_l ys_c_c_l_t_x_c') ? (i - 1) : (i + 1);
				  if (b == a.length || b == -1) return;
				  continue;
			  }
		  }
		  _('.ys_c_c_l_t_c_c').css({'display':'none'});
		  _('.ys_c_c_l_t_c_c')[b].css({'display':'block'});
		  _('.ys_c_c_l_c_c').css({'display':'none'});
		  _('.ys_c_c_l_c_c')[b].css({'display':'block'});
	  });
	  _('.ys_c_c_l_t_x_c').events('touchend',function () {
		  this.style.background = this.style.backgroundX;
	  });
	  _('.ys_c_c_l_c_c_c').events('touchstart',function () {
		  this.style.boxShadowX = this.style.boxShadow;
		  this.style.boxShadow = '0 0 15px #F7956C';
	  });
	  _('.ys_c_c_l_c_c_c').events('touchend',function () {
		  this.style.boxShadow = this.style.boxShadowX;
	  });
  //---------费用
	  _('.gb_c_b_c_b_b_b_ac div').events('mousedown',function () {
		  this.parentNode.style.backgroundColorS =  this.parentNode.style.backgroundColor;
		  this.parentNode.style.backgroundColor = '#B4F28B';
	  });
	  _('.gb_c_b_c_b_b_b_ac div').events('mouseup',function () {
		  this.parentNode.style.backgroundColor = this.parentNode.style.backgroundColorS;
	  });
  //---------科室
	  _('.ks_c_c_l_t_c').events('click',function () {
		  var a = this.index('.ks_c_c_l_t_c');
		  _('.ks_c_c_l_t_c').css({'background':'#E8F2F0'});
		  this.style.backgroundColor = '#CBEAE3';
		  _('.ks_c_c_r_c').css({'display':'none'});
		  _('.ks_c_c_r_c')[a].css({'display':'block'});
	  });
  //---------导航
	  var colour = _('.dh_c_c_l_b_t_c_c');
	  for (var i = 0;i<colour.length;i++) {
		  colour[i].backgroundX = window.getComputedStyle(colour[i]).getPropertyValue("background-color");
	  }
	  _('.dh_c_c_l_b_t_c_c').events('click',function () {
		  var a = this.closest('.dh_c_c_l_b_t_c');
		  var b = a.index('.dh_c_c_l_b_t_c');
		  _('.dh_c_c_l_b_c_c').css({'display':'none'});
		  _('.dh_c_c_l_b_c_c')[b].css({'display':'block'});

		  colour = _('.dh_c_c_l_b_t_c_c');
		  for (var i = 0;i<colour.length;i++) {
			  if (i == 0 || i == 1 || i == 2) {
				  colour[i].style.background = '#EA7E55';
				  continue;
			  }
			  colour[i].style.background = colour[i].backgroundX;
		  }
		  var c = a.find('.dh_c_c_l_b_t_c_c');
		  _(c).css({'background':'#83C15F'});
		  _('.dh_c_c_l_b_t_x').css({'top':b*56 + 'px'});
		
		  this.stopBubble();
	  });
	  _('.dh_c_c_l_a_c_go').events('touchstart',function () {
		  this.style.borderX = this.style.border;
		  this.style.backgroundColorX = this.style.backgroundColor;
		  this.style.border = '2px solid #E5F00A';
		  this.style.backgroundColor = '#F79050';
	  });
	  _('.dh_c_c_l_a_c_go').events('touchend',function () {
		  this.style.border = this.style.borderX;
		  this.style.backgroundColor = this.style.backgroundColorX;
	  });
	  _('.dh_c_c_l_a_c_b').events('click',function () {
		  var a = this.index('.dh_c_c_l_a_c_b');
		  if (a == 0) {
			  _('.dh_c_c_l_b_c_x_x1').css({'left':'245px'});
		  } else if (a == 1) {
			  _('.dh_c_c_l_b_c_x_x1').css({'left':'567px'});
		  }
	  });
  //---------帮助
	  _('.bz_c_c_a_c').events('click',function () {
		  var a = this.index('.bz_c_c_a_c');
		  _('.bz_c_c_b_c').css({'display':'none'});
		  _('.bz_c_c_b_c')[a].css({'display':'block'});
		  _('.bz_c_c_a_x').css({'top':a*51 + 'px'});
	  });
	  _('.bz_c_c_b_c_xj').events('touchstart',function () {
		  this.style.boxShadowX = this.style.boxShadow;
		  this.style.boxShadow = '0 0 15px #FC6F39';
	  });
	  _('.bz_c_c_b_c_xj').events('touchend',function () {
		  this.style.boxShadow = this.style.boxShadowX;
	  });
  //---------投诉
	  _('.ts_c_c_a_c').events('click',function () {
		  var a = this.index('.ts_c_c_a_c');
		  _('.ts_c_c_b_c').css({'display':'none'});
		  _('.ts_c_c_b_c')[a].css({'display':'block'});
		  _('.ts_c_c_a_x').css({'top':a*51 + 'px'});
	  });
  //---------设置
	  _('.sz_c_c_c_c_l_c').events('click',function () {
		  var a = this.index('.sz_c_c_c_c_l_c');
		  _('.sz_c_c_c_c_l_c').css({'background':'rgba(0,0,0,0.3)'});
		  this.style.background = 'rgba(0,0,0,0.6)';
		  _('.sz_c_c_c_c_r_c').css({'display':'none'});
		  var o = _('.sz_c_c_c_c_r_c');
		  o[a].css({'display':'block'});
		  if (this.innerText == '输液提醒' || this.innerText == '吃药提醒' || this.innerText == '手术提醒' || this.innerText == '检查提醒') {
              requestAnimationFrame(function () {defa_rem_time(o[a]);});     
		  }
	  });
  //###################### 接口调用 ########################
    requestAnimationFrame(left_time);
    requestAnimationFrame(call_click);
	requestAnimationFrame(hl_cost_move);
	requestAnimationFrame(cost_details_1360_768);
	requestAnimationFrame(mission);
	requestAnimationFrame(medi_set);
	requestAnimationFrame(medi_remind);
	requestAnimationFrame(cost_prop);
	requestAnimationFrame(naviga_coor);
});









//-->


























