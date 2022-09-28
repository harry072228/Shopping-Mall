import express from 'express'
import { logger } from '../logger'
import dotenv from "dotenv";
import {
	UserDuplicateEmailError,
	UserDuplicateUsernameError,
	UserMissingRegisterInfoError,
	UserNotExistError,
	UserPasswordMissMatchError,
	UserService,
	UserStatusError
} from '../services/userService'
import { InvoiceService } from '../services/invoiceService'
import { createSecretKey } from 'node:crypto';
import * as jose from 'jose'
import { Address, Role, Status } from '../models';

dotenv.config();
export class UserController {
	constructor(
		private userService: UserService,
		private invoiceService: InvoiceService
	) { }

	register = async (req: express.Request, res: express.Response) => {

		// const secretKey = createSecretKey(process.env.JWT_SECRET!, 'utf-8');
		try {
			// console.log("body:", req.body);

			let username = req.body.username?.trim()
			let password = req.body.password?.trim()
			let email = req.body.email?.trim()
			let nickname = req.body.nickname?.trim()


			//should be database get id
			let role_id = Role.NormalUser
			let status_id = Status.Active
			const addressId = Address.Default

			const newUser = await this.userService.register(
				username,
				password,
				email,
				nickname,
				role_id,
				status_id
			)
			// console.log("newUser:", newUser);

			const invoiceStatusId = Status.Unpaid


			const invoice = await this.invoiceService.createInvoice(invoiceStatusId, newUser[0].id, addressId)

			// console.log("invoice:", invoice);


			req.user = {
				userId: newUser[0].id,
				invoiceId: invoice[0].id,
			}

			// const payload = {
			// 	userId: newUser[0].id,
			// 	invoiceId: invoice[0].id,
			// }
			// const token = await new jose.SignJWT(payload) // details to  encode in the token
			// 	.setProtectedHeader({ alg: 'HS256' }) // algorithm
			// 	.setIssuedAt()
			// 	.setIssuer(process.env.JWT_ISSUER!) // issuer
			// 	.setAudience(process.env.JWT_AUDIENCE!) // audience
			// 	.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
			// 	.sign(secretKey); // secretKey generated from previous step

			// console.log(token)
			//jwt header
			// res.header('X-C21-TOKEN', token);

			return res.status(401).json({ result: true, msg: 'register success' })

		} catch (err) {
			if (err instanceof UserDuplicateUsernameError) {
				return res
					.status(500)
					.json({ result: false, msg: 'username already exists' })
			}

			if (err instanceof UserDuplicateEmailError) {
				return res
					.status(500)
					.json({ result: false, msg: 'email already exists' })
			}

			if (err instanceof UserMissingRegisterInfoError) {
				return res
					.status(500)
					.json({ result: false, msg: 'missing register info' })
			}

			logger.error(err)
			res.status(500).json({ result: false, msg: 'register error' })

			return //ask tutor about this
		}
	}

	login = async (req: express.Request, res: express.Response) => {
		try {


			// const status_id = 4


			const username = req.body.username.trim()
			const password = req.body.password.trim()
			console.log("username:", username);
			console.log("password:", password);





			const user = await this.userService.login(username, password)
			console.log("user:", user);
			console.log("user[0].id:", user[0].id);


			const invoice = await this.invoiceService.getInvoiceByUserId(user[0].id) //test after create invoice is done

			console.log("invoice:", invoice[0].id);


			if (invoice[0].status_id == Status.Paid) {
				const newInvoice = await this.invoiceService.createInvoice(Status.Unpaid, user[0].id, Address.Default)
				console.log("newInvoice:", newInvoice);

				req.user = {
					userId: user[0].id,
					invoiceId: newInvoice[0].id,
				}
				const secretKey = createSecretKey(process.env.JWT_SECRET!, 'utf-8');

				const payload = {
					userId: user[0].id,
					invoiceId: newInvoice[0].id,
				}

				const token = await new jose.SignJWT(payload) // details to  encode in the token
					.setProtectedHeader({ alg: 'HS256' }) // algorithm
					.setIssuedAt()
					.setIssuer(process.env.JWT_ISSUER!) // issuer
					.setAudience(process.env.JWT_AUDIENCE!) // audience
					.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
					.sign(secretKey); // secretKey generated from previous step

				res.json({
					result: true,
					msg: 'login success',
					user: user[0],
					invoice: invoice[0] != null ? invoice[0] : null,
					token: token
					// //jwt session

					// token: jwtSimple.encode({
					// }, process.env.JWT_SECRET!)
				})
				logger.info(`${username} logged in`)
			} else {
				req.user = {
					userId: user[0].id,
					invoiceId: invoice[0].id,
				}

				const secretKey = createSecretKey(process.env.JWT_SECRET!, 'utf-8');

				const payload = {
					userId: user[0].id,
					invoiceId: invoice[0].id,
				}

				const token = await new jose.SignJWT(payload) // details to  encode in the token
					.setProtectedHeader({ alg: 'HS256' }) // algorithm
					.setIssuedAt()
					.setIssuer(process.env.JWT_ISSUER!) // issuer
					.setAudience(process.env.JWT_AUDIENCE!) // audience
					.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
					.sign(secretKey); // secretKey generated from previous step


				res.json({
					result: true,
					msg: 'login success',
					user: user[0],
					invoice: invoice[0] != null ? invoice[0] : null,
					token: token
					// //jwt session

					// token: jwtSimple.encode({
					// }, process.env.JWT_SECRET!)
				})
				logger.info(`${username} logged in`)
			}
				return

			} catch (err) {
				if (err instanceof UserNotExistError) {
					return res
						.status(500)
						.json({ result: false, msg: 'username not exist' })
				}

				if (err instanceof UserPasswordMissMatchError) {
					return res
						.status(500)
						.json({ result: false, msg: 'password miss match' })
				}

				if (err instanceof UserStatusError) {
					return res
						.status(500)
						.json({ result: false, msg: 'The user is not active' })
				}

				logger.error(err)
				res.status(500).json({ result: false, msg: 'login error' })
				return //ask tutor about this
			}
		}

	logout = async (req: express.Request, res: express.Response) => {
			try {
				req.user = {
					userId: 0,
					invoiceId: 0,
				}
				res.json({ result: true, msg: 'logout success' })
				logger.info(`${req.session['user'].username} logged out`)
			} catch (err) {
				logger.error(err)
				res.status(500).json({ result: false, msg: 'logout Error' })
				return
			}
		}
	}
