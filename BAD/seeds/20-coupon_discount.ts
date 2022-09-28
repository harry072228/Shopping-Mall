import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("coupon_discount").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            coupon_id: 1,
            discount_id: 1,
        },
        {
            coupon_id: 1,
            discount_id: 2,
        },
        {
            coupon_id: 3,
            discount_id: 3,
        }
        



    ])
        .into("coupon_discount")


}