# Recipe Recommendation Web App

## Overview

This is a full-stack web application that recommends recipes based on user-selected ingredients.  
It is built with:

- **Express.js** (Node.js backend)  
- **HTML, CSS, and JavaScript** frontend  
- **MongoDB** for recipe and vocabulary storage  

The application allows users to input ingredients they have on hand and receive matching recipes based on a **binary vector similarity** algorithm using the dot product method.  
It was developed as part of my **CS-499 Capstone Project** at Southern New Hampshire University and showcases enhancements in:

- **Software Design and Engineering**
- **Algorithms and Data Structures**
- **Databases**

---

## Features

- Ingredient-based recipe matching using **binary vector similarity**
- Modular backend architecture with separated routes, controllers, and utilities
- MongoDB integration for scalable and flexible data storage
- API-driven recipe retrieval with consistent schema validation
- Professional README with setup instructions
- Minimalist, user-friendly frontend interface
- Ready for future enhancements (authentication, images, instructions)

---

## Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | HTML, CSS, JavaScript |
| Backend      | Node.js, Express.js |
| Database     | MongoDB with Mongoose |
| Data Format  | JSON (seed data)    |

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-rec-app.git
   cd recipe-rec-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Seed the database**
   ```bash
   node seed.js
   ```
   This will populate MongoDB with recipe and vocabulary data.

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
recipe-rec-web-app/
├── data/
│   ├── vocabulary.json          # Ingredient vocabulary for vectorization
│   └── recipes.json              # Base recipe data (used for seeding)
├── public/
│   ├── index.html               # Frontend UI
│   ├── style.css                # UI styling
│   └── script.js                # Client-side logic
├── routes/                      # API route definitions
├── controllers/                 # Route handlers and logic
├── models/                      # Mongoose schemas for recipes/vocabulary
├── utils/                        # Helper functions (e.g., vectorization)
├── server.js                    # Main backend server
├── seed.js                      # Database seeding script
├── package.json                 # Dependencies and metadata
```

---

## Current Status

| Component        | Status                  |
|------------------|-------------------------|
| App Architecture | Modularized and deployed-ready |
| Vector Algorithm | Implemented and optimized |
| MongoDB DB       | Integrated and functional |
| Frontend UI      | Basic functional version |
| Documentation    | Complete for deployment |

---

## Future Enhancements

- Add recipe images and detailed instructions
- Implement user authentication for saved favorites
- Expand search to support partial matches and weighting
- Improve mobile responsiveness and accessibility
- Add automated tests and validation

---

## Author

**Zane Milo Deso**  
Southern New Hampshire University  
Capstone Project – CS-499  

[LinkedIn](https://www.linkedin.com/in/zanedeso) | [GitHub](https://github.com/zanemilo)

---

## License

This project is licensed under the MIT License.
