import Image from 'next/image'
import invoice from '../styles/Invoice.module.css'

interface Props {
	id: number
	invoiceNumber: string
	status_id: string
	user_id: string
	address: string
	totalPrice: any
	product: string
	icon: string
	color: string
	size: string
	number: number
	single_price: number
}

export function Invoice(props: Props) {
	return (
		<div>
			<div className={invoice.centerLine}>
				<div className={invoice.lineGrey}></div>
			</div>

			<div className={invoice.invoiceColum}>
				<div>

				<Image
					src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
					width={200}
					height={200}
				/>
				</div>

				<div>
				<div className={invoice.text}>Product :{props.product}</div>
					<div className={invoice.text}>
						
						Price:{props.single_price}
					</div>
					<div className={invoice.text}>Color:{props.color}</div>
					<div className={invoice.text}>Size:{props.size}</div>
				</div>
			
			</div>
			
		</div>
	)
}
