import cart from '../styles/Cart.module.css'
import Image from 'next/image'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { useAppDispatch } from '../store'
import Link from 'next/link'

import { withRouter, NextRouter } from 'next/router'
import React from 'react'
import { ProductInCart } from '../redux/cart/state'

interface Props extends Omit
	<ProductInCart, 'id' | 'number' | 'product_price'> {
	onMinusFromCart: () => void;
	onRemoveFromCart: () => void;
	onAddToCart: () => void;
}

export default function CartItem(props: Props) {

	return (
		<div className={cart.cartBox}>
			<Image
				src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
				width={100}
				height={100}
			/>
			<div className={cart.icon}>{props.product}</div>
			<div className={cart.icon}> {props.color}</div>
			<div className={cart.icon}> {props.size}</div>
			<div className={cart.icon}>
				<button className={cart.button}>
					<RemoveCircleIcon onClick={props.onMinusFromCart} />
				</button>
				<div className={cart.icon}> {props.tc_number}</div>
				<button className={cart.button}>
					<AddCircleIcon onClick={props.onAddToCart} />
				</button>
			</div>
			<div className={cart.icon}>${props.tc_price}</div>
			<button className={cart.button}>
				<CancelIcon onClick={props.onRemoveFromCart} />
			</button>
		</div>
	)
}
