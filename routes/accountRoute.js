import express from "express";
import multer from "multer";
import accountController from "../controllers/accountController.js";
import auth from '../middleware/auth.js'; 

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Adjust destination as needed

// Public routes
router.post('/accounts', upload.single('profilePicture'), accountController.createAccount);

// Protected routes
router.get('/accounts', auth, accountController.getAllAccounts);
router.get('/accounts/:id', auth, accountController.getAccount);
router.put('/accounts/:id', auth, upload.single('profilePicture'), accountController.updateAccount);
router.delete('/accounts/:id', auth, accountController.deleteAccount);

export default router;
