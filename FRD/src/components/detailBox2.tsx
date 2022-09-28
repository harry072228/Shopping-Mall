import Image from 'next/image'
import detail from '../styles/detailBox.module.css'




interface Props {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	Brand: string
}

export function DetailBox2(props: Props) {
	return (
		<div className={detail.detailBoxDiv}>
			<div className={detail.imageBox}>
				<div className={detail.photo}>
					<Image
						src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.image3}`}
						width={150}
						height={150}
					/>
				</div>
				<div className={detail.photo}>
					<Image
						src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.image1}`}
						width={150}
						height={150}
					/>
				</div>
				<div className={detail.photo}>
					<Image
						src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.image2}`}
						width={150}
						height={150}
					/>
				</div>
			</div>
			<div className={detail.bigPhoto}>
				<Image
					src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
					width={600}
					height={500}
				/>
			</div>

			<div className={detail.productNameBox}>
				<div className={detail.productName} >{props.name}</div>
			</div>
		</div>
	)
}
