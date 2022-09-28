import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("discount_promotion").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            promotion_id: 1,
            discount_id: 1,
        },
        {
            promotion_id: 2,
            discount_id: 2,
        },
        {
            promotion_id: 3,
            discount_id: 3,
        }
        



    ])
        .into("discount_promotion")


}