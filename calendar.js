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
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
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
								calPopUp.appendChild(close);
								calPopUp.classList.add("cal-modal");
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
								var food_arr = localStorage.getItem("name").split(";");
								for (var d = 0; d < exp_arr.length - 1; d++) {
									if (date === parseInt(exp_arr[d].substring(8, 10), 10) && year === parseInt(exp_arr[d].substring(0, 4), 10) && month + 1 === parseInt(exp_arr[d].substring(5, 7), 10)) {
										food_count++;
										let popup_item = document.createElement("p");
										let pui = document.createTextNode(food_arr[d]);
										popup_item.appendChild(pui);
										calPopUp.appendChild(popup_item);
	                }
								}
								if (food_count > 0) {
									if (food_count == 1) {
										cell.classList.add('cal-green');
									} else if (food_count <= 3) {
										cell.classList.add('cal-yellow');
									} else {
										cell.classList.add('cal-red');
									}
									let foodCount = document.createElement("p");
									let ct = document.createTextNode(food_count);
									foodCount.appendChild(ct);
									foodCount.classList.add('food_count');
									cell.appendChild(foodCount);
									cell.appendChild(calPopUp);
								}
								row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

$(function() {
	$('#calendar-body .date_1').click(function() {
		$('.date_1 .cal-modal').show();
	});
	$('#calendar-body .date_2').click(function() {
		$('.date_2 .cal-modal').show();
	});
	$('#calendar-body .date_3').click(function() {
		$('.date_3 .cal-modal').show();
	});
	$('#calendar-body .date_4').click(function() {
		$('.date_4 .cal-modal').show();
	});
	$('#calendar-body .date_5').click(function() {
		$('.date_5 .cal-modal').show();
	});
	$('#calendar-body .date_6').click(function() {
		$('.date_6 .cal-modal').show();
	});
	$('#calendar-body .date_7').click(function() {
		$('.date_7 .cal-modal').show();
	});
	$('#calendar-body .date_8').click(function() {
		$('.date_8 .cal-modal').show();
	});
	$('#calendar-body .date_9').click(function() {
		$('.date_9 .cal-modal').show();
	});
	$('#calendar-body .date_10').click(function() {
		$('.date_10 .cal-modal').show();
	});
	$('#calendar-body .date_11').click(function() {
		$('.date_11 .cal-modal').show();
	});
	$('#calendar-body .date_12').click(function() {
		$('.date_12 .cal-modal').show();
	});
	$('#calendar-body .date_13').click(function() {
		$('.date_13 .cal-modal').show();
	});
	$('#calendar-body .date_14').click(function() {
		$('.date_14 .cal-modal').show();
	});
	$('#calendar-body .date_15').click(function() {
		$('.date_15 .cal-modal').show();
	});
	$('#calendar-body .date_16').click(function() {
		$('.date_16 .cal-modal').show();
	});
	$('#calendar-body .date_17').click(function() {
		$('.date_17 .cal-modal').show();
	});
	$('#calendar-body .date_18').click(function() {
		$('.date_18 .cal-modal').show();
	});
	$('#calendar-body .date_19').click(function() {
		$('.date_19 .cal-modal').show();
	});
	$('#calendar-body .date_20').click(function() {
		$('.date_20 .cal-modal').show();
	});
	$('#calendar-body .date_21').click(function() {
		$('.date_21 .cal-modal').show();
	});
	$('#calendar-body .date_22').click(function() {
		$('.date_22 .cal-modal').show();
	});
	$('#calendar-body .date_23').click(function() {
		$('.date_23 .cal-modal').show();
	});
	$('#calendar-body .date_24').click(function() {
		$('.date_24 .cal-modal').show();
	});
	$('#calendar-body .date_25').click(function() {
		$('.date_25 .cal-modal').show();
	});
	$('#calendar-body .date_26').click(function() {
		$('.date_26 .cal-modal').show();
	});
	$('#calendar-body .date_27').click(function() {
		$('.date_27 .cal-modal').show();
	});
	$('#calendar-body .date_28').click(function() {
		$('.date_28 .cal-modal').show();
	});
	$('#calendar-body .date_29').click(function() {
		$('.date_29 .cal-modal').show();
	});
	$('#calendar-body .date_30').click(function() {
		$('.date_30 .cal-modal').show();
	});
	$('#calendar-body .date_31').click(function() {
		$('.date_31 .cal-modal').show();
	});
});

$(function() {
	$('.close_button').click(function() {
		$('.cal-modal').hide();
	});
});
