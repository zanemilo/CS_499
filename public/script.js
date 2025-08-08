document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("ingredient-form");
  const resultsDiv = document.getElementById("results");

  let ingredients = [];

  // Load vocabulary.json dynamically
  try {
    const res = await fetch('/data/vocabulary.json');
    ingredients = await res.json();
  } catch (err) {
    console.error("Failed to load vocabulary:", err);
    resultsDiv.innerHTML = "<p>Error loading ingredients list.</p>";
    return;
  }

  // Clear out any hardcoded selects first
  form.querySelectorAll('select, label, br').forEach(el => el.remove());

  // Create 6 dropdowns
  for (let i = 1; i <= 6; i++) {
    const label = document.createElement("label");
    label.setAttribute("for", `ingredient-select-${i}`);
    label.textContent = `Choose ingredient ${i}:`;

    const select = document.createElement("select");
    select.id = `ingredient-select-${i}`;
    select.name = `ingredient${i}`;
    if (i === 1) select.required = true;

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select an ingredient";
    select.appendChild(defaultOption);

    ingredients.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      select.appendChild(opt);
    });

    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(label, submitButton);
    form.insertBefore(select, submitButton);
    form.insertBefore(document.createElement("br"), submitButton);
  }

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedIngredients = [];
    for (let i = 1; i <= 6; i++) {
      const value = document.getElementById(`ingredient-select-${i}`).value;
      if (value) selectedIngredients.push(value);
    }

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      const data = await res.json();
      displayResults(data.results  || []);
    } catch (err) {
      console.error("Search request failed:", err);
      resultsDiv.innerHTML = "<p>Error retrieving recipe results.</p>";
    }
  });

  function displayResults(recipes) {
    resultsDiv.innerHTML = ""; // Clear previous

    if (!recipes.length) {
      resultsDiv.textContent = "No matching recipes found.";
      return;
    }

    recipes.forEach(r => {
      const div = document.createElement("div");
      div.className = "recipe-result";
      div.innerHTML = `<strong>${r.name}</strong> (Score: ${r.score})`;
      resultsDiv.appendChild(div);
    });
  }
});
