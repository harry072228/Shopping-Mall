import Link from 'next/link'
import Image from 'next/image'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import footer from '../styles/Footer.module.css'
import img from '../components/buySomeMall.png'
export function Footer() {
	return (
		<div>
			<div className={footer.background}>
				<div className={footer.logoLine}>
					<Image className={footer.footerLogo} src={img}
					width={250}
					height={100}/>

					<form className={footer.from}>
						<input
							className={footer.signUpText}
							type='text'
							id='last'
							name='last'
							placeholder='Enter Email Address'
						/>
						<button className={footer.signButton} type='submit'>
							Sign Up
						</button>
					</form>
					<p className={footer.address}>Contact Info</p>
					<p className={footer.address}>
						17 Princess Road, LONDON, gREATER london NW1 8JR,UK
					</p>
				</div>

				{/* <div className={footer.line}>
					<h3 className={footer.footertTitle}>Catagories</h3>
					<Link href='/login'>
						<a className={footer.link}>Laptops & Computers</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Carmeas & Photography</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Smart Phones & Tablets</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Video Games & Consoles</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Waterproof Headphones</a>
					</Link>
				</div>

				<div className={footer.line}>
					<h3 className={footer.footertTitle}>Customer Care</h3>
					<Link href='/login'>
						<a className={footer.link}>My Account</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Discount</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Returns</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Orders History</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Order Tracking</a>
					</Link>
				</div>

				<div className={footer.line}>
					<h3 className={footer.footertTitle}>Pages</h3>
					<Link href='/login'>
						<a className={footer.link}>Blog</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Browse the Shop</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Category</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Pre-Built Pages</a>
					</Link>
					<Link href='/login'>
						<a className={footer.link}>Visual Composer Elements</a>
					</Link>
				</div> */}
			</div>

			<div className={footer.bar}>
				<div>
					<p className={footer.webecy}>©Webecy - All Rights Reserved</p>
				</div>
				<div>
					<FacebookIcon />
					<InstagramIcon />
					<TwitterIcon />
				</div>
			</div>
		</div>
	)
}
