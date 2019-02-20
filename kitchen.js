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

function readdate(){
   var purchasedate = document.getElementById("foodinputpurchasedate").value;
   var expirydate = document.getElementById("foodinputexpirydate").value;
   var name = document.getElementById("foodinputname").value;
   //var purchasedate = document.querySelector('input[id="date"]');
   if(purchasedate == "")
   {
      alert("Please input purchasedate");
   }
   else if(expirydate == "")
   {
      alert("Please input expirydate");
   }
   else if(name =="")
   {
      alert("please input food name");
   }
   else
   {
      onclick = window.location("kitchen.html")
      return false;
   }
   
}