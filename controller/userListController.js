routerApp.controller('userListController', ['$scope', function($scope){
    pageController.pageInit($scope, dataApi.API_USER_LIST, {}, function(data){
        var userModel = {
            userArrey : [],
            totalClass : commonParams.un_sel,
            search : ""
        };
        if(pageParams.num != 0)
        {
            var pageNum = Math.ceil(data.count / pageParams.num);
            pageController.pageNum(pageNum);
        }

        for(var i = 0; i < data.userList.length; i++)
        {
        	userModel.userArrey.push({
                "userId" : data.userList[i].userId,
                "userName" : data.userList[i].userName,
                "gender" : _CommonFuntion.sex(data.userList[i].gender),
                "platformId" : data.userList[i].platformId,
                "company" : data.userList[i].company,
                "department" : data.userList[i].department,
                "lastLoginTime" : _CommonFuntion.formatDate(data.userList[i].registerTime, false),
                "currentStyle" : commonParams.un_sel
            })
        }

        $scope.userModel = userModel;
        $scope.$apply();
		
		
		//多选
		$scope.allSel = function(currentClass){
			if(currentClass == commonParams.un_sel)
			{
				userModel.totalClass = commonParams.has_sel;
				for(var i = 0; i < userModel.userArrey.length; i++)
				{
					userModel.userArrey[i].currentStyle = commonParams.has_sel;
				}
			}
			else
			{
				userModel.totalClass = commonParams.un_sel;
				for(var i = 0; i < userModel.userArrey.length; i++)
				{
					userModel.userArrey[i].currentStyle = commonParams.un_sel;
				}
			}
		}
		//单选
		$scope.oneSel = function(id){
			for(var i = 0; i < userModel.userArrey.length; i++)
			{
				if(userModel.userArrey[i].userId == id)
				{
					if(userModel.userArrey[i].currentStyle == commonParams.un_sel)
					{
						userModel.userArrey[i].currentStyle = commonParams.has_sel;
					}
					else
					{
						userModel.userArrey[i].currentStyle = commonParams.un_sel;
						userModel.totalClass = commonParams.un_sel;
					}
				}
			}
		}

        //删除用户
        $scope.delUser = function(){
            var userIdArr = [];
            for(var i = 0; i < userModel.userArrey.length; i++ )
            {
                if(userModel.userArrey[i].currentStyle == commonParams.has_sel)
                {
                    userIdArr.push(userModel.userArrey[i].userId);
                }
            }
            if(userIdArr.length == 0)
	    	{
	    		_errModal.show("请选择要删除的选项");
	    	}
	    	else
	    	{
		    	 var delString = JSON.stringify(userIdArr);
            	_CommonFuntion.delListByIds(delString, "userIds", dataApi.API_USER_DEL);
	    	}

        }
        //修改用户信息
        $scope.modUser = function(id){
            userParams.modelTitle = "修改用户信息";
            userParams.addType = 0;
            userParams.userID = id;
            $("#userModal").modal('show');
            for(var i=0; i< userModel.userArrey.length; i++)
            {
                if(userModel.userArrey[i].userId == id)
                {
                    userParams.name = userModel.userArrey[i].userName;
                    userParams.phone = userModel.userArrey[i].platformId;
                    userParams.department = userModel.userArrey[i].department;
                }
            }
        }
    });

    //搜索名字
    $scope.search = function(searchName)
    {

        var params = {
            "name": searchName
        };
        pageController.searchChange(params);
    };

    //参数和model
    var userParams = {
        "name": null,
        "phone": null,
        "pwd": null,
        "company": null,
        "department": null,
        "addType": null,
        "modelTitle": null,
        "userID": null
    };
    //参数model
    $scope.paramsModel = userParams;
    $scope.userClose = function(){
        userParams.name = null;
        userParams.phone = null;
        userParams.pwd = null;
        userParams.company = null;
        userParams.department = null;
        $("#userModal").modal('hide');
    };
    //添加新用户
    $scope.addUser = function(){
        userParams.modelTitle = "添加新用户";
        userParams.addType = 1;
        $("#userModal").modal('show');

    };
    //提交数据
    $scope.userSubmit = function(){
        if(userParams.addType == 0)
        {
            if( userUtilities.checkParams($scope.paramsModel) == true )
            {
                var params = {
                    "userId" : userParams.userID,
                    "username": userParams.name,
                    "platformId": userParams.phone,
                    "department": userParams.department
                }
                $data.HttpRequest(dataApi.API_USER_MOD, params, function(result){
                    $("#userModal").modal("hide");
                    pageController.callApi();
                });
            }
        }
        else
        {
            if( userUtilities.checkParams($scope.paramsModel) == true )
            {
                var params = {
                    "username": userParams.name,
                    "platformId": userParams.phone,
                    "password": userParams.pwd,
                    "company": userParams.company,
                    "department": userParams.department
                }
                $data.HttpRequest(dataApi.API_USER_ADD, params, function(result){
                    $("#userModal").modal("hide");
                    userParams.name = null;
			        userParams.phone = null;
			        userParams.pwd = null;
			        userParams.company = null;
			        userParams.department = null;
                    //alert("添加新用户成功，可在待审核列表中查看");
                });
            }
        }
    }
}]);

//验证表单
var userUtilities = {
    checkParams : function(paramsModel){
        if(paramsModel.name == null || paramsModel.name == "")
        {
            alert("请输入用户名");
            return false;
        }
        if(paramsModel.phone == null || paramsModel.phone == "")
        {
            alert("请输入手机号");
            return false;
        }
        if( _CommonFuntion.checkPhone(paramsModel.phone) == false)
        {
            alert("请输入11位有效的手机号");
            return false;
        }
        if(paramsModel.department == null || paramsModel.department == "")
        {
            alert("请输入部门");
            return false;
        }
        if(paramsModel.addType == 1)
        {

            if(paramsModel.pwd == null || paramsModel.pwd == "")
            {
                alert("请输入密码");
                return false;
            }
            if(_CommonFuntion.checkPwd(paramsModel.pwd) == false)
            {
                alert("密码长度必须大于6");
                return false;
            }
            if(paramsModel.company == null || paramsModel.company == "")
            {
                alert("请输入公司名称");
                return false;
            }

        }

        return true;
    }
}