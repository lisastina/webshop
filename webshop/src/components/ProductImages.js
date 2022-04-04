import style from "../css/ProductImages.module.css";
import { useState } from "react";

const ProductImages = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(data.images[0]);

  return (
    <div className={style.productImages}>
      <div className={style.thumbnails}>
        {data.images?.map((image, i) => {
          return (
            <div
              onClick={() => setCurrentImage(image)}
              className={`${style.thumbnail} ${
                currentImage.name === image.name && style.selected
              }`}
              key={i}
            >
              <img src={image.url} alt={image.name} />
            </div>
          );
        })}
      </div>
      <div className={style.imgWrapper}>
        <img
          src={
            data.images?.length
              ? currentImage.url
              : "../assets/imgs/placeholder.png"
          }
          alt={`${data.name} ${data.type}`}
        />
      </div>
    </div>
  );
};

export default ProductImages;
