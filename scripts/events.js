// event listeners that remove the warning messages on successful valiate input

function handleRadioClick() {
	if (document.querySelector("#otherMeal").checked) {
		meal.style.display = "block";
	} else {
		meal.style.display = "none";
	}
}

const radioButtons = document.querySelectorAll('input[name="meal"]');
radioButtons.forEach((radio) => {
	radio.addEventListener("click", handleRadioClick);
});

document.querySelector("#fName").addEventListener("blur", function () {
	if (this.value !== "") {
		document.querySelector("#nameWarning").textContent = "";
	}
});

document.querySelector("#guest").addEventListener("blur", function () {
	if (Number(form.guest.value) >= 1 || Number(form.guest.value) <= 10) {
		document.querySelector("#guestWarning").textContent = "";
	}
});

document
	.querySelector("#reservationTime")
	.addEventListener("blur", function () {
		if (this.value !== "") {
			document.querySelector("#dateWarning").textContent = "";
		}
	});

document.querySelector("#describeOther").addEventListener("blur", function () {
	if (this.value !== "") {
		document.querySelector("#mealWarning").textContent = "";
	}
});

document.querySelector("#phone").addEventListener("blur", function () {
	if (this.value && this.value.match(/\d/g).length === 10) {
		document.querySelector("#phoneWarning").textContent = "";
	}
});

document.querySelector("#email").addEventListener("blur", function () {
	if (
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value) ||
		form.email.value == ""
	) {
		document.querySelector("#emailWarning").textContent = "";
	}
});

document.querySelector("#reservation").addEventListener("click", function () {
	if (form.reservation.options.selectedIndex !== -1) {
		document.querySelector("#reservationWarning").textContent = "";
	}
});

// document.querySelector("#reservation").addEventListener("click", function () {
// 	if (form.reservation.options.value == other) {
// 		document.querySelector("#reservationWarning").textContent = "";
// 	}
// });

document.form.addEventListener("submit", validateForm);
