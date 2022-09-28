import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("role").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { name: "Admin" },
        { name: "Normal User" },
        { name: "VIP" }
    ])
        .into("role")


}