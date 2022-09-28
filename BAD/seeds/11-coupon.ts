import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("coupon").del();

        await knex
        .insert([

        {


            name: "10% off",
            status_id: 1,
            totalNumberOfCoupon: 10,
            

        },
        {

            name: "20% off",
            status_id: 1,
            totalNumberOfCoupon: 10,
            
        },
        {

            name: "30% off",
            status_id: 1,
            totalNumberOfCoupon: 10,
            
        }
    ])
    .into("coupon");

}