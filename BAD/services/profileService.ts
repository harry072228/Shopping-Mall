import { Knex } from 'knex'
import { User } from '../models'

export class ProfileService {
	constructor(private knex: Knex) {}

	// -------------------------------------------------------------------------------------------------------------------
	// get User Info
	// -------------------------------------------------------------------------------------------------------------------
	async userInfo(userId: number) {
		// check username uniqueness
		{
			const userRecord = await this.knex<User>('user')
				.select('*')
				.where('id', userId)
			// 'SELECT * FROM users where username=$1'
			// [username]

			const addressRecord = await this.knex
			.raw(`select * from address
			where id in (
			select address_id from user_address where user_id = ?)`, [userId])

			return {user:userRecord, address: addressRecord}
		}
	}
	// -------------------------------------------------------------------------------------------------------------------
	// edit User Info
	// -------------------------------------------------------------------------------------------------------------------
    async editUser(userId: number, newIcon:string, newNickname:string) {
		// check username uniqueness
		{
			const userRecord = await this.knex<User>('user')
				.update({icon: newIcon, nickname: newNickname})
				.where('id', userId).returning('*')

			return userRecord
		}
	}
	// -------------------------------------------------------------------------------------------------------------------
	// delete user
	// -------------------------------------------------------------------------------------------------------------------
	async deleteUser(userId: number) {
		// check username uniqueness
		{
			await this.knex<User>('user')
				.update('status_id', 2)
				.where('id', userId)

			return true;
		}
	}

}
