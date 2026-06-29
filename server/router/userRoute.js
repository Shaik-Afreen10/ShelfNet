const express = require('express');
const router = express.Router();

// --- CORRECTED PATHS ---
const authController = require('../controller/authController');
const userController = require('../controller/userController'); 
const { verifyUser } = require('../middleware/authenticateMiddleware');

const { userRegister, userLogin } = authController;

const {
    viewAllBooks,
    viewAllGenres,
    viewBookById,
    viewBooksByGenre,
    searchBooks,
    rateBook,
    getUserProfile
} = userController;

// Auth routes
router.post('/register', userRegister);
router.post('/login', userLogin); 

// Profile route
router.get('/profile', verifyUser, getUserProfile); // This is the route you need

// Book/Genre routes
router.get('/viewAllBooks', viewAllBooks);
router.get('/viewAllGenres', viewAllGenres);
router.get('/books/genre/:genreId', viewBooksByGenre);
router.get('/viewBook/:id', viewBookById);
router.post('/rating', rateBook);
router.get('/search', searchBooks);

module.exports = router; // Make sure this is module.exports