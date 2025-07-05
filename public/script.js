// script.js

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


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ingredient-form");

  // Clear out any hardcoded selects first (if needed)
  form.querySelectorAll('select, label, br').forEach(el => el.remove());

  for (let i = 1; i <= 6; i++) {
    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", `ingredient-select-${i}`);
    label.textContent = `Choose ingredient ${i}:`;

    // Create select
    const select = document.createElement("select");
    select.id = `ingredient-select-${i}`;
    select.name = `ingredient${i}`;
    if (i === 1) select.required = true;

    // Default option
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select an ingredient";
    select.appendChild(defaultOption);

    // Populate options from list
    ingredients.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      select.appendChild(opt);
    });

    // Insert before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(label, submitButton);
    form.insertBefore(select, submitButton);
    form.insertBefore(document.createElement("br"), submitButton);
  }
});
