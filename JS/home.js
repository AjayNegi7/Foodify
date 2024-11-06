// Main script for handling recipe management, cart functionality, and user interactions.

const recipeModal = document.querySelector(".recipe-Modal");
const addRecipeBTN = document.getElementById("nav-add-recipe-btn");
const navItems = document.getElementById("nav-items");
const searchContainer = document.querySelector(".search-container");
const favIcons = document.getElementsByClassName("fav-icon");
const addErrorAddTOItem = document.getElementById("error-add-item");
const favoritesCountElement = document.getElementById("favorites-count");
const cartElementCount = document.getElementById("cart-count");
const favoritesDropdown = document.getElementById("favorites-dropdown");
const favoritesButton = document.getElementById('nav-favorites-btn');
const navCardButton = document.getElementById("nav-cart-btn");
const searchRecipeInput = document.getElementById("search-content-item");
const serachContainer = document.querySelector(".search-container");

let recipeCategorie = [
    {
        id: 1,
        restaurantName: "Meghna Foods",
        category: "North Indian",
        recipeName: "Egg Biryani",
        recipeImg: "https://kreafolk.com/cdn/shop/articles/30-best-food-illustration-ideas-you-should-check-kreafolk_a03aa195-be4c-4ac4-bba5-27d0343d577e.jpg?v=1717725779&width=1024",
        ingredients: "Eggs, Rice, Spices",
        price: 400,
        rating: "4.6",
    },
    {
        id: 2,
        restaurantName: "Burger House",
        category: "Fast Food",
        recipeName: "Hamburger",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        ingredients: "Beef, Patty, Lettuce, Tomato, Cheese",
        price: 250,
        rating: "4.5",
    },
    {
        id: 3,
        restaurantName: "Healthy Eats",
        category: "Salads",
        recipeName: "Fruits",
        recipeImg: "https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg",
        ingredients: "Assorted Fruits",
        price: 150,
        rating: "4.7",
    },
    {
        id: 4,
        restaurantName: "Pancake House",
        category: "Breakfast",
        recipeName: "Pancakes with Honey",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg",
        ingredients: "Flour, Eggs, Honey",
        price: 200,
        rating: "4.5",
    },
    {
        id: 5,
        restaurantName: "Pasta Place",
        category: "Italian",
        recipeName: "Pasta",
        recipeImg: "https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid",
        ingredients: "Pasta, Bolognese Sauce, Parmesan Cheese",
        price: 300,
        rating: "4.6",
    },
    {
        id: 6,
        restaurantName: "Taco Town",
        category: "North Indian",
        recipeName: "Chole Bhature",
        recipeImg: "https://static.vecteezy.com/system/resources/previews/015/933/115/non_2x/chole-bhature-is-a-north-indian-food-dish-a-combination-of-chana-masala-and-bhatura-or-puri-free-photo.jpg",
        ingredients: "Chana Masala, Bhatura",
        price: 350,
        rating: "4.8",
    }
];

let recipeCategories = JSON.parse(localStorage.getItem("recipe-category")) || recipeCategorie;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

addRecipeBTN.addEventListener('click', () => {
    recipeModal.style.display = "block";
});

window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.style.display = "none";
    }
});

navItems.addEventListener('click', (e) => {
    if (e.target.id === "nav-search-btn") {
        searchContainer.classList.toggle("hidden");
    }
    if (e.target.id === "nav-favorites-btn") {
        renderFavorites();
        toggleFavoritesDropdown(e.target);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(recipeCategories);
    attachFavIconListeners();
    updateFavoritesCount();
    updateCartCount();
    renderFavorites();
    setupEventListeners();

    const toggleButton = document.getElementById('nav-toggle-btn');
    const navItems = document.getElementById('nav-items');
    const navLinks = document.querySelectorAll('#nav-items a');

    toggleButton.addEventListener('click', handleToggleMenu);
    navLinks.forEach(link => link.addEventListener('click', handleCloseMenu));
});

function showCart() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const cartContainer = document.querySelector('.my-cart-container');
    const cartItems =  JSON.parse(localStorage.getItem("cartItems"))
    if (sidebar) sidebar.style.display = 'none';
    if (content) content.style.display = 'none';
    if (cartContainer) cartContainer.style.display = 'flex';
    renderCartDetails();
    const cartContainerAcc = document.querySelector('.my-cart-item-accoridian');
    if (cartContainerAcc) {
        attachAccordionListeners();
    }
}

function setupEventListeners() {
    const cartButton = document.getElementById('nav-cart-btn');
    if (cartButton) {
        cartButton.addEventListener('click', (event) => {
            event.preventDefault();
            showCart();
        });
    }
}

