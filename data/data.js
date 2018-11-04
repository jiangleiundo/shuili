/**
 * meeno.js
 * Created By: 梁勇
 * Data: 2015-08-06
 * Description: 提供基础方法和共用方法
 */

var $data = {
	HttpRequest : function(apiUrl,dataParams,callBack)
	{
		var phpSessId = localStorage.getItem(strKey.KPHPSESSID);	
		if ((phpSessId != null) && (phpSessId != ''))
		{
			apiUrl = apiUrl + "?sid=" + phpSessId;
		}
	    $.ajax({        
	        url: apiUrl,
	        async:true,
	        type: "post",
	        data: dataParams,
	        dataType:"json",
	        success: function(data) {         	
	        	var err = data['err'];
	            var errMsg = data['errMsg'];
	            if (err != errCode.success)
	            {
	                // 调用接口返回错误
	                if (errMsg != "")
	                {
	                	_errModal.show(errMsg);
	                }                
	                if (err == errCode.tokenFailed)
	                {
	                    // 会话不存在，需要清本地数据
	                    location.href = "login.html";
	                }                
	            }    
	            else
	            {
	                callBack(data["data"]);
	            }        	        	
		    },
	        error: function () {
	           _errModal.show("请求数据失败");
	        }
	    });
	}
};


