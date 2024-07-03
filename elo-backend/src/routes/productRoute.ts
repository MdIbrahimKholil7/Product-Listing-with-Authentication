import { Router } from 'express'
import { inject, injectable } from 'inversify'
import TYPES from '../utils/appConsts'

import ProductController from '../controller/productController'

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
    this.router.get('/query', this.productController.searchProducts)
  }
}

export default ProductRoutes
