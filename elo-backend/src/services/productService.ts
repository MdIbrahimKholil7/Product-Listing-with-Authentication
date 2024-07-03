import { injectable } from 'inversify'
import IProductService, { IProduct } from '../interface/IProduct'
import productsData from '../data/productData.json'

@injectable()
class ProductService implements IProductService {
  private products: IProduct[]

  constructor() {
    this.products = productsData as IProduct[]
  }

  searchProducts(query: string): IProduct[] {
    const searchTerm = query.toLowerCase()
    return this.products.filter(product =>
      Object.values(product).some(value =>
        value.toString().toLowerCase().includes(searchTerm),
      ),
    )
  }
}

export default ProductService
