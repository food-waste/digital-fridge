var page = localStorage.getItem('page');

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
  $('.your-food').click(function(){
    localStorage.setItem('page', '.your-food');
    window.location.href = 'kitchen.html';
  });
  $('.calendar').click(function(){
    localStorage.setItem('page', '.calendar');
    window.location.href = 'calendar.html';
  });
});

$(function(){
  $(page).css('background-color', '#65a741');
});

$(function(){
  $('#login_button').click(function(){
    if($('#login_username').val() == ""){
      $('.nouser').show();
    } if ($('#login_password').val() == "") {
      $('.nopwd').show();
    } if ($('#login_username').val() != "" &&
          $('#login_password').val() != ""){
      localStorage.setItem('page', '.your-food');
      localStorage.setItem('login', 'true');
      window.location.href = 'kitchen.html';
      return false;
    }
  });
});

$(function(){
  $('#create_button').click(function(){
    if ($('#first_name').val() == ""){
      $('.noname').show();
    } if ($('#create_username').val() == "") {
      $('.nouserc').show();
    } if ($('#create_password').val() == "") {
      $('.nopwdc').show();
    } if ($('#create_email').val() == "") {
      $('.noemail').show();
    } if ($('#first_name').val() != "" &&
          $('#create_username').val() != "" &&
          $('#create_password').val() != "" &&
          $('#create_email').val() != ""){
      var name = $('#first_name').val();
      localStorage.setItem('page', '.your-food');
      localStorage.setItem('login', 'false');
      localStorage.setItem('first_name', name);
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

    localStorage.setItem("newName", "");
    localStorage.setItem("newPurchDate", "");
    localStorage.setItem("newExpDate", "");
  }


  drawTable(getNew(), "True")
  drawTable(getPre())

  merge_table()

  // mytable = document.getElementById("tableId");
  // //insert a row at very end
  // var namelist = localStorage.getItem("name").split(';');
  // var datelist = localStorage.getItem("expirydate").split(';');

  // var i;
  // for(i = 0; i < namelist.length - 1; i++){
  //   newRow = mytable.insertRow(mytable.getElementsByTagName("tr").length);
  //   cellA = newRow.insertCell(0);
  //   cellB = newRow.insertCell(1);
  //   cellC = newRow.insertCell(2);

  //   cellA.innerHTML = namelist[i];
  //   cellB.innerHTML = datelist[i];
  //   cellC.innerHTML = "Delete";
  // }
    // localStorage.setItem("status", "F");

  //}

}
});

function getNew(){
  return [localStorage.getItem("newName").split(';'), localStorage.getItem("newPurchDate").split(';')];
}

function getPre(){
  return [localStorage.getItem("name").split(';'), localStorage.getItem("purchasedate").split(';')];
}

function merge_table(){
  localStorage.setItem("name",localStorage.getItem("newName") + localStorage.getItem("name") );
  localStorage.setItem("purchasedate", localStorage.getItem("newPurchDate") + localStorage.getItem("purchasedate"));
  localStorage.setItem("expirydate", localStorage.getItem("newExpDate") + localStorage.getItem("expirydate"));
  localStorage.setItem("newName", "");
  localStorage.setItem("newPurchDate", "");
  localStorage.setItem("newExpDate", "");
}

function drawTable(display, newAdded = "False"){
  mytable = document.getElementById("tableId");
  //insert a row at very end
  var namelist = display[0];
  var datelist = display[1];

  var i;
  for(i = 0; i < namelist.length - 1; i++){
    newRow = mytable.insertRow(mytable.getElementsByTagName("tr").length);
    cellA = newRow.insertCell(0);
    cellB = newRow.insertCell(1);
    cellC = newRow.insertCell(2);

    cellA.innerHTML = namelist[i];
    cellB.innerHTML = datelist[i];
    cellC.innerHTML = "<span id=\"delete_trash\" onclick = \"deleteFunc(this)\"><img height=\"15\" width=\"15\" src=\"images/trash.png\" /></span>";
  }
}

function deleteFunc(btn){
    var row = btn.parentNode.parentNode;
    rowI = row.rowIndex - 1;
    row.parentNode.removeChild(row);

    var namelist = localStorage.getItem("name").split(';');
    var datelist = localStorage.getItem("expirydate").split(';');

    namestr = arr2str(namelist);
    datestr = arr2str(datelist);
    localStorage.setItem("name", namestr);
    localStorage.setItem("expirydate", datestr);

}

function arr2str(list){
  var result = "";
  for (let index = 0; index < list.length; index++) {
    if(index != rowI){
      result += (list[index] + ";");
    }
  }
  return result;
}


function clearTable(){
  mytable = document.getElementById("tableId");
  var i;
  for(i = mytable.rows.length - 1; i > 0 ; i--){
    mytable.deleteRow(i);
  }
}

function readdate() {
  var purchasedate = document.getElementById("foodinputpurchasedate").value;
  var expirydate = document.getElementById("foodinputexpirydate").value;
  var name = document.getElementById("foodinputname").value;

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

  localStorage.setItem("newPurchDate", purchasedate + ";")
  localStorage.setItem("newExpDate",expirydate + ";")
  localStorage.setItem("newName", name + ";")

  // localStorage.setItem("purchasedate",purchasedate + ";" + localStorage.getItem("purchasedate") );//svae to localStorage
  // localStorage.setItem("expirydate", expirydate + ";" + localStorage.getItem("expirydate")  );
  // localStorage.setItem("name", name + ";" + localStorage.getItem("name") );

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
// This function will return two array, the first one is the searching result food's name
// the other one is its expiry date
function searchItem(){
  // get the searchingInformation first
  target = document.getElementById("Target").value;
  database = localStorage.getItem("name");
  var index = database.search(target);
  if (index == -1) {
    alert("Don't find this item!");
  }else{
    var namelist = localStorage.getItem("name").split(';');
    var datelist = localStorage.getItem("expirydate").split(';');

    dplyExpDate = [];
    dplyPurDate = [];
    dplyfood = [];
    for (let i = 0; i < namelist.length; i++) {
      subString = namelist[i];
      if(subString.search(target) != -1){
        dplyfood.push(subString);
        dplyExpDate.push(datelist[i]);
      }
      //var array_test = dplyfood.join();
      //var array_test2 = dplyExpDate.join();
    }
    // return [dplyfood,dplyExpDate];
    dplyfood.push("")
    dplyExpDate.push("")
    clearTable();
    drawTable([dplyfood,dplyExpDate]);
    $('.search-clear').show();
  }
}

function clearSearch(){
  // get the searchingInformation first
  target = document.getElementById("Target").value;
  database = localStorage.getItem("name");
  


  var namelist = localStorage.getItem("name").split(';');
  var datelist = localStorage.getItem("expirydate").split(';');

    dplyExpDate = [];
    dplyPurDate = [];
    dplyfood = [];
    for (let i = 0; i < namelist.length; i++) {
      subString = namelist[i];

        dplyfood.push(subString);
        dplyExpDate.push(datelist[i]);
      //var array_test = dplyfood.join();
      //var array_test2 = dplyExpDate.join();
    }
    // return [dplyfood,dplyExpDate];
    dplyfood.push("")
    dplyExpDate.push("")
    clearTable();
    drawTable([dplyfood,dplyExpDate]);
  }