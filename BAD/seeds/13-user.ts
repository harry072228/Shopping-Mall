import { Knex } from "knex";
import { hashPassword } from "../hash";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user").del();
    
    let b = "$2a$10$2gKOYijOs8sl/Gt27mXXo.eL1DrLpeFFoYvEbqHsgReToP.xWBqdK" //await hashPassword('user');
    let c = "$2a$10$Jrjugzolh7gDkMdIbqjGf.KVX1LG3N7FgMTli.jemY7mh3hUcB.WW" //await hashPassword('vip');
    let d = "$2a$10$Tqgwr4gqyk8ZJVLCX2Vw3eeW7m4ic91ahsmHGIfYDmUfDBOhAKw5W" //await hashPassword('inactiveuser');

        await knex
        .insert([

        {

       
            username: "admin",
            password: (await hashPassword('admin')),
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            nickname: "adminTest",
            role_id: 1,
            status_id: 1,
            email:"1234@123.com"
            



        },
        {

            username: "user",
            password: b,
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            nickname: "userTest",
            role_id: 2,
            status_id: 1,
            email:"123"

        },
        {

            username: "vip",
            password: c,
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            nickname: "vipTest",
            role_id: 3,
            status_id: 1,
            email:"123"
        },
        {

            username: "Inactive User",
            password: d,
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            nickname: "Inactive User",
            role_id: 3,
            status_id: 2,
            email:"123"
        },
        {

            username: "Ken",
            password: d,
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            nickname: "Ken",
            role_id: 3,
            status_id: 1,
            email:"123"
        }
    ])
    .into("user");

}