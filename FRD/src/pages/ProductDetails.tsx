import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import { Footer } from '../components/Footer'
import { DetailBox2 } from '../components/detailBox2'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


interface product {
		id: number,
		name: string,
		icon: string,
		image1: string,
		image2: string,
		image3: string,
		Brand: string,
	}


const ProductDetails: NextPage = () => {
	
	
	const [product, setProduct] = useState<product []>([])

	async function fetchProduct() {
		let res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailByproductId/${useParams}`
		)
		let product = (await res.json()).productDetailByproductId
		setProduct(product)
	}{}

	useEffect(()=>{
		fetchProduct()
	},[setProduct])



	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			{product.map((product) => (
			<DetailBox2
				key={product.id}
				id={product.id}
				name={product.name}
				icon={product.icon}
				image1={product.image1}
				image2={product.image2}
				image3={product.image3}
				Brand={product.Brand}
			/>
			))}

			<Footer />
		</>
	)
}

export default ProductDetails
