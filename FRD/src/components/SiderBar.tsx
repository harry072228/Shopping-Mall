import Link from 'next/link'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import sidebar from '../styles/Sidebar.module.css'
import img from '../components/buySomeMall.png'
import AddBoxIcon from '@mui/icons-material/AddBox'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CancelIcon from '@mui/icons-material/Cancel'
import { useEffect, useState } from 'react'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { useAppDispatch, useAppSelector } from '../store'



export function Sidebar() {
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

const [show, setShow] = useState(false); //react hook
	return (
        <>
        <div className={sidebar.main}>
        <DensitySmallIcon onClick={()=>{setShow(true)}} />
        </div>

		
	{show &&<div className={sidebar.bar}>
				<div className={sidebar.clickPage}>
				<CancelIcon className={sidebar.cross} onClick={()=>{setShow(false)}} />

				<div className={sidebar.page}>
					{username == 'admin'?<Link href='/CreateProduct'>
						<a className={sidebar.pages}>
							<AddBoxIcon />
							Create Product
						</a>
					</Link> : <div></div>}

					{username == 'visitor'?<Link href='/login'>
					<a className={sidebar.pages}>
							<SettingsAccessibilityIcon />
							Profile
						</a>
					</Link> :<Link href='/user/me'>
						<a className={sidebar.pages}>
							<SettingsAccessibilityIcon />
							Profile
						</a>
					</Link>}

					<Link href='/InvoicePage'>
						<a className={sidebar.pages}>
							<ReceiptIcon />
							Invoice
						</a>
					</Link>

					{username == 'admin'?<Link href='/product/CreatePromotion'>
						<a className={sidebar.pages}>
							<CardGiftcardIcon />
							CreatePromotion
						</a>
					</Link>:<div></div>}
				</div>
			</div>
		</div>}
        </>
	)
}
