import Image from 'next/image'
import img from '../pages/photo/AboutUs.png'
import detail from '../styles/detailBox.module.css'

interface Props {
	id: number
	name: string

}

export function ProductDetailName(props: Props) {
	return (

		
				<div>{props.name}</div>

	)
}
