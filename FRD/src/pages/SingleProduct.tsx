import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { HeadTitle } from '../components/HeadTitle'
import { Heading } from '../components/Heading'
import ProductImages from '../components/ProductImage'


const SingleProduct: NextPage = () => {

    let images: string[] | undefined

    return (
        <>
        <HeadTitle />
		<Heading />
		<Navbar />
        <div className='product-center'>
            <ProductImages images={images} />
        </div>

        
        </>
    )




}

export default SingleProduct