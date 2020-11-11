const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const recipesEl = document.getElementById('recipes');
const resultHeading = document.getElementById('result-heading');
const single_recipeEl = document.getElementById('single-recipe');


submit.addEventListener('submit', searchRecipe);



function searchRecipe(e) {
  e.preventDefault();
  single_recipeEl.innerHTML = '';
  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        resultHeading.innerHTML = `<h2> Search results for '${term}':</h2>`

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          recipesEl.innerHTML = data.meals.map(meal => `
            <div class="recipe">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="recipe-info" data-mealID="${meal.idMeal}" >
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
         `)
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}