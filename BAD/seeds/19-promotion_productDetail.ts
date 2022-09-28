import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotion_productDetail").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            promotion_id: 1,
            productDetail_id: 1,
            freebie_id: 2,
            product_number: 3,
            freebie_number: 2,
            freebie_price: 0
        },
        {
            promotion_id: 2,
            productDetail_id: 2,
            freebie_id: 3,
            product_number: 2,
            freebie_number: 1,
            freebie_price: 0
        },
        {
            promotion_id: 3,
            productDetail_id: 3,
            freebie_id: 1,
            product_number: 1,
            freebie_number: 1,
            freebie_price: 0
        },
        
        



    ])
        .into("promotion_productDetail")


}