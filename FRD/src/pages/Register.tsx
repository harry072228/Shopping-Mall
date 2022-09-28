import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'
import { Heading } from '../components/Heading'
import { Navbar } from '../components/Navbar'
import loginStyles from '../styles/Login.module.css'
import { Container } from '@mui/material'

const Register: NextPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [nickname, setNickname] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	// interface registerForm {
	// 	username: String
	// 	password: String
	// 	email: String
	// 	nickName: String
	// }

	return (
		<div>
			<Heading />
			<Navbar />
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={loginStyles.pageBox}>
				<Container>
					<div>
						<h1 className={loginStyles.Title}>Register</h1>

						<span className={loginStyles.page}>Home. Pages.</span>
						<span className={loginStyles.nowPage}>Register</span>
					</div>
				</Container>
			</div>
			<div className={loginStyles.loginBox}>
				<form
					className={loginStyles.loginForm}
					action='/send-data-here'
					method='post'
					onSubmit={async (e) => {
						e.preventDefault()
						const res = await fetch(
							`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/register`,
							{
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({
									username,
									password,
									email,
									nickname
								})
							}
						)
						if (res.status === 200) {
							router.push('/login')
						} else if (res.status === 401) {
							router.push('/login')
						} else if (res.status === 500) {
							setError('! Name or Email already exists !')
						}
					}}>
				
					<div className={loginStyles.loginWork}>Register</div>
					<div className={loginStyles.loginCommet}>
						Create your Account
					</div>
					<input
						className={loginStyles.textBox}
						type='text'
						id='username'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
					/>
					<input
						className={loginStyles.textBox}
						type='text'
						id='last'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<input
						className={loginStyles.textBox}
						type='text'
						id='last'
						value={email}
						placeholder='EmailAddress'
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<input
						className={loginStyles.textBox}
						type='text'
						id='last'
						placeholder='Nickname'
						value={nickname}
						onChange={(e) => setNickname(e.currentTarget.value)}
					/>

<div className={loginStyles.error}>{error}</div>
					<button className={loginStyles.button} type='submit'>
						Regis
					</button>
					<Link href='/login'>
						<p className={loginStyles.regiseterCommet}>
							Have Account ? Sign in account
						</p>
					</Link>
				</form>
			</div>
			<Footer />
		</div>
	)
}

export default Register