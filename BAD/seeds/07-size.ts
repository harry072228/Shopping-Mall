import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("size").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            name: "S",
        },
        { 
            name: "MS",
        },
        {
            name: "M",
        },
        {
            name: "ML",
        },
        {
            name: "L",
        },
        {
            name: "LL",
        },
        {
            name: "XL",
        },



    ])
        .into("size")


}