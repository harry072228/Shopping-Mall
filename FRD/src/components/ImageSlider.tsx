import { useState } from 'react'
import { dataSlider } from './DataSlider'
import Slides from '../styles/Slide.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const ImageSlider = ({ slides }: {
    slides: {
        image: string;
        title: string;
    }[]
}) => {
    const [current, setCurrent] = useState(0)
    const length = slides.length

    const nextBanner = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }



    const backBanner = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }


    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className={Slides.slideBox}>
            <ArrowLeftIcon className={Slides.left} onClick={backBanner}></ArrowLeftIcon>

            <ArrowRightIcon className={Slides.right} onClick={nextBanner}></ArrowRightIcon>
            {dataSlider.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img className={Slides.slide} src={slide.image} />)}

                    </div>
                )
            })}
        </section>
    )
}

export default ImageSlider
