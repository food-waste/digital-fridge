let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");

$(function() {
	showCalendar(currentMonth, currentYear);
});


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
		$('.cal-modal').hide();
		$('#modals').html('');
    showCalendar(currentMonth, currentYear);
		dateClick();
		closeX();
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
		$('.cal-modal').hide();
		$('#modals').html('');
    showCalendar(currentMonth, currentYear);
		dateClick();
		closeX();
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    $('#monthAndYear').html(months[month] + " " + year);
    $('#year').val(year);
    $('#month').val(month);

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
								var food_count = 0;
								var calPopUp = document.createElement("div");
								var close = document.createElement("p");
								close.innerHTML = "&#10005;";
								close.classList.add("close_button");
								var date_title = document.createElement("h2");
								date_title.classList.add("date_title");
								date_title.innerHTML = months[month] + " " + date + ", " + year;
								calPopUp.appendChild(close);
								calPopUp.appendChild(date_title);
								calPopUp.classList.add("cal-modal");
								calPopUp.classList.add("modal_" + date);
                let cell = document.createElement("td");
								cell.classList.add("date_" + date);
                let cellText = document.createElement("p");
								let txt = document.createTextNode(date);
								cellText.appendChild(txt);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("cal-today");
                } // color today's date
								cell.appendChild(cellText);
								var exp_arr = localStorage.getItem("expirydate").split(";");
								var purch_arr = localStorage.getItem("purchasedate").split(";");
								var food_arr = localStorage.getItem("name").split(";");
								for (var d = 0; d < exp_arr.length - 1; d++) {
									if (date === parseInt(exp_arr[d].substring(8, 10), 10) && year === parseInt(exp_arr[d].substring(0, 4), 10) && month + 1 === parseInt(exp_arr[d].substring(5, 7), 10)) {
										food_count++;
										let popup_item = document.createElement("div");
										let popup_food = document.createElement("p");
										let pui = document.createTextNode(food_arr[d]);
										popup_food.appendChild(pui);
										popup_food.classList.add('popup_food');
										let popup_date = document.createElement("p");
										let pud = document.createTextNode("Purchased: " +purch_arr[d]);
										popup_date.appendChild(pud);
										popup_date.classList.add('popup_date');
										popup_item.appendChild(popup_food);
										popup_item.appendChild(popup_date);
										calPopUp.appendChild(popup_item);
	                }
								}
								if (food_count > 0) {
									switch(food_count) {
										case 1:
											cell.classList.add('cal-one');
											break;
										case 2:
											cell.classList.add('cal-two');
											break;
										case 3:
											cell.classList.add('cal-three');
											break;
										case 4:
											cell.classList.add('cal-four');
											break;
										default:
											cell.classList.add('cal-fiveplus');
											break;
									}
									if (date < today.getDate() && year == today.getFullYear() && month == today.getMonth()
											|| year < today.getFullYear() || month < today.getMonth() && year == today.getFullYear()) {
	                    cell.classList.add("cal-exp");
	                }
									let foodCount = document.createElement("p");
									let ct = document.createTextNode(food_count);
									foodCount.appendChild(ct);
									foodCount.classList.add('food_count');
									cell.appendChild(foodCount);
									$('#modals').append(calPopUp);
								}
								row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

$(function() {
	dateClick();
	closeX();
});

function dateClick() {
	$('.date_1').click(function() {
		$('.cal-modal').hide();
		$('.modal_1').show();
	});
	$('.date_2').click(function() {
		$('.cal-modal').hide();
		$('.modal_2').show();
	});
	$('.date_3').click(function() {
		$('.cal-modal').hide();
		$('.modal_3').show();
	});
	$('.date_4').click(function() {
		$('.cal-modal').hide();
		$('.modal_4').show();
	});
	$('.date_5').click(function() {
		$('.cal-modal').hide();
		$('.modal_5').show();
	});
	$('.date_6').click(function() {
		$('.cal-modal').hide();
		$('.modal_6').show();
	});
	$('.date_7').click(function() {
		$('.cal-modal').hide();
		$('.modal_7').show();
	});
	$('.date_8').click(function() {
		$('.cal-modal').hide();
		$('.modal_8').show();
	});
	$('.date_9').click(function() {
		$('.cal-modal').hide();
		$('.modal_9').show();
	});
	$('.date_10').click(function() {
		$('.cal-modal').hide();
		$('.modal_10').show();
	});
	$('.date_11').click(function() {
		$('.cal-modal').hide();
		$('.modal_11').show();
	});
	$('.date_12').click(function() {
		$('.cal-modal').hide();
		$('.modal_12').show();
	});
	$('.date_13').click(function() {
		$('.cal-modal').hide();
		$('.modal_13').show();
	});
	$('.date_14').click(function() {
		$('.cal-modal').hide();
		$('.modal_14').show();
	});
	$('.date_15').click(function() {
		$('.cal-modal').hide();
		$('.modal_15').show();
	});
	$('.date_16').click(function() {
		$('.cal-modal').hide();
		$('.modal_16').show();
	});
	$('.date_17').click(function() {
		$('.cal-modal').hide();
		$('.modal_17').show();
	});
	$('.date_18').click(function() {
		$('.cal-modal').hide();
		$('.modal_18').show();
	});
	$('.date_19').click(function() {
		$('.cal-modal').hide();
		$('.modal_19').show();
	});
	$('.date_20').click(function() {
		$('.cal-modal').hide();
		$('.modal_20').show();
	});
	$('.date_21').click(function() {
		$('.cal-modal').hide();
		$('.modal_21').show();
	});
	$('.date_22').click(function() {
		$('.cal-modal').hide();
		$('.modal_22').show();
	});
	$('.date_23').click(function() {
		$('.cal-modal').hide();
		$('.modal_23').show();
	});
	$('.date_24').click(function() {
		$('.cal-modal').hide();
		$('.modal_24').show();
	});
	$('.date_25').click(function() {
		$('.cal-modal').hide();
		$('.modal_25').show();
	});
	$('.date_26').click(function() {
		$('.cal-modal').hide();
		$('.modal_26').show();
	});
	$('.date_27').click(function() {
		$('.cal-modal').hide();
		$('.modal_27').show();
	});
	$('.date_28').click(function() {
		$('.cal-modal').hide();
		$('.modal_28').show();
	});
	$('.date_29').click(function() {
		$('.cal-modal').hide();
		$('.modal_29').show();
	});
	$('.date_30').click(function() {
		$('.cal-modal').hide();
		$('.modal_30').show();
	});
	$('.date_31').click(function() {
		$('.cal-modal').hide();
		$('.modal_31').show();
	});
}

function closeX () {
	$('.close_button').click(function() {
		$('.cal-modal').hide();
	});
}
