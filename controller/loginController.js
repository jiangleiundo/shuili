$(function(){
	var remSta = localStorage.getItem(strKey.KrememberSta);
	if(remSta == 1){
		_loginParams.userName.val(localStorage.getItem(strKey.KuserName));
		_loginParams.pwd.val(localStorage.getItem(strKey.Kpwd));
		_loginParams.remCon.attr("class",_loginParams.hasSel);
	}else{
		_loginParams.userName.val("");
		_loginParams.pwd.val("");
	}
});

var _loginParams = {
	hasSel : "has_sel",
	unSel : "un_sel",
	userName : $("#userName"),
	remCon : $(".remBox span"),
	pwd : $("#pwd"),
	remremberSta : 0,
	btnLogin : $(".btn_login"),
	isLoginErr : true
}

//自定义checkbox
_loginParams.remCon.on("click",function(){
	var curClass = $(this).attr("class");
	if(curClass == _loginParams.unSel){
		$(this).attr("class",_loginParams.hasSel);
		_loginParams.remremberSta = 1;
	}
	else{
		$(this).attr("class",_loginParams.unSel);
		_loginParams.remremberSta = 0;
	}
})

//登录点击操作
_loginParams.btnLogin.on("click",function(){
	loginModel.valiDateValue(_loginParams.userName.val(),_loginParams.pwd.val());
})

var loginModel = {
	
	valiDateValue : function(userName,pwd){
		if(userName == "" && pwd == "")
		{
			_errModal.show("用户名不能为空");
			_loginParams.isLoginErr = false;
		}
		else if
		(userName == "")
		{
			_errModal.show("用户名不能为空");
			_loginParams.isLoginErr = false;
		}
		else if(pwd == "")
		{
			_errModal.show("密码不能为空")
			_loginParams.isLoginErr = false;
		}
		else
		{
			loginModel.adminLogin(userName,pwd);
			_loginParams.isLoginErr = true;
		}
	},
	
	adminLogin : function(userName,pwd){
		var params = {
			"username" : userName,
			"password" : pwd
		}
		$data.HttpRequest(dataApi.API_ADMIN_LOGIN, params, loginModel.loginCallback);
	},
	
	loginCallback : function(data){
		localStorage.setItem(strKey.KPHPSESSID,data["sessionId"]);
		localStorage.setItem(strKey.KadminType, data.adminObj.adminType);
		var loginTimeStamp = data.adminObj.lastLoginTime;
		var last_login_time = _CommonFuntion.formatDate(loginTimeStamp, false);
		localStorage.setItem(strKey.KlastLoginTime, last_login_time);
		if(_loginParams.remremberSta == 1){
			localStorage.setItem(strKey.KrememberSta,1);
			localStorage.setItem(strKey.KuserName,_loginParams.userName.val());
			localStorage.setItem(strKey.Kpwd,_loginParams.pwd.val());
		}else{
			localStorage.setItem(strKey.KrememberSta,0);
			localStorage.setItem(strKey.KuserName,_loginParams.userName.val());
			localStorage.setItem(strKey.Kpwd,"");
		}
		location.href = "index.html";
	}
}

document.onkeypress = function(){
	if(_loginParams.isLoginErr)
	{
		if(event.keyCode == 13){//13 回车键
	    	loginModel.valiDateValue(_loginParams.userName.val(),_loginParams.pwd.val());
		}
	}
	
};
 
