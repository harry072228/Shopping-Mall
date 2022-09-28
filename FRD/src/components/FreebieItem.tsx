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

interface Props {
    
    product: string;
    icon: string;
    color: string;
    size: string;
    tc_number: number;
    tc_price: number;

}

export default function FreebieItem(props: Props) {

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
            <div className={cart.icon}> {props.tc_number}</div>
            </div>
            <div className={cart.icon}>${props.tc_price}</div>

        </div>
    )
}
