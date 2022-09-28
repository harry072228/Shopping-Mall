import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("address").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 

            name: "123 Main St",


        },
        {

            name: "456 Main St",


        },
        {

            name: "789 Main St",

            
        }



    ])
        .into("address")


}