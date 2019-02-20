$(document).ready(function(){


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

function readdate() {
   var purchasedate = document.getElementById("foodinputpurchasedate").value;
   var expirydate = document.getElementById("foodinputexpirydate").value;
   var name = document.getElementById("foodinputname").value;
   //var purchasedate = document.querySelector('input[id="date"]');
   
   localStorage.setItem("purchasedate",purchasedate) ;//svae to localStorage
   
   if(purchasedate == "")
   {
      alert("Please input purchase date");
   }
   else if(expirydate == "")
   {
      alert("Please input expiry date");
   }
   else if(name =="")
   {
      alert("please input food name");
   }
   else
   {
      window.location.assign("kitchen.html")
      //window.event.returnValue=false;
      //return false;
   }
}

function manualInput(){
   // var name = document.getElementById("name").value;
   // var purchaseDate = document.getElementById("purchase").value;
   // var expireDate = document.getElementById("expiry").value;
   
   var mytable = document.getElementById("tableId");
   
   //mytable.getElementsByTagName("tr").length
   var newRow = mytable.insertRow(0);
   
   var cellA = newRow.insertCell(0);
   var cellB = newRow.insertCell(1);
   var cellC = newRow.insertCell(2);
   
   cellA.innerHTML = "name";
   cellB.innerHTML = "purchaseDate";
   cellC.innerHTML = "expireDate";
   
}

function appendTable(){
   var txt1="<table><tr><td>Test</td><td>Test</td><td>Test</td></tr></table>";

   $("body").append(txt1);
}