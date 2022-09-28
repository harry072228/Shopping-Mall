import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import create from '../../styles/CreateProduct.module.css'
import { SearchProductDetail } from '../../components/SerachProduct'
import { Heading } from '../../components/Heading'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { useForm } from 'react-hook-form'
import { Container } from '@mui/material'

interface keyword {
	keyword: string
}

interface searchProduct {
	product_id: number
	product_name: string
	icon: string
	color_name: string
    size_name: string
    price: number
    stock: number
}

const CreatePromotion: NextPage = () => {
	const [keyword, setkeyword] = useState<keyword['keyword']>('NOTAKEYWORD')
	const [product, setProduct] = useState<searchProduct[]>([])
    const { handleSubmit, register } = useForm()

	async function fetchSearchProduct(name: String) {
		const keyword = name

		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/AllProductDetail/?name=${keyword}`
		)
        
		let product = (await res.json()).AllProductDetail.AllProductDetail.rows
		console.log(product)
		setProduct(product)
	}

	useEffect(() => {
		fetchSearchProduct(keyword)
	}, [keyword])

	return (
		<>
			<Heading />
			<Navbar />
			<div className={create.pageBox}>
				<Container>
					<div>
						<h1 className={create.Title}>Promotion</h1>

						<span className={create.page}>Home. Pages.</span>
						<span className={create.nowPage}>Promotion</span>
					</div>
				</Container>
			</div>
            <div className={create.box}>
			<div className={create.searchBox}>
				<div className={create.title}>Serach Product</div>
				<input
					className={create.input}
					placeholder='Search Product'
					type='text'
					onChange={(e) => setkeyword(e.target.value)}
				/>
				{product.map((product: searchProduct) => (
					<SearchProductDetail
						key={product.product_id}
						id={product.product_id}
						icon={product.icon}
						name={product.product_name}
						color={product.color_name}
                        size={product.size_name}
                        price={product.price}
                        stock={product.stock}
					/>
				))}
			</div>

			<form
				className={create.addProductDiv}
				onSubmit={handleSubmit(async (data) => {
					// console.log(data)
					// console.log(data.image1[0])

					const formData = new FormData()

					formData.append('promotion_id', data.promotion_id)
					formData.append('productDetail_id', data.productDetail_id)
					formData.append('product_number', data.product_number)
					formData.append('freebie_id', data.freebie_id)
					formData.append('freebie_number', data.freebie_number)

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/promotionDetail`,
						{
							method: 'POST',
							credentials: 'include',
							body: formData
						}
					)
					if (res.status === 200) {
						alert('success')
					}
				})}>

                <div className={create.title}>Create New Promotion</div>
                <div className={create.titleDiv}>Promoition</div>
                <input
					className={create.inputs}
					type='number'
                    placeholder='Promotion ID'
					{...register('promotion_id', { required: true })}></input>
                     <div className={create.titleDiv}>Product ID</div>
                <input
					className={create.inputs}
					type='number'
                    placeholder='Product ID'
					{...register('productDetail_id', { required: true })}></input>
                     <div className={create.titleDiv}>Product Number</div>
                <input
					className={create.inputs}
					type='number'
                    placeholder='Product Number'
					{...register('product_number', { required: true })}></input>
                     <div className={create.titleDiv}>Freebie ID</div>
                <input
					className={create.inputs}
					type='number'
                    placeholder='FreeBie ID'
					{...register('freebie_id', { required: true })}></input>
                     <div className={create.titleDiv}>Freebie</div>
                <input
					className={create.inputs}
					type='number'
                    placeholder='FreeBie Number'
					{...register('freebie_number', { required: true })}></input>
                    

				<input
					className={create.input}
					type='submit'
					value='Submit'></input>
			</form>
            </div>

			<Footer />
		</>
	)
}

export default CreatePromotion
