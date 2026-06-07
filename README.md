# JournaLite
A user-focused digital journal application designed as an internship project to demonstrate core CRUD (Create, Read, Update, Delete) functionality. It offers a simple and intuitive way for users to record their daily reflections while providing a visual overview of their emotional well-being.
> Note: The login interface is currently included for design purposes only and does not contain functional authentication logic.

## Features
* **Daily Journaling:** Easily create, read, update, and delete journal entries for any given day.
* **Mood Tracking:** Assign one of five distinct moods to each entry:
  * Great (Green)
  * Good (Light Green)
  * Neutral (Yellow)
  * Bad (Light Red)
  * Horrible (Red)
* **Visual Monthly Calendar:** A color-coded calendar interface that provides an immediate snapshot of your mood trends throughout the month.
* **View All Entries:** A comprehensive list view of all journal entries featuring:
  * **Pagination:** Efficiently browse through your history.
  * **Flexible Layouts:** Toggle between Card View and Table View to suit your preference.
  * **Sorting:** Toggle entries by ascending or descending date.

## Setup
Ensure your local environment has the following installed:
* Node.js & npm
* Composer
* PHP 8.4.8+
* MySQL 9.3.0+

### Backend
1. ```cd backend```
2. ```composer install```
3. ```cp .env.example .env```
4. ```php artisan key:generate```
5. Configure your .env file with your local database credentials.
6. ```php artisan migrate```
7. ```php artisan serve```

### Frontend
1. ```cd frontend```
2. ```npm install```
3. ```npm run dev```
