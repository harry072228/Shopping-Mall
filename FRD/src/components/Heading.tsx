import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import heading from '../styles/Heading.module.css'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { logOut } from '../redux/auth/action'
import { loadCart } from '../redux/cart/action'
import { Sidebar } from './SiderBar'

export function Heading() {
	const dispatch = useAppDispatch()
	// const [show, setShow] = useState(false); //react hook


	const carts = useAppSelector(state => state.cart.products)

	const [username, setUsername] = useState<string | null>(null)
	useEffect(() => {
		setUsername(
			typeof window !== 'undefined'
				? localStorage.getItem('username')!
				: null
		)
	}, [setUsername])
	
	useEffect(() => {
		dispatch(loadCart())
	}, [])
	const countCart = useMemo(() => {
		let count = carts.map((item) => Number(item.tc_number))
		.reduce((a, b) => a + b, 0)
		return count
	}, [carts])
	

	
	
		
	return (
		<>
		<div className={heading.color} >
			<div className={heading.center} >
				<PersonIcon className={heading.imageICon} />
					<div className={heading.a}>{username}</div>
			</div>
			<div className={heading.center}>
				
				{username == 'visitor'||undefined ? (
					<Link href='/login'>
						<button className={heading.a}>
							<LoginIcon className={heading.imageICon} />
							login
						</button>
					</Link>
				) : (
					<Link href='/login'>
						<button
							className={heading.a}
							onClick={() => dispatch(logOut())}>
							<LogoutIcon />
							logout
						</button>
					</Link>
				)}
				<div className={heading.cartDiv}>
					<Link href='/Cart'>
						<ShoppingCartIcon className={heading.imageICon} />
					</Link>
					<Link href='/Cart'>
					<div className={heading.cartNumber}>{countCart}</div>
					</Link>
				</div>
			</div>
			<div className={heading.sidebarButton}>
		 <Sidebar/> 
		</div>
		</div>

		</>
	)
}
