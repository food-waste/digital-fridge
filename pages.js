$(function(){
  if (localStorage.getItem('login') == 'false') {
    $('nav h1').html(localStorage.getItem('first_name') + '\'s Kitchen');
  } else {
    $('nav h1').html('Your Kitchen');
  }
});

$(function(){
   $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
});

$(function(){
  $('#login_button').click(function(){
    if($('#login_username').val() == ""){
      $('.nouser').show();
    } if ($('#login_password').val() == "") {
      $('.nopwd').show();
    } else {
      localStorage.setItem('login', 'true');
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});

$(function(){
  $('#create_button').click(function(){
    if($('#first_name').val() == ""){
      $('.noname').show();
    } if ($('#create_username').val() == "") {
      $('.nouserc').show();
    } if ($('#create_password').val() == "") {
      $('.nopwdc').show();
    } if ($('#create_email').val() == "") {
      $('.noemail').show();
    } else {
      var name = $('#first_name').val();
      localStorage.setItem('login', 'false');
      localStorage.setItem('first_name', name);
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});


$( document ).ready(function() {
  var status = localStorage.getItem("status");
  var mytable = document.getElementById("tableId");
  if(status == "T"){
    var pDate = localStorage.getItem("purchasedate");
    var mytable = document.getElementById("tableId");
    
    var newRow = mytable.insertRow(mytable.getElementsByTagName("tr").length); 
    var cellA = newRow.insertCell(0);
    var cellB = newRow.insertCell(1);
    var cellC = newRow.insertCell(2);

    cellA.innerHTML = "name";
    cellB.innerHTML = pDate;
    cellC.innerHTML = "expireDate";
  }
  
});


function readdate() {
  var purchasedate = document.getElementById("foodinputpurchasedate").value;
  var expirydate = document.getElementById("foodinputexpirydate").value;
  var name = document.getElementById("foodinputname").value;
  //var purchasedate = document.querySelector('input[id="date"]');
  
  localStorage.setItem("status", "T");
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

init();