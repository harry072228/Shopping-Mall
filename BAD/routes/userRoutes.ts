import express from 'express'
import { UserController } from '../controllers/userController'
// import {userMiddleware} from '../middleware'


export function createUserRoutes(userController: UserController) {
  const userRoutes = express.Router()

	userRoutes.post('/register', userController.register)
	userRoutes.post('/login', userController.login)
	userRoutes.post('/logout', userController.logout)
	// userRoutes.post('/forgot', userController.forgot)


	return userRoutes;
}