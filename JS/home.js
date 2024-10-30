const recipeModal = document.querySelector(".recipe-Modal");
const addRecipeBTN = document.getElementById("nav-add-recipe-btn");
const navItems = document.getElementById("nav-items");
const searchContainer = document.querySelector(".search-container");
const favIcons = document.querySelectorAll(".fav-icon");

let recipeCategories = [
    {
        id: 1,
        restaurantName: "Meghna Foods",
        category: "North Indian",
        recipeName: "Egg Biryani",
        recipeImg: "https://kreafolk.com/cdn/shop/articles/30-best-food-illustration-ideas-you-should-check-kreafolk_a03aa195-be4c-4ac4-bba5-27d0343d577e.jpg?v=1717725779&width=1024",
        ingredients: ["Eggs", "Rice", "Spices"],
        price: 400,
        rating: "4.6",
    },
    {
        id: 2,
        restaurantName: "Burger House",
        category: "Fast Food",
        recipeName: "Hamburger",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese"],
        price: 250,
        rating: "4.5",
    },
    {
        id: 3,
        restaurantName: "Healthy Eats",
        category: "Salads",
        recipeName: "Fruits",
        recipeImg: "https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg",
        ingredients: ["Assorted Fruits"],
        price: 150,
        rating: "4.7",
    },
    {
        id: 4,
        restaurantName: "Pancake House",
        category: "Breakfast",
        recipeName: "Pancakes with Honey",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg",
        ingredients: ["Flour", "Eggs", "Honey"],
        price: 200,
        rating: "4.5",
    },
    {
        id: 5,
        restaurantName: "Pasta Place",
        category: "Italian",
        recipeName: "Pasta",
        recipeImg: "https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid",
        ingredients: ["Pasta", "Bolognese Sauce", "Parmesan Cheese"],
        price: 300,
        rating: "4.6",
    },
    {
        id: 6,
        restaurantName: "Taco Town",
        category: "North Indian",
        recipeName: "Chole Bhature",
        recipeImg: "https://static.vecteezy.com/system/resources/previews/015/933/115/non_2x/chole-bhature-is-a-north-indian-food-dish-a-combination-of-chana-masala-and-bhatura-or-puri-free-photo.jpg",
        ingredients: ["Chana Masala", "Bhatura"],
        price: 350,
        rating: "4.8",
    }
];



addRecipeBTN.addEventListener('click',()=>{
    recipeModal.style.display="block";
    console.log(recipeModal);
})

window.addEventListener('click',(e)=>{
    // console.log(recipeModal.style.display);    
    if(e.target===recipeModal){
        // if( recipeModal.style.display="block"){
        recipeModal.style.display="none";
    }
})


navItems.addEventListener('click',(e)=>{
    console.log(e.srcElement.id);
    if(e.srcElement.id==="nav-search-btn"){
        if(searchContainer.classList.contains("hidden")){
            searchContainer.classList.remove("hidden");
        }
        else{
            searchContainer.classList.add("hidden");
        }
    }
})


// *************Fav Icons**************
favIcons.forEach((icon)=>{
    icon.addEventListener('click',(e)=>{
        if(icon.classList.contains("bi-heart")){
            icon.classList.replace("bi-heart","bi-heart-fill")
        }
        else{
            icon.classList.replace("bi-heart-fill","bi-heart")
        }
        
    })
    
})


function renderRecipes(recipeCategories) {
    let markup = recipeCategories.map((recipe) => {
        return `<div class="item-card">
                    <div class="card-header">
                        <img src="${recipe?.recipeImg}" alt="${recipe?.recipeName}" />
                    </div>
                    <div class="card-body">
                        <div class="body-header dflex">
                            <h3>${recipe?.restaurantName}</h3>
                            <div class="body-subheader">
                                <button>Add+</button>
                                <span><i class="bi bi-heart fav-icon"></i></span>
                            </div>
                        </div>
                        <div class="body-content">
                            <div class="dflex">
                                <h4>${recipe?.rating} ⭐</h4>
                                <p>$${recipe?.price} for two</p>
                            </div>
                            <div class="item-discription">
                                <p>${recipe?.ingredients.length>1 ? recipe?.ingredients.join(', ') : recipe?.ingredients}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    const recipeContainer = document.querySelector(".cards-container");
    recipeContainer.innerHTML = markup;
}
document.addEventListener('DOMContentLoaded',()=>{renderRecipes(recipeCategories)});

const recipeModalForm = document.querySelector(".recipe-modal-content form");
recipeModalForm.addEventListener("submit",handleAddRecipes)

function handleAddRecipes(e){
    e.preventDefault();
// console.log( e.target[0].value);
    // const restaurantName = e.target[0].value;
    const recipeName = e.target[0].value; 
    const recipeImg = e.target[1].value; 
    const price = parseFloat(e.target[2].value); 
    const rating = parseFloat(e.target[3].value); 
    const ingredients = parseFloat(e.target[4].value); 
let recipe = {
        id: recipeCategories.length+1,
        restaurantName: "Mghana",
        category: "North Indian",
        recipeName: recipeName,
        recipeImg: recipeImg,
        ingredients: ingredients,
        price: price,
        rating: rating,

}

recipeCategories.push(recipe);
renderRecipes(recipeCategories)


}
