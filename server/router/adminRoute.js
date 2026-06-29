const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const adminController = require('../controller/adminController')
const authenticateMiddleware = require('../middleware/authenticateMiddleware');
const {verifyAdmin} = authenticateMiddleware;
const {adminLogin,adminRegister,adminChangePass} = authController;

// --- 1. Add editUser and deleteUser here ---
const {getAllUsers,addGenre,addBooks,viewGenre,viewBooks,
    editBooks,
    deleteGenre,
    editGenre,
    editUser,    
    deleteUser  
} = adminController;

router.post('/register',adminRegister);
router.post('/login',adminLogin); //generate Token
router.get('/allUsers',verifyAdmin,getAllUsers); //middleware to check the token
router.post('/addBooks',verifyAdmin,addBooks)
router.post('/genre',verifyAdmin,addGenre);
router.patch('/genre/:id',verifyAdmin,editGenre);
router.delete('/genreDelete/:id',verifyAdmin,deleteGenre);
router.get('/viewGenre',verifyAdmin,viewGenre)
router.put('/changePass/:id',verifyAdmin,adminChangePass);
router.get('/viewBooks',verifyAdmin,viewBooks)
router.patch('/editBooks/:id',verifyAdmin,editBooks);

// --- 2. Add these two new routes at the bottom ---
router.patch('/user/:id', verifyAdmin, editUser);
router.delete('/user/:id', verifyAdmin, deleteUser);

module.exports = router;