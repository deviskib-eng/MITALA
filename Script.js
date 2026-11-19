
// SHOPPING CART

let cart = JSON.parse(localStorage.getItem("ecofreshCart")) || [];

function saveCart() {
    localStorage.setItem("ecofreshCart", JSON.stringify(cart));
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        total += item.price;
        quantity++;

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent = item.name + " - UGX " + item.price.toLocaleString();

        const button = document.createElement("button");
        button.textContent = "Remove";
        button.className = "remove-btn";

        button.addEventListener("click", function() {
            removeItem(index);
        });

        div.appendChild(name);
        div.appendChild(button);

        cartItems.appendChild(div);
    });

    if (cartCount) {
        cartCount.textContent = quantity;
    }

    if (cartTotal) {
        cartTotal.textContent = total.toLocaleString();
    }
}

// ADD PRODUCTS TO CART

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", function() {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        cart.push({
            name: name,
            price: price
        });

        saveCart();
        displayCart();

        alert(name + " has been added to your cart!");
    });

});

// REMOVE INDIVIDUAL PRODUCTS

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// CLEAR THE ENTIRE CART

const clearButton = document.getElementById("clear-cart");

if (clearButton) {
    clearButton.addEventListener("click", function() {

        cart = [];

        saveCart();
        displayCart();

    });
}

// CONTACT FORM

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;

        alert("Thank you, " + name + "! Your message has been received.");

        contactForm.reset();

    });

}

// DISPLAY SAVED CART WHEN PAGE LOADS

displayCart();
