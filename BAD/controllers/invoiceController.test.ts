import { InvoiceController } from "./invoiceController";

describe('Invoice Controller Test', () => {
    it('test addProductToCart', () => {
        const invoiceService = {
            getInvoiceDetailByUserId: jest.fn().mockReturnValue(null),
            createInvoice: jest.fn()
        }

        const invoiceController = new InvoiceController(
            {} as any,
            invoiceService as any,
            {} as any
        );

        const res = {
            json: jest.fn()
        }

        invoiceController.addProductToCart({
            session: {
                'user': 1
            },
            params: {
                id: '1'
            }
        } as any, res as any)

        expect(invoiceService.createInvoice).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            result: 'ok'
        })
    })
})