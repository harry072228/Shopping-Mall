import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("invoice_productDetail").del();

    // Inserts seed entries
    await knex
    
    .insert([
        {
            invoice_id: 1,
            productDetail_id: 1,
            number: 1,
            price: 100
        },
        {
            invoice_id: 1,
            productDetail_id: 2,
            number: 1,
            price: 100
        },
        {
            invoice_id: 1,
            productDetail_id: 2,
            number: 1,
            price: 0
        },
        {
            invoice_id: 1,
            productDetail_id: 2,
            number: 1,
            price: 100
        },
        {
            invoice_id: 2,
            productDetail_id: 3,
            number: 1,
            price: 100
        },
        {
            invoice_id: 2,
            productDetail_id: 3,
            number: 1,
            price: 100
        },
        {
            invoice_id: 1,
            productDetail_id: 3,
            number: 1,
            price: 100
        },
        {
            invoice_id: 1,
            productDetail_id: 3,
            number: 1,
            price: 100
        },
        {
            invoice_id: 1,
            productDetail_id: 2,
            number: 1,
            price: 100
        },
        
        

    ])
        .into("invoice_productDetail")


}