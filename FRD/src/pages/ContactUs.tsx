import { Container } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import contact from '../styles/ContactUs.module.css'
import contactPhoto from '../pages/photo/contact.png'

const ContactUs: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Heading />
			<Navbar />
			<div className={contact.pageBox}>
				<Container>
				<div>
					<h1 className={contact.Title}>Contact Us</h1>

					<span className={contact.page}>Home. Pages.</span>
					<span className={contact.nowPage}>
					Contact Us
					</span>
				</div>
				</Container>
			</div>

			<Container fixed>
				
					<div className={contact.contentBox}>
						<div className={contact.informationBox}>
							<h2 className={contact.informationTitle}>
								Information About us
							</h2>
							<p className={contact.informationContent}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Mattis neque ultrices mattis
								aliquam, malesuada diam est. Malesuada sem
								tristique amet erat vitae eget dolor lobortis.
								Accumsan faucibus vitae lobortis quis bibendum
								quam.
							</p>
						</div>
						<div className={contact.boxSize}>
							<h2 className={contact.contactTitle}>
								Contact Way
							</h2>

							<div className={contact.bubbleBox}>
								<div className={contact.bubblesBox}>
									<div className={contact.bubble1}></div>
									<p className={contact.work}>
										Tel: 877-67-88-99
										<br />
										E-Mail: shop@store.com
									</p>
								</div>
								<div className={contact.bubblesBox}>
									<div className={contact.bubble2}></div>
									<p className={contact.work}>
										Suppory Forum
										<br />
										For over 24hr
									</p>
								</div>
							</div>
							<div className={contact.bubbleBox}>
								<div className={contact.bubblesBox}>
									<div className={contact.bubble3}></div>
									<p className={contact.work}>
										20 Margaret st. London
										<br />
										Great Britain, 3NM98-LK
									</p>
								</div>
								<div className={contact.bubblesBox}>
									<div className={contact.bubble4}></div>
									<p className={contact.work}>
										Free standard shopping
										<br />
										on all orders.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className={contact.formBox}>
                        <div>
						<h2>Get In Touch</h2>
						<p className={contact.formWorks}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Mattis neque ultrices tristique amet erat
							vitae eget dolor los vitae lobortis quis bibendum
							quam.
						</p>

						<form className={contact.form}>
                            <div className={contact.nameAndEmail}>
							<input className={contact.nameText} type="text" id="name" placeholder='Your Name'/>
                            <input className={contact.emailText} type="text" id="email" placeholder='Your Email'/>
                            </div>
                            <input className={contact.subjectText} type="text" id="Subject" placeholder='Subject'/>
                            <textarea className={contact.messageText}  id="Type Your Messege" placeholder='Type Your Message'/>
                            <button className={contact.sendButton}  type="submit">Send Mail</button>
						</form>
                        </div>

                        <Image src={contactPhoto}/>
					</div>
				
			</Container>
			<Footer />
		</div>
	)
}

export default ContactUs
