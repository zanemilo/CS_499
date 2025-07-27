# Recipe Recommendation Web App

## Overview

This is a full-stack web application that recommends recipes based on user-selected ingredients. It is built with:
- **Express.js** (Node.js backend)
- **HTML & CSS** frontend
- **MongoDB** for data storage (in progress)

The goal is to allow users to input ingredients they have on hand and receive matching recipes based on an optimized binary vector filtering algorithm.

---

## Features

- Ingredient-based recipe matching using binary vector similarity
- Modular backend design with clearly defined routes
- Minimalist, user-friendly frontend interface
- Scalable structure for future enhancements (e.g., authentication, image support)
- Currently uses local JSON for recipes; MongoDB integration planned

---

## Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | HTML, CSS, JavaScript |
| Backend      | Node.js, Express.js |
| Database     | MongoDB (planned) |
| Data Format  | JSON (skeleton data during development) |

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-rec-app.git
   cd recipe-rec-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
recipe-rec-web-app/
├── data/
│   └── vocabulary.json          # Ingredient vocabulary (used for vectorization)
├── public/
│   ├── index.html               # Frontend UI
│   ├── style.css                # UI styling
│   └── script.js                # Client-side logic
├── server.js                    # Main backend server
├── package.json                 # Dependencies and metadata
```

---

## Current Status

| Component        | Status                            |
|------------------|-----------------------------------|
| App Architecture | Modularized and functional      |
| Vector Algorithm | Implemented and working         |
| Frontend UI      | Basic version implemented       |
| MongoDB DB       | Planned for next enhancement    |
| Documentation    | Draft in progress               |

---

## Future Enhancements

- Integrate MongoDB with recipe schema and query logic
- Add recipe card components with images and instructions
- Enhance mobile responsiveness and interactivity
- Include unit testing and validation
- Polish documentation and ePortfolio walkthrough

---

## Author

**Zane Milo Deso**  
Southern New Hampshire University  
Capstone Project – CS-499  
[LinkedIn](https://www.linkedin.com/in/zanedeso) | [GitHub](https://github.com/zanemilo)

---

## License

This project is licensed under the MIT License
