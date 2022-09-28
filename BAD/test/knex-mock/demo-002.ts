class Knex {}

let knex = function (tableName : string) {

    return {

        select: function(arg:string) {
            return this
        },

        where: function(arg:string, value:any) {
            return this
        },

        andWhere: function(arg:string, value:any) {
            return [{
                id: 1,
                invoiceNumber: 2,
                status_id: 3,
                user_id: 4,
                address_id: 5,
                totalPrice: 10,
            }]
        },
    }
}

interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    icon: string,
    nickname: string,
    status_id: number,
    role_id: number,
}

interface IMyUserService {
    getUserDetailByUserId: (userId : number) => Promise<User>
}

class MyUserService implements IMyUserService {
    constructor(private knex : Knex) {
    }

    getKnex() {
        return this.knex
    }

    getUserDetailByUserId = async (userId : number) : Promise<User> => {
        return new Promise((resolve, reject) => {
            resolve({
                id: 1,
                username: 'username',
                password: 'password',
                email: 'email',
                icon: 'icon',
                nickname: 'nickname',
                status_id: 1,
                role_id: 1,
            })
        })
    }
}

const myUserService = new MyUserService(knex)

class MyController {
    constructor(private myUserService: MyUserService) {}

    getUserDetailByUserId = async (req : any, res : any) => {
        const userId = req.params.id
        const user = await this.myUserService.getUserDetailByUserId(userId)
        res.send(user)
    }
}