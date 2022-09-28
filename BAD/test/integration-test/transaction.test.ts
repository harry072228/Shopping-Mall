import Knex from 'knex'
import { InsertRejectError, InvoiceService } from '../../services/invoiceService'
const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.


describe('Integration test of invoiceService', () => {
    let invoiceService: InvoiceService
    invoiceService = new InvoiceService(knex)

	// afterEach(afterAllHelper)
	beforeAll(async () => {
		return knex.migrate.rollback()
			.then(function () {
				return knex.migrate.latest();
			})
			.then(function () {
				return knex.seed.run();
			});
	});

	afterAll(async () => {
		await knex.update('status_id', 1).from('invoice').where('user_id', 1)
		await knex.destroy()
	})

    it('can createInvoice', async () => {

        const status_id = 3
        const user_id = 4
        const address_id = 1

        //Act
        const invoiceRecord = await invoiceService.createInvoice(status_id, user_id, address_id)

        // Assert
        // expect(invoiceRecord[0].invoiceNumber).toBe('TEST')
        expect(invoiceRecord[0].user_id).toBe(4)
        expect(invoiceRecord[0].address_id).toBe(1)
        expect(invoiceRecord[0].status_id).toBe(3)

    })



    it('can not createInvoice (insertRejectError)', async () => 
    {
        //Act
        try {
            const status_id = 1
            const user_id = 1
            const address_id = 1

            
            const promise1 = invoiceService.createInvoice(
                status_id,
                user_id,
                address_id)

            const promise2 = invoiceService.createInvoice(
                status_id,
                user_id,
                address_id)
            

            // const promise1 = invoiceService.getInvoiceLargestNumber()
            // const promise2 = invoiceService.getInvoiceLargestNumber()

            await Promise.all([
                promise1, 
                promise2,
            ]);

            // fail('should throw error');
        //Assert
        } catch (error) {
            expect(error).toBeInstanceOf(InsertRejectError)
        }
    })


})