import { NextPage } from 'next'
import { Navbar } from '../../components/Navbar'
import { HeadTitle } from '../../components/HeadTitle'
import { Heading } from '../../components/Heading'
import { Footer } from '../../components/Footer'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EditUserProfileForm from '../../components/EditUserProfileForm'
import { userInfo } from 'os'
import { UserBox } from '../../components/userBox'
import user from '../../styles/User.module.css'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Container } from '@mui/material'

interface User {
	icon: string
	nickname: string
}

const UserInformation: NextPage = () => {
	const [userInfos, setUserInfos] = useState<User[]>([])

	async function fetchUser() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userinfo`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}
		)

		const user = await res.json()

		const userinfo = user.userInfo

		// const userAddressInfo = user.addressInfo.rows

		setUserInfos(userinfo)
		console.log(userinfo)
		// console.log(userAddressInfo);
	}

	useEffect(() => {
		fetchUser()
	}, [setUserInfos])

	const { handleSubmit, register } = useForm()

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			<div className={user.pageBox}>
				<Container>
					<div>
						<h1 className={user.Title}>Profile</h1>

						<span className={user.page}>Home. Pages.</span>
						<span className={user.nowPage}>Profile</span>
					</div>
				</Container>
			</div>
			
			<div className={user.box}>
				<div className={user.div}>
					{userInfos.map((userInfos, index) => (
						<UserBox
							key={index}
							name={userInfos.nickname}
							icon={userInfos.icon}
						/>
					))}

					<form
						className={user.form}
						onSubmit={handleSubmit(async (data) => {
							const formData = new FormData()

							formData.append('nickname', data.nickname)
							formData.append('icon', data.icon[0])
							// formData.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

							const res = await fetch(
								`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/editUser`,
								{
									method: 'PATCH',
									// headers: header.headers,
									// credentials: 'include',
									body: formData
								}
							)
							if (res.status === 200) {
								alert('success')
							}
						})}>
						<input className={user.custom} type='file' {...register('icon')} />
						<input className={user.text}
							type='text'
							placeholder='nickname'
							{...register('nickname')}
						/>

						<input className={user.submit} type='submit' value='Submit'></input>
					</form>
				</div>
			</div>

			<Footer />
		</>
	)
}

export default UserInformation
