/**
 * const.js
 * Created By: 梁勇
 * Data: 2015-08-06
 * Description: 配置文件
 */

/**************基础接口url****************/
var BASE_URL = "http://meeno.f3322.net:8082/shuili/index.php/"; //内网Url

/***************获取数据接口*****************/
var dataApi = {
	API_ADMIN_LOGIN  : BASE_URL + "account/adminLogin",
	API_GET_ADMIN    : BASE_URL + "admin/getAdminList",
	API_ADD_ADMIN    : BASE_URL + "admin/addAdmin",
	API_DEL_ADMIN    : BASE_URL + "admin/delAdmins",
	API_MOD_ADMIN    : BASE_URL + "admin/modAdmin",
	API_INFO_ADMIN   : BASE_URL + "admin/getAdminInfo",
	API_USER_LIST   : BASE_URL + "admin/userList",//用户列表
	API_USER_CHECK   : BASE_URL + "admin/checkList",//待审核用户列表
	API_USER_REFUSE   : BASE_URL + "admin/refuseList",//拒绝用户列表
	API_USER_DEL   : BASE_URL + "admin/delUsers",//删除用户
	API_USER_MOD   : BASE_URL + "admin/modUserInfo",//修改用户
	API_USER_REGISTERCHECK   : BASE_URL + "admin/registerCheck",//注册信息审核
	API_USER_ADD   : BASE_URL + "admin/addNewUser",//添加新用户
	API_GET_FEEDBACK   : BASE_URL + "admin/getFeedback",//反馈管理
	API_DEL_FEEDBACK   : BASE_URL + "admin/delFeedback"//删除反馈
}

/**************配置常量*******************/
var errCode = {
	success : 0,
	tokenFailed : 3
}

var errMessage = {
	
}

var commonParams = {
	has_sel : "has_sel",
	un_sel : "un_sel",
	btnitem : "btn_item",
	btnact : "act_item"
}

var permissionsArray = [
    {"id":'1',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'2',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'3',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'4',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'5',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'6',"val":"用户管理","defaultClass":"btn_item"},
    {"id":'7',"val":"用户管理","defaultClass":"btn_item"}
];

var pageParams = {
	num : 10,
}

//基础常量
var strKey = {
	KPHPSESSID : "KPHPSESSID",
	KrememberSta : "KrememberSta",
	KuserName : "KuserName",
	Kpwd : "Kpwd",
	KadminType : "KadminType",
	KlastLoginTime : "KlastLoginTime"
}

var $modal = {
	adminModal : $("#adminModal")
}
