routerApp.controller('userAuditListController', ['$scope', function($scope){
	//初始化函数
	pageController.pageInit($scope, dataApi.API_USER_CHECK, {}, function(data){

		var userModel = {
			userArr : [],
			search : "",
			tips: null,
			curID: null,
			status: null
		};

		if(pageParams.num != 0)
		{
			var pageNum = Math.ceil(data.count / pageParams.num);
			pageController.pageNum(pageNum);
		}

		for(var i = 0; i < data.userList.length; i++)
		{
			userModel.userArr.push({
				"userId" : data.userList[i].userId,
				"userName" : data.userList[i].userName,
				"gender" : _CommonFuntion.sex(data.userList[i].gender),
				"platformId" : data.userList[i].platformId,
				"company" : data.userList[i].company,
				"department" : data.userList[i].department,
				"registerTime" : _CommonFuntion.formatDate(data.userList[i].registerTime, false)
			})
		}

		//绑定model
		$scope.userModel = userModel;
		$scope.$apply();
		
		//处理申请status=1表示同意，2表示拒绝
		$scope.doWithRegisiter = function(userid, status){
			$("#userTips").fadeIn();
			if(status == 1)
			{
				userModel.tips = "通过申请的用户可在用户列表中查看，你确定同意该用户的申请吗？";
			}
			else
			{
				userModel.tips = "你确定要拒绝该用户的申请吗？";
			}
			userModel.curID = userid;
			userModel.status = status;
		};
		//同意
		$scope.clickForSure = function(userid, status){
			var params = {
				"userIds": '[' + userid + ']',
				"checkStatus": status
			};
			$data.HttpRequest(dataApi.API_USER_REGISTERCHECK, params, function(result){
				$("#userTips").hide();
				pageController.callApi();
			})
		};
		//拒绝
		$scope.clickForQuit = function(){
			$("#userTips").hide();
		};
		//搜索名字
		$scope.search = function(searchName)
		{

			var params = {
				"name": searchName
			};
			pageController.searchChange(params);
		};

	})
}])
