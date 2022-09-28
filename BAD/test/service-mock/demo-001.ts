
import { InvoiceService } from '../../services/invoiceService'
import { ProductService } from '../../services/productService'
import { ProfileService } from '../../services/profileService'
import { InvoiceController } from '../../controllers/invoiceController'


let invoiceService = {
    getInvoiceDetailByUserId: async (userId) => {
        return new Promise((resolve, reject) => [{
            id: 1,
            invoiceNumber: 2,
            status_id: 3,
            user_id: 4,
            address_id: 5,
            totalPrice: 10,
        }])
    }
} as InvoiceService

interface ProductIdType {
    id: number
}

interface IProductService {
    getProductDetailByProductId: (productId : number) => Promise<ProductIdType>
}

let profileService = {
    userInfo: async (userId) => {
        return new Promise((resolve, reject) => {
            address : {
                rows : [
                    {
                        address_id: 1,
                    }
                ]
            }
        })
    }
} as ProfileService

let productService = {} as ProductService

const invoiceController = new InvoiceController(
    profileService,
    invoiceService,
    productService
)

let req = {
    session: {
        user: 1,
    },
    params: {
        id : 1,
    }
} as any

let res = {} as any

(
    async () => {
        const invoiceRecord = await invoiceController.addProductToCart(req, res)
        console.log(invoiceRecord)
    }
)()
