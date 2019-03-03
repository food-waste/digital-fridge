var page = localStorage.getItem('page');

$(function(){
  if (localStorage.getItem('login') == 'false') {
    $('nav h1').html(localStorage.getItem('first_name') + '\'s Kitchen');
  } else {
    $('nav h1').html('Your Kitchen');
  }
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


var initFood = "beef;yogurt;chicken;lettuce;eggplant;cereal;bread;milk;strawberry;pizza;";
var initPurDate = "2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;2019-02-19;";
var initExpDate = "2019-03-19;2019-02-28;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-03-19;2019-02-24;";
$(document).ready(function(){
  init();
});

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

  
  drawTable(getNew(), "True");
  drawTable(getPre());

  merge_table();
}

function getNew(){
  return [localStorage.getItem("newName").split(';'), localStorage.getItem("newExpDate").split(';')];
}

function getPre(){
  return [localStorage.getItem("name").split(';'), localStorage.getItem("expirydate").split(';')];
}

function merge_table(){
  localStorage.setItem("name",localStorage.getItem("newName") + localStorage.getItem("name") );
  localStorage.setItem("purchasedate", localStorage.getItem("newPurchDate") + localStorage.getItem("purchasedate"));
  localStorage.setItem("expirydate", localStorage.getItem("newExpDate") + localStorage.getItem("expirydate"));
  localStorage.setItem("newName", "");
  localStorage.setItem("newPurchDate", "");
  localStorage.setItem("newExpDate", "");
}

function drawTable(display, newAdded = "False", tableId = "tableId"){
  mytable = document.getElementById(tableId);
  //insert a row at very end
  var namelist = display[0];
  var datelist = display[1];

  var i;
  for(i = 0; i < namelist.length - 1; i++){
    newRow = mytable.insertRow(mytable.getElementsByTagName("tr").length);
    cellA = newRow.insertCell(0);
    cellB = newRow.insertCell(1);
    cellC = newRow.insertCell(2);
    if(newAdded != "False"){
      cellA.style.backgroundColor = "FFFF66";
      cellB.style.backgroundColor = "FFFF66";
      cellC.style.backgroundColor = "FFFF66";
    }
    cellA.innerHTML = namelist[i];
    cellB.innerHTML = datelist[i];
    if(tableId == "tableId"){       //the delete function for confirmation page doesn't work yet.
      //cellC.innerHTML = "<button onclick = \"deleteFunc(this)\">Delete</button>";
      cellC.innerHTML = "<span id=\"delete_trash\" onclick = \"deleteFunc(this)\"><img height=\"15\" width=\"15\" src=\"images/trash.png\" /></span>";
    }else{
      cellC.innerHTML = "Delete";
    }
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
  for (let index = 0; index < list.length ; index++) { 
    if(index != rowI && list[index] != ""){
      result += (list[index] + ";");
    }
  }
  return result;
}

//default to clear the table in main kitchen.html
//can be used to clear other tables by passing the id of table 
//eg. clearTable(tableId = "confirm-table-Id");
function clearTable(tableId = "tableId"){
  mytable = document.getElementById(tableId);
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
     $('#inputPage').hide();
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
    $('#inputPage').show();
})});

$(function(){
  $('#back-button').click(function(){
    $('#inputPage').hide();
})});

var scanFoods = "orange;banana;apple;";
var scanPurchDate = "2019-02-27;2019-02-27;2019-02-27;";
var scanExpDate = "2019-03-04;2019-03-04;2019-03-04;";
$(function(){
  $('#scanButton').click(function(){
    // alert("hidden");
    $('#inputPage').hide();
    $('#confirmPage').show();
    localStorage.setItem("newName", scanFoods);
    localStorage.setItem("newPurchDate", scanExpDate);
    localStorage.setItem("newExpDate",scanPurchDate);
    confirmTable = document.getElementById("confirm-table-Id");
    drawTable([scanFoods.split(';'), scanExpDate.split(';')], newAdded = "False", tableId = "confirm-table-Id");
})});

$(function(){
  $('#confirm-back-button').click(function(){
    $('#confirmPage').hide();
    $('#inputPage').show();
    localStorage.setItem("newName", "");
    localStorage.setItem("newPurchDate", "");
    localStorage.setItem("newExpDate", "");
    clearTable(tableId = "confirm-table-Id");
})});

$(function(){
  $('#confirm-finish-button').click(function(){
    $('#confirmPage').hide();
    if(confirm("-----Confirm the Input?----- ")){
      // alert("Successfully Added");
    }
    clearTable(tableId = "confirm-table-Id");
    clearTable();
    init();
})});


function input_confirmation() {
  // pop-up as Confirmation Page
    if (confirm("-----Confirm the Input?----- ")) {
        // alert("Successfully Added");
        readdate();
        
    }
    else {   
    }
  
  }
// This function will return two array, the first one is the searching result food's name
// the other one is its expiry date
function searchItem(){
  // get the searchingInformation first
  target = document.getElementById("Target").value;

  if(target == ""){
    alert("please input the food name you want to search");
    return;
  }
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
      // debug for the space


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
    $('.search-clear').hide();
    $('#Target').val('');
}

// ********************************************
// Sortable Table Function for Kitchen Page
// *********************************************
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableId");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// ********************************************
// Real Time Search(RTS) Function
// *********************************************
