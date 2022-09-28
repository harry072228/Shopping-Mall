import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'

import { Container } from '@mui/system'

import ProductList from '../components/ProductList'
import product from '../styles/Product.module.css'
import { useEffect, useState } from 'react'

import ReactPaginate from 'react-paginate'


interface items {

    id: number
	name: string
	description: string
	icon: string
	image1: string
	image2: string
	image3: string
	status_id: number
	brand_id: number
	created_at: string
	updated_at: string

}
interface currentItems {
	id: number
	name: string
	description: string
	icon: string
	image1: string
	image2: string
	image3: string
	status_id: number
	brand_id: number
	created_at: string
	updated_at: string
}

const ProductPage: NextPage = () => {
	const [items, setItems] = useState<items[]>([])

	async function fetchProduct() {
		let res = await fetch(
			`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`
		)
		let items = (await res.json()).allProductInfo

        setItems(items)
        
        console.log(items);
        
	}

    useEffect(() => {
		fetchProduct()
	}, [setItems])

	const [currentItems, setCurrentItems] = useState<currentItems[]>([])

	const [pageCount, setPageCount] = useState(0)

	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + 5
		console.log(`Loading items from ${itemOffset} to ${endOffset}`)
		let currentItems = items.slice(itemOffset, endOffset)

        console.log(currentItems);
    
        

		setCurrentItems(currentItems)
		setPageCount(Math.ceil(items.length / 5))
	}, [itemOffset,items])

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * 5) % items.length
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		)
		setItemOffset(newOffset)
	}

	return (
		<>
			<HeadTitle />
			<Heading />
			<Navbar />

			<div className={product.pageBox}>
				<Container>
					<div>
						<h1 className={product.Title}>Product</h1>

						<span className={product.page}>Home. Pages.</span>
						<span className={product.nowPage}>Product</span>
					</div>
				</Container>
			</div>
			<Container>
			{/* <Items currentItems={currentItems} itemsPerPage={3} /> */}
            {currentItems.map((product) => (
					<ProductList
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.description}
						icon={product.icon}
					/>
				))}
			<ReactPaginate
			 className={product.pagination}
				breakLabel='...'
				nextLabel='next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
// 				previousLabel='< previous'
// 				containerClassName={'pagination'}
// 				pageClassName={'page-item'}
// pageLinkClassName={'page-link'}
// nextClassName={'page-item'}
// nextLinkClassName={'page-link'}
				//   renderOnZeroPageCount={null}
			/>
				
			
			</Container>
		</>
	)
}

export default ProductPage
