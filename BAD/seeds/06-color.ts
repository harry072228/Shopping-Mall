import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    

    await knex("color").del();

    // Inserts seed entries
    await knex

    .insert([
        { 
            name: "Red",
        },
        {
            name: "Blue",
        },
        {
            name: "Green",
        },
        {
            name: "Black",
        },
        {
            name: "White",
        },
        {
            name: "Purple",
        }



    ])
        .into("color")


}