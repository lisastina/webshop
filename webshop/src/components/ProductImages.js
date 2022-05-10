import style from "../css/ProductImages.module.css";
import { useState } from "react";

const ProductImages = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(data.images[0]);
  const [zoom, setZoom] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleClick = (e) => {
    setZoom(!zoom);
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);

    e.stopPropagation();
    e.preventDefault();
  };

  const handleMousemove = (e) => {
    if (zoom) {
      setX(e.nativeEvent.offsetX);
      setY(e.nativeEvent.offsetY);
    }
  };

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
      <div
        className={`${style.imgWrapper} ${zoom && style.zoom}`}
        onClick={handleClick}
        onMouseMove={handleMousemove}
      >
        <img
          style={{
            transformOrigin: `${x}px ${y}px `,
          }}
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
