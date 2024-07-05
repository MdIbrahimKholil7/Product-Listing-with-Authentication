import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from '../utils/appConsts'
import { IAuthService } from '../interface/IAuthService'
import AuthService from '../services/authService'
import AuthController from '../controller/authController'
import ProductController from '../controller/productController'
import ProductService from '../services/productService'
import AuthRoutes from '../routes/userRoute'
import ProductRoutes from '../routes/productRoute'

const container = new Container()

container.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes)
container.bind<ProductRoutes>(TYPES.ProductRoutes).to(ProductRoutes)
container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<ProductService>(TYPES.ProductService).to(ProductService)
container.bind<AuthController>(TYPES.AuthController).to(AuthController)
container.bind<ProductController>(TYPES.ProductController).to(ProductController)
export default container
