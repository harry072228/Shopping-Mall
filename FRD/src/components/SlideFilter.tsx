import Discount_offer from "./Discounr_offer";
import Product_Brand from "./Product_Brand";
import Category from "./Categories";
import Price_filter from "./Price_filter";
import css from '../styles/SlideFilter.module.css'

export default function SlideFilter() {
    return (
        <div className={css.slideFilter}>
            <Product_Brand />
            <Discount_offer />
            <Category />
            <Price_filter />
        </div>
    )
}