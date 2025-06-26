//THis file will be used to define the routes for the application
import { Router } from 'express';

const router = Router();

// Product Routes
router.get('/product', (req, res) => {
    // testing
    console.log("Fetching all products");
    res.status(200).json({ message: "All products fetched successfully" });
});           // Get all products
router.get('/product/:id', () => {});       // Get a single product by ID
router.put('/product/:id', () => {});       // Update a product by ID 
router.post('/product', () => {});          // Create a new product
router.delete('/product/:id', () => {});    // Delete a product by ID

// Update Routes
router.get('/update', () => {});        // Get all updates
router.get('/update/:id', () => {});    // Get a single update by ID
router.put('/update/:id', () => {});        // Update a specific update by ID
router.post('/update', () => {});       // Create a new update
router.delete('/update/:id', () => {});  // Delete a specific update by ID

// Update Point Routes
router.get('/updatepoint', () => {});        // Get all update points
router.get('/updatepoint/:id', () => {});    // Get a single update point by ID
router.put('/updatepoint/:id', () => {});        // Update a specific update point
router.post('/updatepoint', () => {});          // Create a new update point
router.delete('/updatepoint/:id', () => {}); // Delete a specific update point by ID

export default router;