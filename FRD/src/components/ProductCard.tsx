import card from '../styles/ProductCard.module.css'
import Image from 'next/image'
import { Link } from 'react-router-dom'
import { useRouter } from 'next/router'


interface Props {
	id: number
	name: string
	icon: string
}

export function ProductCard(props: Props) {
	const router = useRouter()
	const handleSubmit = (e: any) => {
		e.preventDefault()
		router.push(`/product/Details/${props.id}`)
	}
	return (
		<div className={card.cardBigBox} onClick={handleSubmit}>
			
			<Image
				src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
				width={200}
				height={200}
			/>
			<div>

			<div className={card.productName}>{props.name}</div>
			</div>
		</div>
	)
}
