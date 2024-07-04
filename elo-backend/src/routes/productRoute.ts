import { Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../utils/appConsts'

import ProductController from '../controller/productController'
import authMiddleware from '../middlware/authMiddleware'

@injectable()
class ProductRoutes {
  public router: Router

  constructor(
    @inject(TYPES.ProductController)
    private productController: ProductController,
  ) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/product/query:
     *   get:
     *     summary: Search products by query
     *     tags: [Products]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: query
     *         name: query
     *         schema:
     *           type: string
     *         required: true
     *         description: Query string to search products
     *     responses:
     *       200:
     *         description: A list of products matching the query
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       400:
     *         description: Invalid query parameter
     */
    this.router.get(
      '/query',
      authMiddleware,
      this.productController.searchProducts,
    )
  }
}

export default ProductRoutes
