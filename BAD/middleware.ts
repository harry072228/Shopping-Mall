// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from 'express'
import fs from 'fs'
import formidable from 'formidable'
import { knex } from "./knex";
import { Bearer } from 'permit'
import { uuid } from 'uuidv4';
import dotenv from "dotenv";
import './models'
// library for generating symmetric key for jwt

const { createSecretKey } = require('crypto');
// library for signing jwt
//const { SignJWT } = require('jose-node-cjs-runtime/jwt/sign');
import * as jose from 'jose'
import { InvoiceService } from './services/invoiceService';
import { Address, Role, Status } from './models';
import { logger } from './logger';
import Stripe from 'stripe';

dotenv.config();



const invoiceService = new InvoiceService(knex);

const permit = new Bearer({ query: 'access_token' })

export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: '2022-08-01'
})
// -------------------------------------------------------------------------------------------------------------------

//DEAD CODE// -------------------------------------------------------------------------------------------------------------------
export const invoiceMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {

		const userId = req.user!.userId

		const invoice = await invoiceService.getInvoiceByUserId(userId) //test after create invoice is done

		console.log("invoice:", invoice[0].id);

		if (invoice[0].status_id == Status.Paid) {
			const newInvoice = await invoiceService.createInvoice(Status.Unpaid, userId, Address.Default)
			console.log("newInvoice:", newInvoice);

			req.user = {
				userId: userId,
				invoiceId: newInvoice[0].id,
			}
			next()
		}
			
		
	} catch (err) {

		next()
	}
}

//DEAD CODE//// ^^^^^^^^^^^-------------------------------------------------------------------------------------------------------------------


export const userMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

	const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');
	// console.log(secretKey)
	const token = permit.check(req)
	try {
		const { payload } = await jose.jwtVerify(token, secretKey,
			{
				issuer: process.env.JWT_ISSUER!,
				audience: process.env.JWT_AUDIENCE!,
			})
		// console.log(payload)


		req.user = {
			userId: payload.userId as any,
			invoiceId: payload.invoiceId as any
		}
		// res.status(401).json({ token: token })

		next();

	} catch (e) {

		const newUser = await knex.insert({
			username: uuid(),
			password: '',
			email: '',
		}).into('user').returning('id')

		const userId = newUser[0].id

		const addressId = Address.Default
		const status_id = Status.Unpaid

		const invoice = await invoiceService.createInvoice(status_id, userId, addressId)


		const payload = {
			userId: userId,
			invoiceId: invoice[0].id,
		}
		req.user = {
			userId: userId,
			invoiceId: invoice[0].id,
		}

		const token = await new jose.SignJWT(payload) // details to  encode in the token
			.setProtectedHeader({ alg: 'HS256' }) // algorithm
			.setIssuedAt()
			.setIssuer(process.env.JWT_ISSUER!) // issuer
			.setAudience(process.env.JWT_AUDIENCE!) // audience
			.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
			.sign(secretKey); // secretKey generated from previous step

		// console.log(token)
		// res.header('X-C21-TOKEN', token);
		res.status(401).json({ username: "visitor", token: token })
		logger.info(`id: ${userId} visitor logged in`)

		// next()
	}
}


// class User extends AdminGroup {

// }

// req.session["user"] = {
// 	id: 1,

// 	check(functionID) : boolean {

// 	}
// }

// -------------------------------------------------------------------------------------------------------------------
// check if the user is Admin
// -------------------------------------------------------------------------------------------------------------------
export const isAdmin = (roleId: number) => {
	if (roleId == Role.Admin) {
		return true
	} else {
		return false
	}
}

// -------------------------------------------------------------------------------------------------------------------
// formidable (upload dir will be opened if it doesn't exist)
// -------------------------------------------------------------------------------------------------------------------

const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync('uploads', { recursive: true })
}

export const form = formidable({
	uploadDir: uploadDir,
	keepExtensions: true,
	multiples: true,
	maxFiles: 10,
	maxFileSize: 200 * 1024 * 1024, // 200MB
	maxTotalFileSize: 200 * 1024 * 1024, // 200MB
	
	filter: (part) => part.mimetype?.startsWith('image/') || false
})