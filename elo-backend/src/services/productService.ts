import { injectable } from 'inversify'
import IProductService, { IProduct } from '../interface/IProduct'
import productsData from '../data/productData.json'

@injectable()
class ProductService implements IProductService {
  private products: IProduct[]

  constructor() {
    this.products = productsData as IProduct[]
  }

  searchProducts(query: string | undefined | any): IProduct[] {
    if (typeof query === 'string') {
      const searchTerm = query.toLowerCase()
      return this.products.filter(product =>
        Object.values(product).some(value =>
          value.toString().toLowerCase().includes(searchTerm),
        ),
      )
    } else {
      return this.products
    }
  }
}

export default ProductService
