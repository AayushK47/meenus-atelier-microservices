import { Router } from 'express';
import { createProductHandler, deleteProductsHandler, getProductHandlerById, getProductsHandler, updateProductsHandler } from '../controllers';

export const adminRouter = Router();

adminRouter.get('/products', getProductsHandler)
adminRouter.get('/products/:id', getProductHandlerById)
adminRouter.post('/products', createProductHandler)
adminRouter.patch('/products/:id', updateProductsHandler)
adminRouter.delete('/products/:id', deleteProductsHandler)