function renderCartDetails() {
    let cartItemIds = JSON.parse(localStorage.getItem("cartItems"));
    const cartElements = recipeCategories.filter((recipe) => {
        return cartItemIds.includes(recipe.id);
    });

    const markup = cartElements.map((recipe) => {
        return `<div class="my-cart-item-accoridian">
            <div class="accordion-head">
                <h3>${recipe.restaurantName}</h3>
                <button><span><i class="bi bi-chevron-down"></i></span></button>
            </div>
            <div class="accordion-body">
                <div class="accordion-body-left">
                    <div class="acc-head">
                        <span>${recipe.recipeName}</span>
                    </div>
                    <div class="acc-price">
                        <span>${recipe.price}</span>
                    </div>
                    <div class="acc-rating">
                        <div class="acc-rating-icon">⭐</div>
                        <div class="acc-rating-num">${recipe.rating}</div>
                    </div>
                    <div class="acc-description">
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum alias harum doloremque, et quisquam cum nam mollitia tenetur perspiciatis ea, blanditiis reiciendis.</p>
                        </div>
                    </div>
                </div>
                <div class="accordion-body-right">
                    <img src=${recipe.recipeImg} alt="">
                    <button data-recipe-id=${recipe.id}>Remove</button>
                </div>
            </div>
        </div>`;
    }).join('');

    const cartContainer = document.querySelector(".my-cart-details");
    cartContainer && (cartContainer.innerHTML = markup);

    
    const removeButtons = document.querySelectorAll('.accordion-body-right button');
    removeButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const itemId = Number(button.getAttribute('data-recipe-id'));
            
            
            removeItemFromCart(itemId);
        });
    });
}

function removeItemFromCart(itemId) {

    let cartItemIds = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItemIds = cartItemIds.filter((id) => id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(cartItemIds));
    renderCartDetails();
    attachAccordionListeners();
    updateCartCount()
}


let currentPage = 1;
const itemsPerPage = 3;

