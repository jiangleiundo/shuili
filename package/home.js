var homeParams = {
	nav : $(".nav div"),
	navItem : "nav_menu",
	navItemActive : "nav_act"
}

homeParams.nav.on("click",function(){
	$(this).attr("class",homeParams.navItemActive).siblings("div").attr("class",homeParams.navItem);
	$(this).next(".nav_content").slideToggle(200).siblings(".nav_content").slideUp(200);
})

$(".logout_container").on("click",function(){
	if($(".dropdown_menu").css("display") == "none"){
		$(".logout_container").addClass("logout_active");
		$(".dropdown_menu").show();
	    $(".dropdown_menu").addClass("animated fadeInUp");
	}else{
		$(".logout_container").removeClass("logout_active");
		$(".dropdown_menu").hide();
	    $(".dropdown_menu").removeClass("animated fadeInUp")
	}
})

$(".menu").on("click",function(){
	if($(".left_side").width() > 0){
		$('.left_side').css('width','0px');
		$('.right_side').css('margin-left','0px');
	}else{
		$('.left_side').css('width','230px');
		$('.right_side').css('margin-left','230px');
	}
})

$("#logout").on("click",function(){
	location.href = "login.html";
})