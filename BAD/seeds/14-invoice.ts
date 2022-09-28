
import { Knex } from "knex";
// import { Role, Status, Address } from "../models";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("invoice").del();

        await knex
        .insert([

        {


            invoiceNumber: "100001",
            status_id: 4,
            user_id: 1,
            address_id: 1,
            totalPrice: "200",
  

        },
        {


            invoiceNumber: "100002",
            status_id: 5,
            user_id: 2,
            address_id: 2,
            totalPrice: "100",
  

        },
        {


            invoiceNumber: "100003",
            status_id: 5,
            user_id: 3,
            address_id: 2,
            totalPrice: "1000",
  

        }
    ])
    .into("invoice");

}