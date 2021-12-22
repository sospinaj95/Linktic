import {
    createProduct,
    updateProduct,
    updateCategoryProduct,
    listProduct,
    listAudit,
    listProductFilter,
    deleteProduct
} from '../controllers/products.controller.mjs';
import express from 'express';
const router = express.Router();

// basic methods
router.post('/products',createProduct);
router.patch('/products/:id',updateProduct);
router.put('/products/:id',updateCategoryProduct);
router.get('/products',listProduct);
router.get('/products/audit',listAudit);
router.post('/products/filter',listProductFilter);
router.delete('/products/:id',deleteProduct);
export default router;
