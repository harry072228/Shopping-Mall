import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotion").del();

        await knex
        .insert([

        {


            name: "Discount 10%",
            status_id: 1,


        },
        {

            name: "Buy 2 Get 1 Free",
            status_id: 1,
        },
        {

            name: "Buy $1000 Get 1 Apple Watch",
            status_id: 1,
        }
    ])
    .into("promotion");

}