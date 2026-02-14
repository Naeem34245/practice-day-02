const loadAllMeals = (search = "a") => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('meal-container');
            container.innerHTML = ''; 

            if (data.meals) {
                displayMeals(data.meals);
            } else {
                container.innerHTML = `<h1 class="error-msg">Not Found</h1>`;
            }
        });
};

const displayMeals = (meals) => {
    const container = document.getElementById('meal-container');

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.className = 'meal-card';
        div.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
        `;
        div.onclick = () => showInfo(meal.idMeal);
        container.appendChild(div);
    });
};

const handleSearch = () => {
    const value = document.getElementById('user-input').value;
    loadAllMeals(value);
};

const showInfo = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            const infoContainer = document.getElementById('info-container');
            const details = document.getElementById('info-details');

            details.innerHTML = `
                <span class="close-btn" onclick="closeInfo()">&times;</span>
                <img src="${meal.strMealThumb}" style="width:100%; border-radius:10px;">
                <h2 style="color:#ff6347">${meal.strMeal}</h2>
                <hr>
                <h4>Ingredients</h4>
                <ul>${listIngredients(meal)}</ul>
            `;
            infoContainer.style.display = 'block';
        });
};

const listIngredients = (meal) => {
    let list = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            list += `<li>${ingredient}</li>`;
        }
    }
    return list;
};

const closeInfo = () => {
    document.getElementById('info-container').style.display = 'none';
};

loadAllMeals();