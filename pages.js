var page = localStorage.getItem('page');

$(function(){
  $(page).css('background-color', '#65a741');
  $('.dropdown ' + page).css('background-color', '#585');
});

$(function() {
  $('.your-food').click(function() {
    localStorage.setItem('page', '.your-food');
    window.location.href = 'kitchen.html';
  });
  $('.calendar').click(function() {
    localStorage.setItem('page', '.calendar');
    window.location.href = 'calendar.html';
  });
  $('.stats').click(function() {
    localStorage.setItem('page', '.stats');
  });
  $('.account').click(function() {
    localStorage.setItem('page', '.account');
  });
});

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
      localStorage.setItem('page', '.your-food');
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
      localStorage.setItem('page', '.your-food');
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});


var initFood = "beef;yogurt;chicken;lettuce;eggplant;cereal;bread;milk;strawberry;pizza;";
var initPurDate = "2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;";
var initExpDate = "2019-03-19;2019-02-28;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-02-24;";
$(document).ready(function(){
  init();
function init(){
  //status = localStorage.getItem("status");
  //if(status == "T"){
  if( !sessionStorage.started){         // our list restores back to default everytime we close chrome (not refresh)
    sessionStorage.started = 1;           //I think that's probably easier for our testing stage.
    localStorage.setItem("name", initFood);
    localStorage.setItem("expirydate",initExpDate);
    localStorage.setItem("purchasedate",initPurDate);
  }

    mytable = document.getElementById("tableId");
        //insert a row at very end
    var namelist = localStorage.getItem("name").split(';');
    var datelist = localStorage.getItem("expirydate").split(';');

    var i;
    for(i = 0; i < namelist.length - 1; i++){
      newRow = mytable.insertRow(mytable.getElementsByTagName("tr").length);
      cellA = newRow.insertCell(0);
      cellB = newRow.insertCell(1);
      cellC = newRow.insertCell(2);

      cellA.innerHTML = namelist[i];
      cellB.innerHTML = datelist[i];
      cellC.innerHTML = "Delete";
    }
    localStorage.setItem("status", "F");

  //}

}
});

function readdate() {
  var purchasedate = document.getElementById("foodinputpurchasedate").value;
  var expirydate = document.getElementById("foodinputexpirydate").value;
  var name = document.getElementById("foodinputname").value;

  localStorage.setItem("purchasedate",localStorage.getItem("purchasedate")  + purchasedate + ";");//svae to localStorage
  localStorage.setItem("expirydate", localStorage.getItem("expirydate")  + expirydate + ";");
  localStorage.setItem("name",localStorage.getItem("name") + name + ";");

  if(purchasedate == "")
  {
     alert("Please input purchase date");
  }
  else if(expirydate == "")
  {
     alert("Please input expiry date");
  }
  else if(name == "")
  {
     alert("please input food name");
  }
  else
  {
     $('.modal').hide();
     window.location.assign('kitchen.html');
     //window.event.returnValue=false;
     //return false;
  }
}

$(function(){
  $('.add-food').click(function(){
    $('.modal').show();
})});

$(function(){
  $('#back-button').click(function(){
    $('.modal').hide();
})});

function input_confirmation() {
// pop-up as Confirmation Page
  if (confirm("-----Confirm the Input?----- ")) {
      alert("Successfully Added")
      readdate()
  }
  else {
  }

}

function searchItem(){
  // get the searchingInformation first
  target = document.getElementById("Target").value
  database = initFood
  var index = database.search(target);
  if (index == -1) {
    alert("Don't find this item!")
  }else{

  }
}
