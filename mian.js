// Select elements from the DOM
let menu = document.querySelector(".toggle i");
let nav = document.querySelector(".nav");
let section = document.querySelector(".img-slider");
let all_box = document.querySelectorAll(".box");
let shop_icon = document.querySelector(".icon i.shop");

let right = document.querySelector(".right");
let left = document.querySelector(".left");
let index = 0; // Index for image slider
let timer;
let all_links = document.querySelectorAll(".nav li a");

// Load color and active link from localStorage
let color_element = localStorage.getItem("color");
let active = localStorage.getItem('activelink');
if (active !== null) {
    let true_element = all_links[active];
    true_element.style.color = color_element;
}

// Set up click event listeners for nav links
all_links.forEach((e, current) => {
    e.addEventListener("click", function() {
        all_links.forEach(link => {
            link.style.color = "";
        });
        e.style.color = "red";
        window.localStorage.setItem("color", e.style.color);
        window.localStorage.setItem("activelink", current);
    });
});

// Menu icon toggle functionality
menu.onclick = function() {
    nav.classList.toggle("active");
    if (nav.classList.contains("active")) {
        menu.classList.remove("fa-bars");
        menu.classList.add("fa-x");
    } else {
        menu.classList.add("fa-bars");
        menu.classList.remove("fa-x");
    }
};

// Shop icon click event
shop_icon.addEventListener("click", function() {
    window.location = "shop.html";
});

// Store item in localStorage
function store_item(src, name, price) {
    let items = JSON.parse(window.localStorage.getItem("items")) || [];
    items.push({
        img: src,
        name: name,
        price: price
    });
    window.localStorage.setItem("items", JSON.stringify(items));
    window.location.href = "shop.html";
}

// Display items from localStorage
function display() {
    let section_product = document.querySelector(".productt");
    let items = JSON.parse(window.localStorage.getItem("items")) || [];
    let text_content = '';

    // section_product.innerHTML = '';

    items.forEach((item, index) => {
        text_content += `
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="image">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="title">
                        <h3>${item.name}</h3>
                    </div>
                    <div class="price">
                        <h2>${item.price}</h2>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-trash-can remove" onclick="cut(${index})" style="color:black;margin:10px 10px;font-size:20px; cursor: pointer;"></i>
                    </div>
                </div>
            </div>
        </div>`;
    });
    section_product.innerHTML = text_content;


}
// Load items when the window loads
window.onload = function() {
    display();
};

// Function to remove an item from localStorage
function cut(index) {
    let items = JSON.parse(window.localStorage.getItem("items")) || [];
    items.splice(index, 1); // Remove item
    window.localStorage.setItem("items", JSON.stringify(items)); // Update localStorage
    display(); // Refresh display
}

// Slider functionality (uncomment to use)
right.addEventListener("click", function() {
    index++;
    clearTimeout(timer);
    update();
});
left.addEventListener("click", function() {
    index--;
    clearTimeout(timer);
    update();
});

// Update function for the slider
function update() {
    if (index > 4) {
        index = 0;
    }
    if (index >= all_box.length) {
        index = 0; // Reset to first item
    } else if (index < 0) {
        index = all_box.length - 1; // Go to last item
    }
    section.style.transform = `translateX(-${index * 100}%)`; // Move slider
    timer = setTimeout(() => {
        index++;
        update();
    }, 2000); // Automatic slider update
}

// Initial call to start the slider
update();