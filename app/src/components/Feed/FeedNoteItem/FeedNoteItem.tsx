import { NoteBullet } from "../../../hooks/useUserBullets";
import DotMenu from "./DotMenu";
import KeyWordItem from "./KeyWordItem";
import LikeButton from "./LikeButton";
import Reader from "./Reader";
import Location from "./Location";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useComponentVisible from "../../../hooks/useComponentVisible";

const NoteItem: React.FC<NoteBullet> = ({ bulletJSON, keywords, score, timestamp, isFavorited, bulletDocID, images }) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes();
    const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

    const timeStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()} • ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

    const imagesSlider = useComponentVisible(false);    // if false, images slider not active, if true, images slider active
    
    const handleImagesSlider = () => {
        (imagesSlider.isComponentVisible) ? imagesSlider.setComponentVisible(false) : imagesSlider.setComponentVisible(true);
    }
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    return (
        <ul>
            <div className="relative border-b border-gray-400">
                <DotMenu />
                <div className="flex flex-col p-4">
                    <Reader noteJSON={bulletJSON}/>

                    {/* IMAGES */}
                    <div ref={imagesSlider.ref}
                        className="w-[300px] mx-auto my-2">
                        {(imagesSlider.isComponentVisible)
                            ?
                                // IMAGES SLIDER ACTIVE
                                <div className="w-[300px] h-[300px] mx-auto">
                                    <Slider className="rounded-xl"
                                        {...settings}>
                                        {images.map((image: string, index: number) => (
                                            <div key={index}
                                                className="w-[300px] bg-black rounded-xl">
                                                <img src={image} key={index} 
                                                    className="aspect-square object-scale-down rounded-xl"/>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            :
                                // IMAGES SLIDER NOT ACTIVE
                                <div className="w-[300px] gap-1 flex flex-wrap mx-auto">
                                    {images.map((image: string, index: number) => (
                                        <img onClick={handleImagesSlider}
                                             src={image} key={index} 
                                             className="mx-auto cursor-pointer w-[148px] aspect-square object-cover rounded-xl"/>
                                    ))}
                                </div>
                    }
                    </div>    

                    <div className="flex flex-col">
                        <KeyWordItem {...{keywords}} />
                        <div className="pt-2 flex justify-between items-center">
                            <LikeButton isFavorited={isFavorited} bulletDocID={bulletDocID} />
                            <div className="flex flex-col text-right">
                                <time className="text-sm text-gray-400">{timeStr}</time>
                                <Location />
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </ul>
    )
  }
  
  export default NoteItem;