export interface IProduct {
  id: number
  name: string
  description: string
  price: number
}

interface IProductService {
  searchProducts(query: string): IProduct[]
}

export default IProductService
