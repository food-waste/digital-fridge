$(document).ready(function(){

   $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });

   
});
$(document).ready(function(){
$("#login_username").keyup(function(){
   if($("#login_username").val() == ""){
      $(".nouser").show(); 
   }else{
      $(".nouser").hide();
   }
 });
});

$(document).ready(function(){
$("#login_password").keyup("input propertychange",function(){
   if($("#login_password").val() != "123"){
      $(".nopwd").show();
   }else{
      $(".nopwd").hide(); 
   }
});
});