const recipeModal = document.querySelector(".recipe-Modal");
const addRecipeBTN = document.getElementById("addRecipeBtn");

console.log(addRecipeBTN);

addRecipeBTN.addEventListener('click',()=>{
    recipeModal.style.display="block";
    console.log(recipeModal);
})

window.addEventListener('click',(e)=>{
    // console.log(recipeModal.style.display);
    
    console.log(e.target);
    
    if(e.target===recipeModal){
        // if( recipeModal.style.display="block"){
        recipeModal.style.display="none";
    }
})