function renderRecipes(filteredCategories) {
    const totalItems = filteredCategories.length;//9
    const totalPages = Math.ceil(totalItems / itemsPerPage);//3

    const startIndex = (currentPage - 1) * itemsPerPage;//0
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);//3

    const itemsToDisplay = filteredCategories.slice(startIndex, endIndex);

    let markup = itemsToDisplay.map((recipe) => {
        return `<div class="item-card">
                    <div class="card-header">
                        <img src="${recipe.recipeImg}" alt="${recipe.recipeName}" />
                    </div>
                    <div class="card-body">
                        <div class="body-header dflex">
                            <h3>${recipe.recipeName}</h3>
                            <div class="body-subheader">
                                <button class="add-to-cart-btn" data-id="${recipe.id}">Add+</button>
                                <span><i class="bi bi-heart fav-icon" data-id="${recipe.id}"></i></span>
                            </div>
                        </div>
                        <div class="body-content">
                            <div class="dflex">
                                <h4>${recipe.rating} ⭐</h4>
                                <p>$${recipe.price} for two</p>
                            </div>
                            <div class="item-discription">
                                <p>${recipe.ingredients}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    const recipeContainer = document.querySelector(".cards-container");
    recipeContainer && (recipeContainer.innerHTML = markup);

    renderPagination(totalPages, filteredCategories); // Pass the filtered list to renderPagination
    attachAddToCartListeners();
}


function renderPagination(totalPages, filteredCategories) {
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderRecipes(filteredCategories); // Re-render with updated page
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderRecipes(filteredCategories); // Re-render with updated page
        }
    };
}



renderRecipes(recipeCategories);

function attachAddToCartListeners() {
    let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const recipeId = parseInt(button.getAttribute('data-id'));
            handleAddToCart(recipeId);
        });
    });
}

function handleAddToCart(id) {
    const isInCart = cartItems.includes(id);

    if (!isInCart) {
        cartItems.push(id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();
    } else {
        alert('This recipe is already in your cart.');
    }
}

function attachFavIconListeners() {
    const favIcons = document.querySelectorAll(".fav-icon");
    favIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const recipeId = parseInt(icon.getAttribute("data-id"));
            const recipe = recipeCategories.find(r => r.id === recipeId);
            const isFavorite = favorites.some(fav => fav.id === recipeId);

            if (!isFavorite) {
                icon.classList.replace("bi-heart", "bi-heart-fill");
                favorites.push(recipe);
            } else {
                icon.classList.replace("bi-heart-fill", "bi-heart");
                favorites = favorites.filter(fav => fav.id !== recipeId);
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavoritesCount();
            renderFavorites();
        });
    });
}

function updateFavoritesCount() {
    favoritesCountElement.innerText = favorites.length;
}

function updateCartCount() {
    const cartItems =  JSON.parse(localStorage.getItem("cartItems"))
    cartElementCount.innerText = cartItems.length;
}

function renderFavorites() {
   if(favorites.length>0){
    favoritesDropdown.innerHTML = favorites.map(fav => `
        <div class="favorite-item">
            <img src="${fav.recipeImg}" alt="${fav.recipeName}" class="favorite-img"/>
            <span>${fav.recipeName}</span>
        </div>
    `).join('');
   }
}

function toggleFavoritesDropdown(favoritesButton) {
    
    const rect = favoritesButton.getBoundingClientRect();

    if (favoritesDropdown.style.display === 'block') {
        favoritesDropdown.style.display = 'none';
    } else {
        if(favorites?.length>0){
            
        favoritesDropdown.style.display = 'block';
        favoritesDropdown.style.position = 'absolute';
        favoritesDropdown.style.top = `${rect.bottom}px`;
        favoritesDropdown.style.left = `${rect.left}px`;
        favoritesDropdown.style.width = `${rect.width}px`;
        }
    }
}

function handleAddRecipes(e) {
    e.preventDefault();

    const recipeName = e.target[0].value;
    const recipeImg = e.target[1].value;
    const price = e.target[2].value;
    const rating = e.target[3].value;
    const ingredients = e.target[4].value;

    let recipe = {
        id: recipeCategories.length + 1,
        restaurantName: recipeName,
        category: "North Indian",
        recipeName: recipeName,
        recipeImg: recipeImg,
        ingredients: ingredients,
        price: price,
        rating: rating,
    };

    recipeCategories.push(recipe);
    localStorage.setItem("recipe-category", JSON.stringify(recipeCategories));

    renderRecipes(recipeCategories);
    attachFavIconListeners();

    const recipeModalForm = document.querySelector(".recipe-modal-content form");
    recipeModalForm.reset();
    recipeModal.style.display = "none";
}

const recipeModalForm = document.querySelector(".recipe-modal-content form");
recipeModalForm?.addEventListener("submit", handleAddRecipes);

window.addEventListener('click', (e) => {
    if (!favoritesDropdown.contains(e.target) && !favoritesButton.contains(e.target)) {
        favoritesDropdown.style.display = 'none';
    }
});

// Side Bar Filter
function filterRecipes() {
    const checkedDishes = Array.from(document.querySelectorAll('.sidebar input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());

    const filteredRecipes = recipeCategories.filter(recipe => {
        return checkedDishes.length === 0 || checkedDishes.some(dish => recipe.recipeName.toLowerCase().includes(dish));
    });

    renderRecipes(filteredRecipes);
}



// Search input Filter
function filterSerach(e) {
    const searchData = document.getElementById("search-content-item").value.toLowerCase().trim();

    let serachFilteredData = recipeCategories.filter((recipe) => {
        return searchData && recipe.recipeName.toLowerCase().includes(searchData);
    });
    renderRecipes(serachFilteredData);
}

function searchDebounceFilter(cb, delay) {
    let timer;
    return function (...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb.apply(context, args);
        }, delay);
    }
}

const enhanceSearchFilter = searchDebounceFilter(filterSerach, 400);

document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterRecipes);
});

searchRecipeInput?.addEventListener("keyup", enhanceSearchFilter);

function attachAccordionListeners() {
    const accordionButtons = document.querySelectorAll('.accordion-head ');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accordionBody = button.closest('.accordion-head').nextElementSibling;

            accordionBody.classList.toggle('open');
        });
    });
}


// Responsive ness


function handleToggleMenu(e) {
    e.preventDefault();
    const navItems = document.getElementById('nav-items');
    if (window.innerWidth <= 700) {
        navItems.style.display = (navItems.style.display === 'flex') ? 'none' : 'flex';
    }
}

function handleCloseMenu() {
    const navItems = document.getElementById('nav-items');
    if (window.innerWidth <= 700) {
        navItems.style.display = 'none';
    }
}

const toggleIcon = document.querySelector('.sidebar-toggle-icon');
const closeIcon = document.querySelector('.sidebar-close-icon');
const sidebar = document.querySelector('.sidebar');

if (toggleIcon && closeIcon && sidebar) {
    toggleIcon.addEventListener('click', showSidebar);
    closeIcon.addEventListener('click', hideSidebar);
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleIcon = document.querySelector('.sidebar-toggle-icon');
    const closeIcon = document.querySelector('.sidebar-close-icon');

    sidebar.style.display = 'block';
    setTimeout(() => {
        sidebar.style.left = '0';
    }, 10);

    toggleIcon.style.display = 'none';
    closeIcon.style.display = 'block';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleIcon = document.querySelector('.sidebar-toggle-icon');
    const closeIcon = document.querySelector('.sidebar-close-icon');

    sidebar.style.left = '-70%';
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300);

    toggleIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}
