import { Knex } from 'knex'
import { User } from './models'


export class ProfileService {
    constructor(private knex: Knex) { }
    async checkSeedUser() {
        // check username uniqueness
        {
            const userRecord = await this.knex<User>('user')
                .select('*')
                .where('id', '1')

            return 
        }
    }
}