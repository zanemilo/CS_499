document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ingredient-form");
  for (let i = 1; i <= 6; i++) {
    const label = document.createElement("label");
    label.textContent = `Choose ingredient ${i}:`;
    label.setAttribute("for", `ingredient-select-${i}`);

    const select = document.createElement("select");
    select.name = `ingredient${i}`;
    select.id = `ingredient-select-${i}`;
    if (i === 1) select.required = true;

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select an ingredient";
    select.appendChild(defaultOption);

    ingredients.forEach(ing => {
      const option = document.createElement("option");
      option.value = ing;
      option.textContent = ing.charAt(0).toUpperCase() + ing.slice(1);
      select.appendChild(option);
    });

    form.insertBefore(label, form.lastElementChild);
    form.insertBefore(select, form.lastElementChild);
    form.insertBefore(document.createElement("br"), form.lastElementChild);
  }
});
const ingredients = [
  "chicken", "beef", "pork", "tofu", "egg", "milk",
  "cheddar cheese", "mozzarella", "butter", "olive oil",
  "onion", "garlic", "carrot", "celery", "bell pepper",
  "tomato", "spinach", "mushroom", "broccoli", "zucchini",
  "potato", "rice", "pasta", "bread", "flour", "sugar",
  "salt", "black pepper", "soy sauce", "vinegar", "basil",
  "oregano", "cumin", "chili powder", "coriander", "ginger",
  "lemon juice", "honey", "brown sugar", "yogurt"
];
