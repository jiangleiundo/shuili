routerApp.controller('userRefuseListController', ['$scope', function($scope){
    pageController.pageInit($scope, dataApi.API_USER_REFUSE, {}, function(data){
        var userModel = {
            refusrListArr : [],
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
            userModel.refusrListArr.push({
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

        //重新通过申请
        $scope.yesForCheck = function(userid, status){
			$("#userTips").fadeIn();
            userModel.tips = "重新通过申请的用户可在用户列表中查看，你确定重新通过吗？";
            userModel.curID = userid;
            userModel.status = status;
        };
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
    });
}]);