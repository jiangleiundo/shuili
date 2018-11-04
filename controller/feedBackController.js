routerApp.controller('feedBackController', ['$scope', function($scope){
    pageController.pageInit($scope, dataApi.API_GET_FEEDBACK, {}, function(data){
        var feedModel = {
            feedList : [],
            totalClass : commonParams.un_sel
        };
        if(pageParams.num != 0)
        {
            var pageNum = Math.ceil(data.count / pageParams.num);
            pageController.pageNum(pageNum);
        }

        for(var i = 0; i < data.feedback.length; i++)
        {
            feedModel.feedList.push({
                "id": data.feedback[i].id,
                "userId": data.feedback[i].userId,
                "adviceContent": data.feedback[i].adviceContent,
                "adviceTime": _CommonFuntion.formatDate(data.feedback[i].adviceTime, false),
                "userName": data.feedback[i].userName,
                "currentStyle" : commonParams.un_sel,

            })
        }

        //绑定model
        $scope.feedModel = feedModel;
        $scope.$apply();


        //多选
        $scope.allSel = function(currentClass){
            if(currentClass == commonParams.un_sel)
            {
                feedModel.totalClass = commonParams.has_sel;
                for(var i = 0; i < feedModel.feedList.length; i++)
                {
                    feedModel.feedList[i].currentStyle = commonParams.has_sel;
                }
            }
            else
            {
                feedModel.totalClass = commonParams.un_sel;
                for(var i = 0; i < feedModel.feedList.length; i++)
                {
                    feedModel.feedList[i].currentStyle = commonParams.un_sel;
                }
            }
        }
        //单选
        $scope.oneSel = function(id){
            for(var i = 0; i < feedModel.feedList.length; i++)
            {
                if(feedModel.feedList[i].userId == id)
                {
                    if(feedModel.feedList[i].currentStyle == commonParams.un_sel)
                    {
                        feedModel.feedList[i].currentStyle = commonParams.has_sel;
                    }
                    else
                    {
                        feedModel.feedList[i].currentStyle = commonParams.un_sel;
                        feedModel.totalClass = commonParams.un_sel;
                    }
                }
            }
        }

        //删除用户
        $scope.delUser = function(){
            var userIdArr = [];
            for(var i = 0; i < feedModel.feedList.length; i++ )
            {
                if(feedModel.feedList[i].currentStyle == commonParams.has_sel)
                {
                    userIdArr.push(feedModel.feedList[i].id);
                }
            }
            if(userIdArr.length == 0)
	    	{
	    		_errModal.show("请选择要删除的选项");
	    	}
	    	else
	    	{
		    	var delString = JSON.stringify(userIdArr);
            	_CommonFuntion.delListByIds(delString, "feedbackIds", dataApi.API_DEL_FEEDBACK);
	    	}

        }
    })
}]);