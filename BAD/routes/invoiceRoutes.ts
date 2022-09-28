import express from 'express'
import { InvoiceController } from '../controllers/invoiceController'
import {userMiddleware} from '../middleware'

export function createInvoiceRoutes(invoiceController: InvoiceController) {
  const invoiceRoutes = express.Router()

	invoiceRoutes.get('/invoice', userMiddleware, invoiceController.getInvoiceDetailByUserId)//session['invoice'].id
	// invoiceRoutes.post('/invoice', invoiceController.createInvoice)
	invoiceRoutes.put('/invoice', userMiddleware, invoiceController.updateInvoice)
	invoiceRoutes.patch('/invoice/:id', userMiddleware, invoiceController.deleteInvoice)


	invoiceRoutes.get('/cart', userMiddleware, invoiceController.getAllProductInCart)
	invoiceRoutes.post('/cart/:id', userMiddleware, invoiceController.addProductToCart)
	invoiceRoutes.delete('/cart/:id', userMiddleware, invoiceController.deleteProductFromCart)
	invoiceRoutes.delete('/minusProductInCart/:id', userMiddleware, invoiceController.minusProductInCart)
	// invoiceRoutes.put('/cart/:id', invoiceController.updateProductInCart)
	// invoiceRoutes.get('/cart/:id', invoiceController.getProductInCart)
	invoiceRoutes.get('/freebie', userMiddleware, invoiceController.checkFreebieInCart)
	invoiceRoutes.get('/totalPrice', userMiddleware, invoiceController.getTotalPrice)

	// invoiceRoutes.get('/invoiceLargestNumber', invoiceController.getInvoiceLargestNumber)









	return invoiceRoutes;
}