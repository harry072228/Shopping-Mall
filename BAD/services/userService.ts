import { Knex } from 'knex'
import { checkPassword, hashPassword } from '../hash'
import { User } from '../models'

export class UserDuplicateUsernameError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, UserDuplicateUsernameError.prototype)
	}
}

export class UserDuplicateEmailError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, UserDuplicateEmailError.prototype)
	}
}

export class UserMissingRegisterInfoError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, UserMissingRegisterInfoError.prototype)
	}
}

export class UserNotExistError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, UserNotExistError.prototype)
	}
}

export class UserPasswordMissMatchError extends Error {
	constructor(msg?: string) {
		super(msg) //super is used to call the parent class constructor
		Object.setPrototypeOf(this, UserPasswordMissMatchError.prototype)
	}
}

export class UserStatusError extends Error {
	constructor(msg?: string) {
		super(msg) //super is used to call the parent class constructor
		Object.setPrototypeOf(this, UserStatusError.prototype)
	}
}

export class UserService {
	constructor(private knex: Knex) {}

	// -------------------------------------------------------------------------------------------------------------------
	// Register
	// -------------------------------------------------------------------------------------------------------------------

	async register(
		username: string,
		password: string,
		email: string,
		nickname: string,
		role_id: number,
		status_id: number
	) {
		// check username uniqueness
		{
			const userEmailRecord = await this.knex<User>('user')
				.select('*')
				.where('email', email)
			const userRecord = await this.knex<User>('user')
				.select('*')
				.where('username', username)
			// 'SELECT * FROM users where username=$1'
			// [username]

			if (userRecord.length > 0) {
				throw new UserDuplicateUsernameError()
			}

			if (userEmailRecord.length > 0) {
				throw new UserDuplicateEmailError()
			}

			if (!username || !password || !email) {
				throw new UserMissingRegisterInfoError()
			}
		}

		// insert user
		const newUser = await this.knex<User>('user')
		.insert({
			username: username,
			password: await hashPassword(password),
			email: email,
			nickname: nickname,
			role_id,
			status_id
		})
		.returning('*')

		
		// console.log(newUser);
		

		return newUser // return true if success

		// 'INSERT INTO users(username, password, created_at, updated_at) VALUES($1, $2, NOW(), NOW())',
		// [username, await hashPassword(password)]
	}

	// -------------------------------------------------------------------------------------------------------------------
	// Login
	// -------------------------------------------------------------------------------------------------------------------

	async login(username: string, password: string) {
		{
			// let result = await this.knex<User>(
			// 'SELECT * FROM users where username=$1',
			// [username]
			// )

			let result = this.knex<User>('user')
				.select('*')
				.where('username', username)

			const userRecord = await result

			if (userRecord.length === 0) {
				throw new UserNotExistError()
			}

			if (
				!(
					username === userRecord[0].username &&
					(await checkPassword(password, userRecord[0].password))
				)
			) {
				throw new UserPasswordMissMatchError()
			}
			if (userRecord[0].status_id != 1) {
				throw new UserStatusError()
			}
			return userRecord
		}
	}
}
