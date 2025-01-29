import { Router } from 'express';
import { searchProductsService } from '../services';

export const productRouter = Router();

productRouter.get('/products', searchProductsService)
productRouter.get('/products/:id', searchProductsService)