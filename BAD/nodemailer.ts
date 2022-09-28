import nodemailer from 'nodemailer'

// -------------------------------------------------------------------------------------------------------------------
// nodemailer sending receipt
// -------------------------------------------------------------------------------------------------------------------

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // upgrade later with STARTTLS
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD
	}
})