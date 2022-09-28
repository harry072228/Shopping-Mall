import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("discount_role").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            role_id: 1,
            discount_id: 1,
        },
        {
            role_id: 1,
            discount_id: 2,
        },
        {
            role_id: 3,
            discount_id: 3,
        }
        



    ])
        .into("discount_role")


}