let knex = function (tableName : string) {

    return {

        select: function(arg:string) {
            return this
        },

        where: function(arg:string, value:any) {
            return this
        },

        andWhere: function(arg:string, value:any) {
            return [{
                id: 1,
                invoiceNumber: 2,
                status_id: 3,
                user_id: 4,
                address_id: 5,
                totalPrice: 10,
            }]
        },
    }

}

import { InvoiceService } from '../../services/invoiceService'
import { Knex } from 'knex'

(async ()=>{

let invoiceService = new InvoiceService(knex as any as Knex)
const invoiceRecord = await invoiceService.getInvoiceDetailByUserId(4)

console.log(invoiceRecord)

})()




