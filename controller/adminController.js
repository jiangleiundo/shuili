routerApp.controller('adminController', ['$scope', function($scope){
    //页面初始化函数
    pageController.pageInit($scope, dataApi.API_GET_ADMIN, {}, function(data){
    	//列表数据模型
    	var adminModel = {
    		totalClass : commonParams.un_sel,
    		adminArray : []
    	}
    	
    	if (pageParams.num != 0)
        {
            var pageNum = Math.ceil(data.count / pageParams.num);
            pageController.pageNum(pageNum);
        }
        
        //取出服务端赋给Model
        for (var i = 0; i < data.adminList.length; ++i)
        {
            adminModel.adminArray.push({
				"id" : data.adminList[i].id,
				"username" : data.adminList[i].username,
				"password" : data.adminList[i].password,
				"userType" : data.adminList[i].adminType,
				"creatTime" : data.adminList[i].creatTime,
				"currentStyle" : commonParams.un_sel
			});
        }
        
        //view绑定Model
        $scope.adminModel = adminModel;
        $scope.$apply();
        
        //全选
        $scope.selectAll = function(currentClass){
			if(currentClass == commonParams.un_sel){
				adminModel.totalClass = commonParams.has_sel;
                for(var i = 0 ; i < adminModel.adminArray.length;i ++){
                	adminModel.adminArray[i].currentStyle = commonParams.has_sel;
                }
			}else{
				adminModel.totalClass = commonParams.un_sel;
                for(var i = 0 ; i < adminModel.adminArray.length;i ++){
                	adminModel.adminArray[i].currentStyle = commonParams.un_sel;
                }
			}
		}
        
        //单选 
        $scope.oneSel = function(id){
			for(var i = 0;i<adminModel.adminArray.length;i++){
	    		if(adminModel.adminArray[i].id == id){
	    			if(adminModel.adminArray[i].currentStyle == commonParams.un_sel){
	    				adminModel.adminArray[i].currentStyle = commonParams.has_sel;
	    			}else{
	    				adminModel.adminArray[i].currentStyle = commonParams.un_sel;
	    				adminModel.totalClass = commonParams.un_sel;
	    			}
	    		}
	    	}
		}
        
        //删除管理员
		$scope.delAdmin = function(){
			var delArr = [];
	    	for(var i = 0;i<adminModel.adminArray.length;i++){
	    		if(adminModel.adminArray[i].currentStyle == commonParams.has_sel){
	    			delArr.push(adminModel.adminArray[i].id);
	    		}
	    	}
	    	if(delArr.length == 0)
	    	{
	    		_errModal.show("请选择要删除的选项");
	    	}
	    	else
	    	{
		    	var delString = JSON.stringify(delArr);
		    	_CommonFuntion.delListByIds(delString,"adminIds",dataApi.API_DEL_ADMIN);
	    	}
		}
		
		//修改管理员
		$scope.modAdmin = function(id){
			_adminParams.userId = id;
			_adminParams.addType = 1;
			_adminParams.modalTitle = '修改管理员密码';
			_adminParams.modaltop = '原密码';
			_adminParams.modalbtm = '确认密码';
			$("#adminModal").modal('show');

			for(var i = 0 ; i < adminModel.adminArray.length;i ++){
				if(adminModel.adminArray[i].id == id){
					_adminParams.userId = adminModel.adminArray[i].id;
            	    _adminParams.txtUserName = adminModel.adminArray[i].password;//原密码/修改界面
//          	    _adminParams.perVal = adminModel.adminArray[i].permissions.split(',');
				}
            }
			
//			for(var k = 0 ; k < _adminParams.permissArr.length;k++){
//				for(var j = 0 ; j < _adminParams.perVal.length;j++){
//					if(_adminParams.permissArr[k].id == _adminParams.perVal[j]){
//						_adminParams.permissArr[k].defaultClass = commonParams.btnact;
//					}
//				}
//			}
		}
		
    });
    
    //参数和Model
    var _adminParams = {
		txtUserName : null,
		txtPwd : null,
		txtPwd2 : null,
		permissArr : permissionsArray,
		modalTitle : null,
		modaltop : null,
		modalbtm : null,
		addType : 0,
		perVal : null,
		userId : null,
	}
	
	$scope.moadlModel = _adminParams;
	$scope.adminClose = function(){
		_adminParams.txtUserName = null;
		_adminParams.txtPwd = null;
		_adminParams.txtPwd2 = null;
	}
	//添加管理员
	$scope.addAdmin = function(){
		_adminParams.addType = 0;
		_adminParams.txtUserName = null;
		_adminParams.txtPwd = null;
//		for(var i = 0;i<_adminParams.permissArr.length;i++){
//  		_adminParams.permissArr[i].defaultClass = commonParams.btnitem;
//  	}
		_adminParams.modalTitle = '添加普通管理员';
		_adminParams.modaltop = '用户名';
		_adminParams.modalbtm = '密码';

		$("#adminModal").modal('show');
	}
	
	//权限按钮选择事件
//	$scope.itemClick = function(id){
//  	for(var i = 0;i<_adminParams.permissArr.length;i++){
//  		if(_adminParams.permissArr[i].id == id){
//  			if(_adminParams.permissArr[i].defaultClass == commonParams.btnact){
//  				_adminParams.permissArr[i].defaultClass = commonParams.btnitem;
//  			}else{
//  				_adminParams.permissArr[i].defaultClass = commonParams.btnact;
//  			}
//  		}
//  	}
//  	$scope.moadlModel = _adminParams;
//  }
	
    //模态框提交事件	
	$scope.adminSubmit = function(){
//		var arr = [];
//  	for(var i = 0;i<_adminParams.permissArr.length;i++){
//  		if(_adminParams.permissArr[i].defaultClass == commonParams.btnact){
//  			arr.push(_adminParams.permissArr[i].id);
//  		}
//  	}
//  	var pIdArray = arr.join(",");

		if(_adminParams.addType == 0){
	    	var params = {
				"username" : $scope.moadlModel.txtUserName,
				"password" : $scope.moadlModel.txtPwd
//				"permissions" : pIdArray
			}
	    	
	    	$data.HttpRequest(dataApi.API_ADD_ADMIN,params,function(result){
	    		$("#adminModal").modal('hide');
	    		pageController.callApi();
	    	})
	    	
		}
		else
		{
			//验证输入是否正确
			if( adminUtilities.chackParams($scope.moadlModel) ) {

				var params = {
					"adminId" : _adminParams.userId,
//				"username" : $scope.moadlModel.txtUserName,
					"password" : $scope.moadlModel.txtPwd2
				}

				$data.HttpRequest(dataApi.API_MOD_ADMIN,params,function(result){
					$("#adminModal").modal('hide');
					_adminParams.txtPwd2 = null;//提交数据后清空input
					_adminParams.txtPwd = null;//提交数据后清空input
					pageController.callApi();
				})
			}
		}
	}
    
}]);

//验证输入是否正确
var adminUtilities = {
	chackParams : function(moadlModel){
		if( moadlModel.userId == 1)
		{
			if(moadlModel.txtPwd2 == null)
			{
				alert("输入新密码");
				return false;
			}
			if(moadlModel.txtPwd == null)
			{
				alert("确认新密码");
				return false;
			}
			if(moadlModel.txtPwd2 != moadlModel.txtPwd)
			{
				alert("新密码不一致");
				return false;
			}
			return true;
		}
		else
		{
			if(moadlModel.txtPwd2 == null)
			{
				alert("输入新密码");
				return false;
			}
			return true;
		}

	}
}

