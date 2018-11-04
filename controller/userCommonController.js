routerApp.controller('userCommonController', ['$scope', function($scope){

    scope = $scope;
    $data.HttpRequest(dataApi.API_INFO_ADMIN, {}, function(data){
        var adminInfo = data.adminInfo;
        scope.userComModel = adminInfo;
        scope.$apply();
    });

    //参数和Model
    var adminParams = {
		txtUserName : null,
		txtPwd : null,
		txtPwd2 : null,
		modalTitle : null,
		modaltop : null,
		modalbtm : null,
		userId : null
	}

	scope.moadlModel = adminParams;
    scope.adminClose = function(){
        adminParams.txtPwd = null;
        adminParams.txtPwd2 = null;
    }
    scope.modAdmin = function(){
        adminParams.userId = 1;//次处为了人adminModel中的部分模块显示，假设有一个userId为1。
        adminParams.txtUserName = scope.userComModel.password;//给model赋值，原始密码
        adminParams.modalTitle = '修改密码';
        adminParams.modaltop = '原密码';
        adminParams.modalbtm = '确认密码';
        $("#adminModal").modal('show');
    }

    scope.adminSubmit = function(){
        //验证输入是否正确
        if( adminComUtilities.chackParams(scope.moadlModel) ) {

            var params = {
                "adminId" : scope.userComModel.id,
                "password" : scope.moadlModel.txtPwd2
            }

            $data.HttpRequest(dataApi.API_MOD_ADMIN,params,function(result){
                $("#adminModal").modal('hide');
                adminParams.txtPwd2 = null;//提交数据后清空input
                adminParams.txtPwd = null;//提交数据后清空input
                $data.HttpRequest(dataApi.API_INFO_ADMIN, {}, function(data){
                    var adminInfo = data.adminInfo;
                    scope.userComModel = adminInfo;
                    scope.$apply();
                });
            })
        }
    }
}]);

//验证输入是否正确
var adminComUtilities = {
    chackParams : function(moadlModel){

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
}