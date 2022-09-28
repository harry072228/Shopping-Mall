import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("discount_productDetail").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            productDetail_id: 1,
            discount_id: 1,
        },
        {
            productDetail_id: 1,
            discount_id: 2,
        },
        {
            productDetail_id: 3,
            discount_id: 3,
        }


    ])
        .into("discount_productDetail")


}