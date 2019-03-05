var page = localStorage.getItem('page');
// localStorage.setItem("")

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
    }
    if ($('#login_password').val() == "") {
      $('.nopwd').show();
    }
    if($('#login_password').val() != "" && $('#login_username').val() != ""){
      localStorage.setItem('login', 'true');
      window.location.href = 'kitchen.html';
      return false;
    }
    return false;
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

  
  drawTable(getNew(), newAdded="True");
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
      // cellA.style.backgroundColor = "FFFF66";
      // cellB.style.backgroundColor = "FFFF66";
      // cellC.style.backgroundColor = "FFFF66";
      newRow.style.backgroundColor = "FFFF66";
    }

    cellA.innerHTML = namelist[i];
    cellB.innerHTML = datelist[i];
    expHighlight(datelist[i],newRow);
    if(tableId == "tableId"){       //the delete function for confirmation page doesn't work yet.
      //cellC.innerHTML = "<button onclick = \"deleteFunc(this)\">Delete</button>";
      cellC.innerHTML = "<span id=\"delete_trash\" onclick = \"deleteFunc(this)\"><img height=\"15\" width=\"15\" src=\"images/trash.png\" /></span>"
      + "<span class=\"edit\" onclick = \"editFunc(this)\"><img height=\"15\" width=\"15\" src=\"images/edit.png\" /></span>";
      //tingying: add new button----eidt.
    }else{
      cellC.innerHTML = "Delete";
    }

  }
}


function expHighlight(expDatestr, curRow){
  var expSplitted = expDatestr.split('-');
  var expDate = new Date(parseInt(expSplitted[0]), parseInt(expSplitted[1]) - 1,parseInt(expSplitted[2]));
  var today = new Date();
  difference = (expDate - today)/(1000*60*60*24);  //difference comes in milliseconds one day has 24*60*60*1000 ms
  if(difference < 0){             //highlight if food goes expire
    curRow.style.backgroundColor = "red";
    curRow.style.color = "white";
  }

}
function deleteFunc(btn){
    var row = btn.parentNode.parentNode;
    var nameToDelete = row.firstElementChild.innerText;
    rowI = row.rowIndex - 1;
    row.parentNode.removeChild(row);

    deleteInDataBase(nameToDelete);
    // var namelist = localStorage.getItem("name").split(';');
    // var datelist = localStorage.getItem("expirydate").split(';');
    

    // namestr = arr2str(namelist);
    // datestr = arr2str(datelist);
    // localStorage.setItem("name", namestr);
    // localStorage.setItem("expirydate", datestr);
    
}
//local store
function editFunc(btn){
  style="display: none;"
  document.getElementById("editPage").style.display="block";//show
  var row = btn.parentNode.parentNode;
  var name = row.children[0].innerHTML;
  var expiry;
  var purchase;

  var namelist = localStorage.getItem("name").split(';');
  var expirydatelist = localStorage.getItem("expirydate").split(';');
  var purchasedatelist = localStorage.getItem("purchasedate").split(';');

  for (let i = 0; i < namelist.length; i++){
    if(namelist[i] == name){
      expiry = expirydatelist[i];
      purchase = purchasedatelist[i];
    }
  }

  document.getElementById("foodeditname").value = name;
  document.getElementById("foodeditpurchasedate").value = purchase;
  document.getElementById("foodeditexpirydate").value = expiry;

  //insert what to delete to the database
  localStorage.setItem("whattoedit", row.children[0].innerHTML);
}

function edit_back(){
  document.getElementById("editPage").style.display="none";//hide
}

//tingying: edit food item function
function edit_confirmation(){
  
  var purchasedate = document.getElementById("foodeditpurchasedate").value;
  var expirydate = document.getElementById("foodeditexpirydate").value;
  var name = document.getElementById("foodeditname").value;

  var namelist = localStorage.getItem("name").split(';');
  var expirydatelist = localStorage.getItem("expirydate").split(';');
  var purchasedatelist = localStorage.getItem("purchasedate").split(';');

  var oldname = localStorage.getItem("whattoedit");
  for (let i = 0; i < namelist.length-1; i++){
    //same name as other food
    if(namelist[i] == name && name != oldname){
      alert("Name is same as something else!");
      return;
    }
  }
  
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
     document.getElementById("editPage").style.display="none";//hide
     window.location.assign('kitchen.html');
  }
  var newPurchDate = "";
  var newExpDate = "";
  var newName = "";
  for(let i=0; i<namelist.length-1; i++){
    //find the old name and change it to new
    if(namelist[i] == oldname){
      namelist[i] = name;
      expirydatelist[i] = expirydate;
      purchasedatelist[i] = purchasedate;
    }
    newPurchDate = newPurchDate.concat(purchasedatelist[i], ";");
    newExpDate = newExpDate.concat(expirydatelist[i], ";");
    newName = newName.concat(namelist[i], ";");
  }
  localStorage.setItem("name",newName);
  localStorage.setItem("expirydate", newExpDate);
  localStorage.setItem("purchasedate", newPurchDate)
  /*
  localStorage.setItem("newPurchDate", purchasedate + ";")
  localStorage.setItem("newExpDate",expirydate + ";")
  localStorage.setItem("newName", name + ";")
  */
}
/*
delete the entry by foodname in database
*/
function deleteInDataBase(nameToDelete){
  var namelist = localStorage.getItem("name").split(';');
  var expirelist = localStorage.getItem("expirydate").split(';');
  var purchlist = localStorage.getItem("purchasedate").split(';');

  procesedNameStr = ""
  procesedExpDStr = ""
  procesedPurDStr = ""

  var i;
  for(i = 0; i <namelist.length - 1; i++){
    if(namelist[i] != nameToDelete){
      procesedNameStr += namelist[i] + ';';
      procesedExpDStr += expirelist[i] + ';';
      procesedPurDStr += purchlist[i] + ';';
    }
  }

  localStorage.setItem("name", procesedNameStr);
  localStorage.setItem("expirydate", procesedExpDStr);
  localStorage.setItem("purchasedate", procesedPurDStr);  
}

