import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("coupon_user").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            coupon_id: 1,
            user_id: 1,
            status_id: 1,
        },
        {
            coupon_id: 1,
            user_id: 2,
            status_id: 1,
        },
        {
            coupon_id: 3,
            user_id: 3,
            status_id: 1,
        }
        



    ])
        .into("coupon_user")


}