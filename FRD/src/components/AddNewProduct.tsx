import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import create from '../styles/CreateProduct.module.css'
// import { useSelector } from 'react-redux';

// import { RootState } from './store';

export function AddProduct() {
	const { handleSubmit, register } = useForm()


	return (
		<div>
			<form 
				className={create.addProductDiv}
				onSubmit={handleSubmit(async (data) => {
					// console.log(data)
					// console.log(data.image1[0])

					const formData = new FormData()

					formData.append('name', data.name)
					formData.append('description', data.description)
					formData.append('image1', data.image1[0])
					formData.append('image2', data.image2[0])
					formData.append('image3', data.image3[0])
					formData.append('icon', data.icon[0])

					const res = await fetch(
						`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/product`,
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
				<div className={create.title}>Create New Product</div>
				<input
					className={create.input}
					type='text'
                    placeholder='Product Name'
					{...register('name', { required: true })}></input>
				<input
					className={create.input}
					type='text'
					placeholder='Description'
					{...register('description', { required: true })}></input>
				<div className={create.selectFile}>
					<input
						className={create.custom}
						type='file'
						id='input'
						{...register('icon', { required: true })}></input>
					<input
						className={create.custom1}
						type='file'
						{...register('image1', { required: true })}></input>
					<input
						className={create.custom2}
						type='file'
						{...register('image2', { required: true })}></input>
					<input
						className={create.custom3}
						type='file'
						{...register('image3', { required: true })}></input>
				</div>

				<input 
			
					className={create.input}
					type='submit'
					value='Submit'></input >
			</form>
		</div>
	)
}
