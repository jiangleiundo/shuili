var routerApp = angular.module('adminApp', ['ui.router', 'ngAnimate']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index_content');
	$stateProvider
        .state('index_content', {
            url: '/index_content',
            templateUrl: 'view/index_content.html',
            controller: 'indexContentController'
        })
	    .state('admin', {
	        url: '/admin',
	       templateUrl: 'view/admin.html',
	       controller : "adminController"
	    })
	    .state('modPwd', {
	        url: '/modPwd',
	       templateUrl: 'view/modpwd.html'
	    })
		.state('userCommon', {
			url: '/userCommon',
			templateUrl: 'view/userCommon.html',
			controller: 'userCommonController'
		})
		.state('userList', {
			url: '/userList',
			templateUrl: 'view/userList.html',
			controller: 'userListController'
		})
		.state('userAuditList', {
			url:'/userAuditList',
			templateUrl: 'view/userAuditList.html',
			controller: 'userAuditListController'
		})
		.state('userRefuseList', {
			url: '/userRefuseList',
			templateUrl: 'view/userRefuseList.html',
			controller: 'userRefuseListController'
		})
		.state('feedBack', {
			url: '/feedBack',
			templateUrl: 'view/feedBack.html',
			controller: 'feedBackController'
		})
});