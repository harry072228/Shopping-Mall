
import { InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import create from '../styles/CreateProduct.module.css'
import { AddColor } from './AddColor'
import { AddSize } from './AddSize'
// import { useSelector } from 'react-redux';

// import { RootState } from './store';

interface Color {
	id: number
	name: string
}
interface Size {
	id: number
	name: string
}

export function AddColumn() {
	const { handleSubmit, register } = useForm()
	const [colors, setColors] = useState<Color[]>([])

	async function fetchColorInfo() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/colorInfo`
		)
		let colors = (await res.json()).colorInfo
		setColors(colors)
	}

	const [sizes, setSizes] = useState<Size[]>([])

	async function fetchSizeInfo() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/sizeInfo`
		)
		let sizes = (await res.json()).sizeInfo
		setSizes(sizes)
	}


	useEffect(() => {
		fetchColorInfo()
	}, [setColors])


	useEffect(() => {
		fetchSizeInfo()
	}, [setSizes])

	return (
		<div>
			<form
				className={create.addProductDiv}
				onSubmit={handleSubmit(async (data) => {
					const formData = new FormData()

					formData.append('product_id', data.product_id)
					formData.append('color_id', data.color_id)
					formData.append('size_id', data.size_id)
					formData.append('price', data.price)
					formData.append('stock', data.stock)

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productdetail`,
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
				<div className={create.title}>Add the Color And Size</div>
				<input
					className={create.input}
					type='text'
					placeholder='Product ID'
					{...register('product_id', { required: true })}></input>
				<select
				    className={create.inputs}
					{...register('color_id', { required: true })}>
				{colors.map((colors:Color) => (		
					<AddColor
					key={colors.id}
					id={colors.id}
					name={colors.name}
					/>
				))}
				</select>
				<select
				    className={create.inputs}
					{...register('size_id', { required: true })}>
				{sizes.map((sizes:Size) => (		
					<AddSize
					key={sizes.id}
					id={sizes.id}
					name={sizes.name}
					/>
				))}
				</select>

				<input
					className={create.input}
					type='text'
					placeholder='Price'
					{...register('price', { required: true })}></input>
				<input
					className={create.input}
					type='text'
					placeholder='Stock'
					{...register('stock', { required: true })}></input>

				<input
					className={create.input}
					type='submit'
					value='Submit'></input>
			</form>
		</div>
	)
}