// function arr2str(list){
//   var result = "";
//   for (let index = 0; index < list.length ; index++) { 
//     if(index != rowI && list[index] != ""){
//       result += (list[index] + ";");
//     }
//   }
//   return result;
// }

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

  database = localStorage.getItem("name");
  var index = database.search(name);
  if (index != -1) {
    confirm("Same item already in kitchen!");
    return;
  }
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
/*
//tingying: when click edit, edit page shows.
$(function(){
  $('.edit').click(function(){
    $('#editPage').show();
})});
*/
$(function(){
  $('#back-button').click(function(){
    $('#inputPage').hide();
})});
/*
$(function(){
  $('#back-button-edit').click(function(){
    $('#editPage').hide();
})});
*/
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
    
    database = localStorage.getItem("name");
    scanNamelist = localStorage.getItem("newName").split(';');
    var repeatName = "";
    var lastRepeat = "";
    var repeatCnt = 0;
    for(var i = 0; i < scanNamelist.length - 1; i++){
      if(database.search(scanNamelist[i]) != -1){
        if(repeatCnt != 0){
          repeatName += ", "
        }
        repeatName += scanNamelist[i];
        lastRepeat = scanNamelist[i];
        repeatCnt++;
      }
    }

    if (repeatCnt != 0) {
      if(repeatCnt == 1){   //mulitple items repeated
        alert(repeatName + " is already in kitchen");
      }else{
        var lastRepeatIndex = repeatName.search(lastRepeat); 
        repeatName = repeatName.substring(0,lastRepeatIndex) + "and " + repeatName.substring(lastRepeatIndex);
        alert(repeatName + " are already in kitchen");
      }
      return;
    }

    if(confirm("-----Confirm the Input?----- ")){
      // alert("Successfully Added");
    }

    $('#confirmPage').hide();
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
  //target = document.getElementById("Target").value;
  //database = localStorage.getItem("name");



  //var namelist = localStorage.getItem("name").split(';');
  //var datelist = localStorage.getItem("expirydate").split(';');

    // dplyExpDate = [];
    // dplyPurDate = [];
    // dplyfood = [];
    // for (let i = 0; i < namelist.length; i++) {
    //   subString = namelist[i];

    //     dplyfood.push(subString);
    //     dplyExpDate.push(datelist[i]);
    //   //var array_test = dplyfood.join();
    //   //var array_test2 = dplyExpDate.join();
    // }
    // // return [dplyfood,dplyExpDate];
    // dplyfood.push("")
    // dplyExpDate.push("")

    //clearTable();
    //drawTable([namelist,datelist]);
    $('.search-clear').hide();
    $('#Target').val('');

var target = document.getElementById("Target");
target.value = "";
RT_Search()


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
      //if (switchcount == 0 && dir == "asc") {
      // dir = "desc";
      //  switching = true;
      //}
    }
  }

  // ************* change the background color of the category
  var food_sort = document.getElementById("food-sort");
  var date_sort = document.getElementById("date-sort");
  if(n==0){
  // change the food's name background
    food_sort.style.backgroundColor = "#888";
    food_sort.style.color = "white";
    date_sort.style.backgroundColor = "white";
    date_sort.style.color = "black";

  }
  else if(n==1){
    food_sort.style.backgroundColor = "white";
    food_sort.style.color = "black";
    date_sort.style.backgroundColor = "#888";
    date_sort.style.color = "white";
  }

}

// ********************************************
// Real Time Search(RT_Search) Function
// *********************************************
function RT_Search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Target");

  filter = input.value.toUpperCase();
  table = document.getElementById("tableId");
  tr = table.getElementsByTagName("tr");
  

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
  if(filter != ""){
  $('.search-clear').show();
  }
  else{
    $('.search-clear').hide();
  }
}



//************************************* */
// For Account Page Open and Close
//********************************* */
function openNav() {
  document.getElementById("Account_Page").style.width = "25%";
}

function closeNav() {
  document.getElementById("Account_Page").style.width = "0%";
}