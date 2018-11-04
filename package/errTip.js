var _errModal = {
	show : function(errMsg){
		var html = '';
		html += '<div class="err_bg"></div>';
		html += '<div class="errModal">';
		html += '<div class="errMoadl_top">提示</div>';
		html += '<div class="errMoadl_txt">'+errMsg+'</div>';
		html += '</div>';
		$("body").append(html);
		$(".err_bg").show();
		$(".errModal").show();
		$(".errModal").addClass("animated zoomInSm");
		
		$(".err_bg").on("click",function(){
			$(".err_bg").remove();
		    $(".errModal").remove();
		    _loginParams.isLoginErr = true;
		})
	}
}
