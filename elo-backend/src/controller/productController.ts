import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import ProductService from '../services/productService'
import { IProduct } from '../interface/IProduct'
import { catchAsync } from '../utils/catchAsync'
import AppError from '../utils/appError'
import httpStatus from 'http-status'
import TYPES from '../utils/appConsts'

@injectable()
class ProductController {
  constructor(
    @inject(TYPES.ProductService) private productService: ProductService,
  ) {
    this.productService = productService
  }

  readonly searchProducts = catchAsync((req: Request, res: Response) => {
    const { query } = req.query
    if (typeof query !== 'string') {
      throw new AppError(
        'Query parameter must be a string',
        httpStatus.BAD_REQUEST,
      )
    }
    const products: IProduct[] = this.productService.searchProducts(query)
    res.json({
      success: true,
      message: 'success',
      data: products,
    })
  })
}

export default ProductController
