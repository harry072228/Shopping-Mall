import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("brand").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
         
            name: "Apple",

        },
        {

            name: "Samsung",
        },
        {

            name: "Nokia",
        }
        

    ])
        .into("brand")


}