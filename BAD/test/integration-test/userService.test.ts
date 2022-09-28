import Knex from 'knex'
import { checkPassword } from '../../hash'
import { UserDuplicateEmailError, UserDuplicateUsernameError, UserMissingRegisterInfoError, UserNotExistError, UserPasswordMissMatchError, UserService, UserStatusError } from '../../services/userService'

const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.

describe('Integration test of userService', () => {
	let userService: UserService
	userService = new UserService(knex)

	beforeAll(async () => {
		return knex.migrate.rollback()
    .then(function() {
      return knex.migrate.latest();
    })
    .then(function() {
      return knex.seed.run();
    });
});

	afterAll(async () => {
		await knex.destroy()

	})


	it('can login', async () => {
		//Act
		const userRecord = await userService.login('admin', 'admin')

		//Assert
		expect(userRecord[0].username).toBe('admin')
		expect(await checkPassword('admin', userRecord[0].password)).toBe(true)
	})

    it('cannot login (UserNotExistError)', async () => {
		//Act
        try{
           await userService.login('sheep', 'admin')
		   fail('should throw UserNotExistError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(UserNotExistError)
        }
	})

    it('cannot login (UserPasswordMissMatchError)', async () => {
		//Act
        try{
            await userService.login('admin', 'admim')
			fail('should throw UserPasswordMissMatchError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(UserPasswordMissMatchError)
        }
	})

	it('cannot login (UserStatusError)', async () => {
		//Act
        try{
            await userService.login("Inactive User", "inactiveuser")
			fail('should throw UserStatusError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(UserStatusError)
        }
	})

	it('can register', async () => {
		//Act
		const registerRecord = await userService.register(
			'charles',
			'charles',
			'charles@gmail.com',
			'charles',
			1,
			1
		)

		//Assert
		expect(registerRecord).toBeTruthy()
	})

	it('cannot register (UserDuplicateUsernameError)', async () => {
		//Act
		try {
			await userService.register(
				'charles',
				'whatever',
				'charlie@gmail.com',
				'charlie',
				1,
				1
			)
			fail('should throw UserDuplicateUsernameError')
		} catch (err) {
			//Assert
			expect(err).toBeInstanceOf(UserDuplicateUsernameError)
		}
	})

    it('cannot register (UserDuplicateEmailError)', async () => {
		//Act
		try {
			await userService.register(
				'charlie',
				'whatever',
				'charles@gmail.com',
				'charlie',
				1,
				1
			)
			fail('should throw UserDuplicateEmailError')
		} catch (err) {
			//Assert
			expect(err).toBeInstanceOf(UserDuplicateEmailError)
		}
	})

    it('cannot register (User Missing username)', async () => {
		//Act
		try {
			await userService.register(
				'',
				'whatever',
				'ken@gmail.com',
				'charlie',
				1,
				1
			)
			fail('should throw UserMissingRegisterInfoError')
		} catch (err) {
			//Assert
			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
		}
	})

    it('cannot register (User Missing password)', async () => {
		//Act
		try {
			await userService.register(
				'ken',
				'',
				'ken@gmail.com',
				'ken',
				1,
				1
			)
			fail('should throw UserMissingRegisterInfoError')
		} catch (err) {
			//Assert
			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
		}
	})

    it('cannot register (User Missing email)', async () => {
		//Act
		try {
			await userService.register(
				'ken',
				'ken',
				'',
				'ken',
				1,
				1
			)
			fail('should throw UserMissingRegisterInfoError')
		} catch (err) {
			//Assert
			expect(err).toBeInstanceOf(UserMissingRegisterInfoError)
		}
	})
})
