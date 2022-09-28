import { NextPage } from 'next'
import { Navbar } from '../../../components/Navbar'
import { HeadTitle } from '../../../components/HeadTitle'
import { Heading } from '../../../components/Heading'
import { Footer } from '../../../components/Footer'
import { DetailBox2 } from '../../../components/detailBox2'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { AddToCart } from '../../../components/AddToCart'
// import { useAppSelector } from '../../../store'
import detail from '../../../styles/detailBox.module.css'

import { fetchAddToCart } from '../../../redux/cart/action'
import { useAppDispatch } from '../../../store'
import { SelectColor } from '../../../components/SelectColor'
import React from 'react'
import { Container, FormControl, FormLabel, RadioGroup } from '@mui/material'

interface product {
	id: number
	name: string
	icon: string
	image1: string
	image2: string
	image3: string
	Brand: string
}

interface productColor {
	name: string
}

interface productSize {
	name: string
}

const ProductDetails: NextPage = () => {
	const router = useRouter()
	const { id } = router.query

	const query = String(router.query.id)
	const ID = Number(query)
	// const carts = useAppSelector(state => state.cart.productIds)

	const [product, setProduct] = useState<product[]>([])

	// const [addCart, setAddCart] = useState<addCart[]>([])
	const [productColor, setProductColor] = useState<productColor[]>([])
	const [productSize, setProductSize] = useState<productSize[]>([])

	const [productDetailColor, setProductDetailColor] = useState<String>('')
	const [productDetailSize, setProductDetailSize] = useState<String>('')

	const [productDetailPrice, setProductDetailPrice] = useState<String>('')
	const [productDetailStock, setProductDetailStock] = useState<String>('')
	const [productDetailId, setProductDetailId] = useState<Number>()

	const dispatch = useAppDispatch()

	async function fetchProduct() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailInfo/${ID}`
		)
		let product = (await res.json()).productInfo.productInfo
		setProduct(product)
	}

	async function fetchProductColorAndSize() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailByproductId/${id}` //Here
		)
		let ColorAndSize = (await res.json()).productDetail
		let productColor = ColorAndSize.thisProductAllColors
		let productSize = ColorAndSize.thisProductAllSizes

		setProductColor(productColor)
		setProductSize(productSize)
		console.log(productColor)
		console.log(productSize)
	}

	async function GetProdutPriceAndStock(
		id: number,
		productDetailColor: String,
		productDetailSize: String
	) {
		const Product_id = id
		const color = productDetailColor
		const size = productDetailSize

		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productDetailByColorAndSize/?id=${Product_id}&color=${color}&size=${size}`
		)
		let ProductPriceAndStock = await res.json()

		const productDetailId = ProductPriceAndStock.productDetailId
		const productDetailPrice = ProductPriceAndStock.productPrice
		const productDetailStock = ProductPriceAndStock.productStock

		// console.log(productDetailId);

		setProductDetailId(productDetailId)
		setProductDetailPrice(productDetailPrice)
		setProductDetailStock(productDetailStock)
	}

	useEffect(() => {
		if (router.isReady) {
			fetchProduct()
		}
	}, [setProduct, router.isReady])

	useEffect(() => {
		if (router.isReady) {
			fetchProductColorAndSize()
		}
	}, [setProductColor, setProductSize, router.isReady])

	// useEffect(() => {
	// 	const query = String(router.query.id)
	// 	const id = Number(query)

	// 	GetProdutPriceAndStock(id,productDetailColor, productDetailSize)

	// }, [productDetailColor])

	useEffect(() => {
		const query = String(router.query.id)
		const id = Number(query)

		GetProdutPriceAndStock(id, productDetailColor, productDetailSize)
	}, [productDetailSize, productDetailColor])

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />
			<div className={detail.pageBox}>
				<Container>
					<div>
						<h1 className={detail.Title}>Product Detail</h1>

						<span className={detail.page}>Home. Pages.</span>
						<span className={detail.nowPage}>Product Detail</span>
					</div>
				</Container>
			</div>

			<div className={detail.boxDiv}>
				<div className={detail.box}>
					{product.map((product) => (
						<DetailBox2
							key={product.id}
							id={product.id}
							name=''
							icon={product.icon}
							image1={product.image1}
							image2={product.image2}
							image3={product.image3}
							Brand={product.Brand}
						/>
					))}

					<div className={detail.formBox}>
						{product.map((product, index) => (
							<div key={index} className={detail.productName}>{product.name}</div>
						))}
						<FormControl>
							<FormLabel id='demo-radio-buttons-group-label'>
								Color
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby='demo-radio-buttons-group-label'
								name='radio-buttons-group'
								value={productDetailColor}
								onChange={(e) => {
									setProductDetailColor(e.target.value)
								}}>
								{productColor.map((productColor, index) => (
									
									<SelectColor key={index} name={productColor.name} />
								))}
							</RadioGroup>
						</FormControl>

						<FormControl>
							<FormLabel id='demo-radio-buttons-group-label'>
								Size
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby='demo-radio-buttons-group-label'
								name='radio-buttons-group'
								value={productDetailSize}
								onChange={(e) => {
									setProductDetailSize(e.target.value)
								}}>
								{productSize.map((productSize, index) => (
									<SelectColor key={index}  name={productSize.name} />
								))}
							</RadioGroup>
						</FormControl>
						<div className={detail.priceStockBox}>
							<div className={detail.priceStock}>
								${productDetailPrice}
							</div>
							<div className={detail.priceStock}>
								Stock:{productDetailStock}
							</div>
						</div>
						<button
							className={detail.addButton}
							type='submit'
							onClick={(e) => {
								e.preventDefault()
								dispatch(
									fetchAddToCart(Number(productDetailId))
								)
							}}>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default ProductDetails
