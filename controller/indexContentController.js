routerApp.controller('indexContentController', ['$scope', function($scope){
	$scope.indexModel = {
		adminName : localStorage.getItem(strKey.KuserName),
		adminType : localStorage.getItem(strKey.KadminType),
		adminLastLoginTime : localStorage.getItem(strKey.KlastLoginTime)
	};
}])