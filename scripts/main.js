// selecting the.add cart button in the main homepage
let carts = document.querySelectorAll(".add-cart");

// Create Class which is the coffee products, list name, price and if the product is in the shopping cart
class coffeeProduct {
	constructor(name, price, id, inCart) {
		this.name = name;
		this.price = price;
		this.id = id;
		this.inCart = inCart;
	}
}

// Creating objects using coffeeProduct class
let lightRoast = new coffeeProduct("Light Roast", 20, "lightroast", 0);
let mediumRoast = new coffeeProduct("Medium Roast", 18, "mediumroast", 0);
let darkRoast = new coffeeProduct("Dark Roast", 17, "darkroast", 0);

// Products array to loop over coffeeProducts
let products = [];

products[0] = lightRoast;
products[1] = mediumRoast;
products[2] = darkRoast;

// for loop that is run onclick add item on cart and increases totalcost, checks how many "objects"
for (let i = 0; i < carts.length; i++) {
	carts[i].addEventListener("click", () => {
		cartNumbers(products[i], "add");
		totalCost(products[i], "add");
	});
}
// initializing the array for storing items in cart, if there is no products in the cart, create new array
if (!sessionStorage.getItem("productsInCart")) {
	sessionStorage.setItem("productsInCart", "[]");
}

// When loading the page, cart numbers reflect what is in the local storage
function onLoadCartNumbers() {
	let productNumbers = sessionStorage.getItem("cartNumbers");
	if (productNumbers) {
		document.querySelector(".cart span").textContent = productNumbers;
	}
}

// Adds to local storage, adds to cart button value, gets number from local storage as str then converts to a number
function cartNumbers(product, action) {
	let productNumbers = sessionStorage.getItem("cartNumbers");
	// check local storage, if cleared, returns to NaN to not update cart
	// Converts productnumbers from str to int because you can't add str
	productNumbers = parseInt(productNumbers);
	if (productNumbers) {
		// if 1 exists, and clicked again, updates cart to reflect how much items in cart
		if (action === "add") {
			sessionStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector(".cart span").textContent = productNumbers + 1;
		} else if (action === "remove") {
			sessionStorage.setItem("cartNumbers", productNumbers - 1);
			document.querySelector(".cart span").textContent = productNumbers - 1;
		}
	} else {
		sessionStorage.setItem("cartNumbers", 1);
		// if 1 exists, do nothing and show it has 1 value in cart
		document.querySelector(".cart span").textContent = 1;
	}
	setItems(product);
}
// function to store objects in session storage, makes object into JSON format
function setItems(product) {
	// need to check if my product is already in the storage so it doesn't overwrite existing items
	let cartItems = sessionStorage.getItem("productsInCart");
	// lets the cartItems back to javascript objects
	cartItems = JSON.parse(cartItems);
	// If there are no cart items of the same type add +1, uses the some function if the itemid is in cart if true then add if not minus
	if (cartItems.length !== 0) {
		const isItemInCart = cartItems.some(
			(item) => Object.values(item)[0].id === product.id
		);
		if (isItemInCart) {
			const index = cartItems.findIndex(
				(item) => Object.values(item)[0].id === product.id
			);
			cartItems[index] = {
				[product.id]: {
					...cartItems[index][product.id],
					inCart: (cartItems[index][product.id].inCart += 1),
				},
			};
		} else {
			// use spread operator to just capture inCart and ignore all the other values
			cartItems = [
				...cartItems,
				{
					[product.id]: { ...product, inCart: 1 },
				},
			];
		}
	} else {
		// if add to cart for the first time, set the inCart value to just 1
		cartItems = [
			{
				[product.id]: { ...product, inCart: 1 },
			},
		];
	}
	// uses JSON stringify to make object into JSON format so sessionstorage can read it instead of object object
	sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
// pass the object into the totalCost function to get price and update the total sum accoridingly
function totalCost(product, action) {
	// console.log("The product price is", product.price);
	let cartCost = sessionStorage.getItem("totalCost");

	if (cartCost != null) {
		// maybe change to parse float? converts cartCost to a number since I need to add sum
		cartCost = parseInt(cartCost);
		if (action === "add") {
			sessionStorage.setItem("totalCost", cartCost + product.price);
		} else if (action === "remove") {
			sessionStorage.setItem("totalCost", cartCost - product.price);
		}
	} else {
		sessionStorage.setItem("totalCost", product.price);
	}
}
// pass in the action which is a string to either add or remove the item by itemId
function changeItemCount(itemId, action) {
	let cartItems = sessionStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	// need to find the index of the array and returns the array
	const index = cartItems.findIndex(
		(item) => Object.values(item)[0].id === itemId
	);
	// returns the actual object using the item
	const item = cartItems.find((item) => Object.values(item)[0].id === itemId)[
		itemId
	];
	// removes the item using the index and itemId and updates cartItems and quantity (inCart)
	if (action === "remove") {
		if (cartItems[index][itemId].inCart > 1) {
			cartItems[index] = {
				[itemId]: {
					...cartItems[index][itemId],
					inCart: (cartItems[index][itemId].inCart -= 1),
				},
			};
		} else if (cartItems[index][itemId].inCart === 1) {
			// uses filter to filter out the object from the array, to create a new array based on removing
			cartItems = cartItems.filter(
				(item) => Object.values(item)[0].id !== itemId
			);
		}
		// update the total cost and visual cart to remove -1
		totalCost(item, "remove");
		cartNumbers(item, "remove");
	} else if (action === "add") {
		// else if add is pressed adds, item.
		cartItems[index] = {
			[itemId]: {
				...cartItems[index][itemId],
				inCart: (cartItems[index][itemId].inCart += 1),
			},
		};
		// update the total cost and visual cart to add +1
		totalCost(item, "add");
		cartNumbers(item, "add");
	}
	// stores the products in cart in localstorage using JSON
	sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));

	displayCart();
}

