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
     *     summary: Search products with a wildcard query
     *     tags: [Products]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: query
     *         name: query
     *         schema:
     *           type: string
     *         description: Wildcard query string
     *     responses:
     *       '200':
     *         description: Successful response with products
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProductResponse'
     *       '401':
     *         description: Unauthorized request, invalid token
     *       '500':
     *         description: Internal server error
     */

    this.router.get(
      '/query',
      authMiddleware,
      this.productController.searchProducts,
    )
  }
}

export default ProductRoutes
