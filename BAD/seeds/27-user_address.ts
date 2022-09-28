import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_address").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            user_id: 1,
            address_id: 1,
        },
        {
            user_id: 1,
            address_id: 2,
        },
        {
            user_id: 3,
            address_id: 3,
        },
        { 
            user_id: 2,
            address_id: 1,
        },
        {
            user_id: 2,
            address_id: 2,
        },
        



    ])
        .into("user_address")


}