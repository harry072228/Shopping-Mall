import Knex from 'knex'
import { InvoiceService } from '../../services/invoiceService'
const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.


describe('Integration test of invoiceService', () => {
	let invoiceService: InvoiceService
	invoiceService = new InvoiceService(knex)


	// beforeAll(async () => {
	// 	return knex.migrate.rollback()
	// 		.then(function () {
	// 			return knex.migrate.latest();
	// 		})
	// 		.then(function () {
	// 			return knex.seed.run();
	// 		});
	// });

	afterAll(async () => {
		await knex.update('status_id', 1).from('invoice').where('user_id', 1)
		await knex.destroy()
	})



	it('can get invoice detail by userId', async () => {

		//Act
		const userId = 1

		const invoiceRecord = await invoiceService.getInvoiceDetailByUserId(userId)
		console.log(invoiceRecord)
		//Assert
		expect(invoiceRecord[0].id).toBe(1)
		expect(invoiceRecord[0].user_id).toBe(1)
		expect(invoiceRecord[0].status_id).toBe(1)
		expect(invoiceRecord[0].invoiceNumber).toBe('ABC001')

	})

	it('can create invoice', async () => {
		//Assert
		const userId = 5
		const addressId = 2

		//Act
		const invoiceRecord = await invoiceService.createInvoice(1, userId, addressId)

		//Assert
		expect(invoiceRecord[0].id).toBe(4)
		expect(invoiceRecord[0].user_id).toBe(5)
		expect(invoiceRecord[0].address_id).toBe(2)

	})

	it('can get all product in cart', async () => {

		//Act
		const invoiceId = 1

		const productToCartRecord = await invoiceService.getAllProductInCart(invoiceId)

		//Assert
		expect(productToCartRecord.rowCount).toBe(3)
		expect(productToCartRecord.rows[1].invoice_id).toBe(1)
		expect(productToCartRecord.rows[1].product_id).toBe(2)
		expect(productToCartRecord.rows[1].sum_of_price).toBe("300")
		expect(productToCartRecord.rows[1].sum_of_number).toBe("4")


	})

	// it('can get getInvoiceLargestNumber', async () => {
	// 	//Act
	// 	const invoiceNumber = await invoiceService.getInvoiceLargestNumber()

	// 	console.log(invoiceNumber)

	// 	//Assert
	// 	expect(invoiceNumber).toBe('ABC004')

	// })





	it('can update invoice', async () => {

		// const invoiceNumber = 1
		// const address_id = 2
		// knex search for the invoice with the invoiceNumber

		//Act

		const invoiceRecord = await invoiceService.updateInvoice(1, 'updated', 1, 1, 3, 155)


		//Assert

		expect(invoiceRecord[0].invoiceNumber).toBe('updated')
		expect(invoiceRecord[0].status_id).toBe(1)
		expect(invoiceRecord[0].user_id).toBe(1)
		expect(invoiceRecord[0].address_id).toBe(3)
		expect(invoiceRecord[0].totalPrice).toBe(155)


	})

	it('can add product to cart if the user already opened invoice', async () => {

		//Act
		const invoice_id = 3
		const product_id = 1
		const number = 1
		const price = 100
		const productToCartRecord = await invoiceService.addProductToCart(invoice_id, product_id, number, price)

		//Assert
		expect(productToCartRecord[0].invoice_id).toBe(3)
		expect(productToCartRecord[0].product_id).toBe(1)
		expect(productToCartRecord[0].number).toBe(1)
		expect(productToCartRecord[0].price).toBe(100)
	})

	it('can delete product from cart', async () => {
		//Act
		const invoice_id = 1
		const deleteFromCartProductId = 1
		const deleteRecordInvoice = await invoiceService.deleteProductFromCart(invoice_id, deleteFromCartProductId)
		// console.log(deleteRecordInvoice)

		//Assert
		expect(deleteRecordInvoice[0].product_id).toBe(1)
		expect(deleteRecordInvoice[0].invoice_id).toBe(1)
	})



	it('can delete the invoice', async () => {

		//Act
		const invoiceId = 1
		const invoiceRecord = await invoiceService.deleteInvoice(invoiceId)

		//Assert
		expect(invoiceRecord[0].status_id).toBe(3)
	})


	it('can get freebie information', async () => {
		//Act

		//Act
		const invoiceRecord = await invoiceService.checkFreebieInCart(1)


		//Assert

		expect(invoiceRecord.rows[0].invoice_id).toBe(1)
		expect(invoiceRecord.rows[0].number_of_freebie).toBe("2")
		expect(invoiceRecord.rows[0].name).toBe("Nokia Watch")
		expect(invoiceRecord.rows[0].freebie_id).toBe(3)
		expect(invoiceRecord.rows[0].image).toBe("15.jpg")

	})

	it('can get total price', async () => {
		//Act
		const invoiceId = 1
		//Act
		const totalPrice = await invoiceService.getTotalPrice(invoiceId)


		//Assert

		expect(totalPrice.rows[0].total_price).toBe("500")

	})
	
	it ('can minus product number', async () => {
		//Act
		const invoiceId = 2
		const productId = 3
		const productRecord = await invoiceService.minusProductInCart(invoiceId, productId)


		// console.log(productRecord)

		//Assert
		expect(productRecord.command).toBe('DELETE')
		expect(productRecord.rowCount).toBe(1)
		expect(productRecord.rows[0].number).toBe(1)
		expect(productRecord.rows[0].product_id).toBe(3)
		expect(productRecord.rows[0].invoice_id).toBe(2)
	})

})









