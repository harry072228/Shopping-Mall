import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries



    await knex
        .insert([

            {
                name: "Apple Watch",
                icon: "13.jpg",
                description: "Test",
                image1: "13.jpg",
                image2: "13.jpg",
                image3: "13.jpg",
                brand_id: 1,
            },
            {
                name: "hihi Watch",
                icon: "14.jpg",
                description: "Test",
                image1: "14.jpg",
                image2: "14.jpg",
                image3: "14.jpg",
                brand_id: 2,

            },
            {


                name: "ABC Watch",
                icon: "16.jpg",
                description: "Test",
                image1: "16.jpg",
                image2: "16.jpg",
                image3: "16.jpg",
                brand_id: 1,


            },

            {


                name: "Apple Watch",
                icon: "13.jpg",
                description: "Test",
                image1: "13.jpg",
                image2: "13.jpg",
                image3: "13.jpg",
                brand_id: 1,


            },

            {


                name: "Apple Watch",
                icon: "13.jpg",
                description: "Test",
                image1: "13.jpg",
                image2: "13.jpg",
                image3: "13.jpg",
                brand_id: 1,


            },

            {


                name: "Apple Watch",
                icon: "13.jpg",
                description: "Test",
                image1: "13.jpg",
                image2: "13.jpg",
                image3: "13.jpg",
                brand_id: 1,


            },
            {


                name: "Apple Watch",
                icon: "13.jpg",
                description: "Test",
                image1: "13.jpg",
                image2: "13.jpg",
                image3: "13.jpg",
                brand_id: 1,


            },

        ])
        .into("product");

}