// function that displays summary
function displayCart() {
	// Getting JSON data and transforming to display in DOM
	const custData = JSON.parse(sessionStorage.getItem("customerData"));
	const custDataEl = document.querySelector("#customerData");
	// Loop over customer data item and form data entries using destructuring (I just the values so values, then creating a li using a for loop
	for (const [, val] of Object.entries(custData)) {
		if (val) {
			let createList = document.createElement("li");
			createList.textContent = val;
			custDataEl.appendChild(createList);
		}
	}

	let cartItems = sessionStorage.getItem("productsInCart");
	// need to parse back JSON files to objects so we can display in DOM
	cartItems = JSON.parse(cartItems);
	// Target the products div so we can create a new div, see below
	let productContainer = document.querySelector(".products");
	// Display total cost
	let cartCost = sessionStorage.getItem("totalCost");
	// If these two things are running in the localstorage
	if (cartItems && productContainer) {
		// need to change innerHTML
		productContainer.innerHTML = "";
		// loop over objects using map
		cartItems.map((item) => {
			item = Object.values(item)[0];
			// use template literal to create divs thats show the item and price, finds the object using ${expression}
			productContainer.innerHTML += `
            <div class="product">
				<div class="product-name">
					<img src="./images/${item.id}.png">
					<span>${item.name}</span>
				</div>
                <div class="price">${item.price}</div>
				<div class="quantity">
					<button class="remove-item" onclick="changeItemCount('${item.id}', 'remove')">
						<ion-icon name="remove-circle-outline"></ion-icon>
					</button>
						<span>${item.inCart}</span>
					<button class="add-item" onclick="changeItemCount('${item.id}', 'add')">
						<ion-icon name="add-circle-outline"></ion-icon>
					</button>
				</div>   
				<div class="total">
					$${item.inCart * item.price}
				</div>     
            </div>
                `;
		});
		// Creates the total cost and show it
		productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}
                </h4>
            
        `;
	}
}

// Calls the function
onLoadCartNumbers();
displayCart();
