import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { Footer } from '../../components/Footer'
import { Heading } from '../../components/Heading'
import { HeadTitle } from '../../components/HeadTitle'
import { Navbar } from '../../components/Navbar'
import ProductList from '../../components/ProductList'


// import {PaginatedItems} from '../../components/user/pagination'


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

const Pagination: NextPage = () => {
	
// const [items, setItems] = useState<currentItems[]>([])
	// function Items({ currentItems }: Props) {
	//     return (
	//         <>
	//             {currentItems &&
	//                 currentItems.map((item: any) => (
	//                     <div>
	//                         <h3>Item #{item}</h3>
	//                     </div>
	//                 ))}
	//         </>
	//     )
	// }

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
				breakLabel='...'
				nextLabel='next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel='< previous'
				//   renderOnZeroPageCount={null}
			/>

			

			<Navbar />
			<Footer />
		</>
	)
}

export default Pagination
