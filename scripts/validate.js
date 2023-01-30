//validate the profile
function validateForm(e) {
	e.preventDefault();

	var valid = true;
	// targets the form data using the FormData API
	const data = new FormData(e.target);
	// using the fromEntries function to retrieve all values from the form
	const value = Object.fromEntries(data.entries());
	localStorage.setItem("customerData", JSON.stringify(value));

	if (form.fName.value === "") {
		document.querySelector("#nameWarning").textContent =
			"*Please enter a name*";
		valid = false;
	}

	if (
		form.guest.value == "" ||
		Number(form.guest.value) < 1 ||
		Number(form.guest.value) > 10
	) {
		document.querySelector("#guestWarning").textContent =
			"*Please ensure you have a minimum of 1 to 10 persons*";
		valid = false;
	}

	if (
		form.describeOther.value == "" &&
		document.querySelector("#otherMeal").checked
	) {
		document.querySelector("#mealWarning").textContent = "*Please describe*";
		valid = false;
	}

	if (/^\d{10}$/.test(form.phone.value) == false) {
		document.querySelector("#phoneWarning").textContent =
			"*Please input a 10-digit phone number*";
	}

	if (form.phone.value == "") {
		document.querySelector("#phoneWarning").textContent =
			"*Please enter phone number*";
	}

	if (
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value) ==
			false &&
		form.email.value !== ""
	) {
		document.querySelector("#emailWarning").textContent =
			"*Please input a proper email address*";
		valid = false;
	}

	if (form.reservation.options.selectedIndex == "") {
		document.querySelector("#reservationWarning").textContent =
			"*Please enter a Reservation Type*";
		valid = false;
	}

	if (form.reservationTime.value == "") {
		document.querySelector("#dateWarning").textContent =
			"*Please enter a date*";
		valid = false;
	}

	// display alert to know if form is validated
	if (valid) {
		alert("Form is validated");
	}

	return valid;
}

function resetProfile() {
	if (form.fName.value === "") {
		document.querySelector("#nameWarning").textContent = "";
	}

	if (form.guest.value == "") {
		document.querySelector("#guestWarning").textContent = "";
	}

	if (form.describeOther.value == "") {
		document.querySelector("#mealWarning").textContent = "";
	}

	if (form.phone.value == "") {
		document.querySelector("#phoneWarning").textContent = "";
	}

	if (form.email.value == "") {
		document.querySelector("#emailWarning").textContent = "";
	}

	if (form.reservation.options.selectedIndex == "") {
		document.querySelector("#reservationWarning").textContent = "";
	}

	if (form.reservationTime.value == "") {
		document.querySelector("#dateWarning").textContent = "";
	}

	// Clears the localstorage when reset is pressed, clearing the local storage but recreating the array
	localStorage.clear();
	document.querySelector(".cart span").textContent = "";
	localStorage.setItem("productsInCart", "[]");
}

function test(e) {
	const currentDate = new Date().getDate();
	const dateSelected = new Date(e.target.value).getDate();
	if (dateSelected < currentDate) {
		document.querySelector("#dateWarning").textContent =
			"*Please enter a date after your current day*";
		return false;
	} else {
		document.querySelector("#dateWarning").textContent = "";
	}
	console.log(currentDate, dateSelected);
}
