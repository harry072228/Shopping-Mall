import Knex from 'knex'
import { ProfileService } from '../../services/profileService'
const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.

jest.mock('../../middleware')
import { isAdmin } from '../../middleware'


describe('Integration test of profileService', () => {
	let profileService: ProfileService
	profileService = new ProfileService(knex)

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


    it('gets user information', async () => {
		//Act
		const userRecord = await profileService.userInfo(1)
		
		//Assert
		expect(userRecord.user[0].id).toBe(1)
		expect(userRecord.user[0].username).toBe('admin')

		expect(userRecord.user[0].nickname).toBe('adminTest')
		expect(userRecord.address.rowCount).toBe(2);
	})


    it('can edit user information', async () => {
		//Act
		const userRecord = await profileService.editUser(1, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE', '抄屎')

		//Assert
		expect(userRecord[0].nickname).toBe('抄屎')
		expect(userRecord[0].icon).toBe('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE')
	})

    it('can delete user', async () => {
        //Arrange
        jest.fn (isAdmin).mockReturnValue(true)
		//Act
		const result = await profileService.deleteUser(3)

		//Assert
		expect(result).toBeTruthy();
	})
})

