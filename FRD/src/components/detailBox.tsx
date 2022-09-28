import Image from 'next/image'
import { useState } from 'react'
import img from '../pages/photo/AboutUs.png'
import photo from '../pages/photo/error.png'
import detail from '../styles/detailBox.module.css'

// const [tab,setTab] = useState(0)

// const [products, setProduct] = useState<Props[]>([])

async function fetchProduct() {
	let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productinfo/1`
	)
	let product = (await res.json()).allProductInfo
	// setProduct(product)
}{}


interface Props {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	price: any
}

export function DetailBox(props:Props) {
	return (
		<div className={detail.boxDiv}>
			<div className={detail.box}>
				<div className={detail.imageBox}>
					<Image src={props.image3}  width={200} height={200} />
					<Image src={props.image1} width={200} height={200} />
					<Image src={props.image2} width={200} height={200} />
				</div>
				<div>
					<Image src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`} width={300} height={600} />
				</div>
				<div>
					<div>{props.name}1</div>
					<div>{props.price}2</div>
					<form action='/send-data-here' method='post'>
						{<input type='radio'></input>}
						{<input type='radio'></input>}
						<button type='submit'>Add To Cart</button>
					</form>
				</div>
			</div>
		</div>
	)
}
