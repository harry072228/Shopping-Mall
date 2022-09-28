import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("discount").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 

            name: "10%OFF",
            value: 0.9
        },
        {

            name: "50%OFF",
            value: 0.5
        },
        {

            name: "20%OFF",
            value: 0.8
        }

    ])
        .into("discount")


}