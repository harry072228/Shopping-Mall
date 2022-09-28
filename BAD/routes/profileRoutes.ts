import express from 'express'
import { ProfileController } from '../controllers/profileController'
import { userMiddleware } from '../middleware'

export function createProfileRoutes(profileController: ProfileController) {
  const profileRoutes = express.Router()

	profileRoutes.get('/userInfo',userMiddleware ,profileController.userInfo)
	profileRoutes.patch('/deleteUser/:id', userMiddleware, profileController.deleteUser)
	profileRoutes.patch('/editUser',profileController.editUser)
	

	return profileRoutes;
}