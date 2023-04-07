import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ComponentVisbilityProps } from "../../../hooks/useComponentVisible";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }
  
const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className}`}
            onClick={onClick}
        />
    );
}

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className}`}
            onClick={onClick}
        />
    );
};

type ImageViewerProps = {
    displaySlider: ComponentVisbilityProps,
    images: string[]
}

const ImageViewer: React.FC<ImageViewerProps> = ({displaySlider, images}) => {
    
    const [slideIndex, setSlideIndex] = useState(0);
    
    const settings = {
        dots: true,
        infinite: false,
        draggable: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "rounded-xl",
        initialSlide: slideIndex,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    if (displaySlider.isComponentVisible) {
        return (
            <div className="mx-auto">
                <Slider {...settings}>
                    {images.map((image: string, index: number) => (
                        <div key={index} className="outline-none">
                           <img src={image} key={index} className="mx-auto object-scale-down rounded-xl"/>
                        </div>
                    ))}
                </Slider>
            </div>
        )
    } else {

        const handleImagesSlider = (index: number) => {
            if (displaySlider.isComponentVisible) {
                setSlideIndex(0);
                displaySlider.setComponentVisible(false);
            } else {
                setSlideIndex(index);
                displaySlider.setComponentVisible(true);
            }
        }

        return (
            <div className="w-[300px] gap-1 flex flex-wrap mx-auto">
                {images.map((image: string, index: number) => (
                    <img onClick={() => handleImagesSlider(index)} src={image} key={index} className="mx-auto cursor-pointer w-[148px] aspect-square object-cover rounded-xl"/>
                ))}
            </div>
        )
    }
}

export default ImageViewer