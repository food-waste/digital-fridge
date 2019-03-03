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
										cell.classList.add("cal-red");
										let food_item = document.createElement("li");
										let popup_item = document.createElement("p");
										let fd = document.createTextNode(food_arr[d]);
										let pui = document.createTextNode(food_arr[d]);
										food_item.appendChild(fd);
										popup_item.appendChild(pui);
										food_item.classList.add("food_item");
										cell.appendChild(food_item);
										calPopUp.appendChild(popup_item);
	                }
								}
								if (food_count > 0) {
									let foodCount = document.createElement("p");
									let ct = document.createTextNode(food_count);
									foodCount.appendChild(ct);
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
	$('#calendar-body td').click(function() {
		$('.cal-modal').show();
	})
})
