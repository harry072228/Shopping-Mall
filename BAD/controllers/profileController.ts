
import express from 'express'
import { logger } from '../logger'
import { form, isAdmin } from '../middleware'
import { ProfileService } from '../services/profileService'


export class ProfileController {
	constructor(private profileService: ProfileService) {}

	// -------------------------------------------------------------------------------------------------------------------
	// get User Info
	// -------------------------------------------------------------------------------------------------------------------
	userInfo = async (req: express.Request, res: express.Response) => {
		
		try {
			// const userId = req.user!.userId
			// console.log('userId:', userId);

			const userId = req.user!.userId
			
			const userInfo = await this.profileService.userInfo(userId)
			return res.json({
				result: true,
				msg: 'Get user profile success',
				userInfo: userInfo.user,
				addressInfo: userInfo.address
				
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Get user profile fail' })
		}
	}
	// -------------------------------------------------------------------------------------------------------------------
	// edit User Info
	// -------------------------------------------------------------------------------------------------------------------

	editUser = async (req: express.Request, res: express.Response) => {
		form.parse(req, async (err, fields, files) => {
			try {
				const userId = 1
				
				const userInfos = await this.profileService.userInfo(userId)
				let oldNickname = userInfos.user[0].nickname
				let oldIcon = userInfos.user[0].icon
				// console.log(userInfos);
				
				const newIcon =
					files.icon != null && !Array.isArray(files.icon)
						? files.icon.newFilename
						: oldIcon
				const newNickname =
					fields.nickname != null && !Array.isArray(fields.nickname)
						? fields.nickname
						: oldNickname

				const userInfo = await this.profileService.editUser(
					userId,
					newIcon,
					newNickname
				)
				return res.json({
					result: true,
					msg: 'Edit user profile success',
					userInfo
				})
			} catch (err) {
				logger.error(err)
				return res.json({
					result: false,
					msg: 'Edit user profile fail'
				})
			}
		})
	}
	// -------------------------------------------------------------------------------------------------------------------
	// delete User
	// -------------------------------------------------------------------------------------------------------------------

	deleteUser = async (req: express.Request, res: express.Response) => {
		
		try {
			const adminId = req.user!.userId
			let result = await this.profileService.userInfo(adminId)
			let deleteUserId = parseInt(req.params.id)
			if (isAdmin(result[0].role_id)) {
				await this.profileService.deleteUser(deleteUserId)
				return res.json({
					result: true,
					msg: 'delete user success'
				})
			} else {
				return res.json({ result: false, msg: 'you are not admin' })
			}
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'delete user fail' })
		}
	}
}
