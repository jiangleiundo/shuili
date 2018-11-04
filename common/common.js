var _CommonFuntion = {
	delListByIds : function(delids,delKey,api){
		var params = {};
		params[delKey] = delids;
		$data.HttpRequest(api,params,_CommonFuntion.delCallback);
	},
	
	delCallback : function(data){
		_errModal.show("删除成功");
		pageController.callApi();
	},
	
	//时间戳转日期 YYYY-MM-DD HH:SS
    formatDate : function(timestamp, onlyDate)
    {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        if (onlyDate)
        {
            return year + "-" + month + "-" + day;
        }
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;    
    },
    
    //判断性别
    sex : function(type)
    {
    	var sexType = "";
    	if(type == "1")
    	{
    		sexType = "男";
    	}
    	else
    	{
    		sexType = "女";
    	}
    	return sexType;
    },

	//验证手机号
	checkPhone : function(tel){
		var mobile = /^1[3|4|5|8|7]\d{9}$/;
		return mobile.test(tel);
	},

	//密码长度大于6
	checkPwd : function(pwd){
		if(pwd.length < 6)
		{
			return false;
		}
		return true;
	}
}
