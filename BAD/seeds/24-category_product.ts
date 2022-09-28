import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("category_product").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            category_id: 1,
            product_id: 1,
        },
        {
            category_id: 1,
            product_id: 2,
        },
        {
            category_id: 3,
            product_id: 3,
        }
        



    ])
        .into("category_product")


}