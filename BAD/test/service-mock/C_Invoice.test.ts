import { InvoiceController } from "../../controllers/invoiceController";

describe('Invoice Controller Test', () => {
    it('test addProductToCart', () => {
        const InvoiceService = {
            getInvoiceDetailByUserId: jest.fn().mockReturnValue(null),
            getProductPrice: jest.fn()
        }

        const invoiceController = new InvoiceController(
            {} as any,
            InvoiceService as any,
        ); 

        const res = {
            json: jest.fn()
        }

        invoiceController.addProductToCart({
            body: {
                colorId: 1,
                sizeId: 1,
            },
            params: {
                id: '1'
            },
            user: {
                invoiceId: 1
            }
        } as any, res as any)

        expect(InvoiceService.getProductPrice).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith({
            result: true,
        })
    })
})