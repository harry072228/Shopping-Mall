import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries

    await knex("productDetail").del();

    // Inserts seed entries
    await knex

    .insert([
        { 
            product_id: 1,
            color_id: 1,
            size_id: 1,
            price: 200,
            stock: 1222,
            status_id: 1,
        },
        { 
            product_id: 3,
            color_id: 1,
            size_id: 1,
            price: 200,
            stock: 1222,
            status_id: 1,
        },
        { 
            product_id: 1,
            color_id: 2,
            size_id: 2,
            price: 400,
            stock: 1222,
            status_id: 1,
        },
    ]).into('productDetail');
    }


