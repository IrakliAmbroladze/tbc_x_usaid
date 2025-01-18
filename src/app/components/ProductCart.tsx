import React from "react";
import BtnAddCart from "./small/BtnAddCart";
import Image, { StaticImageData } from "next/image";

interface ProductCartProps {
  data: {
    id: number;
    name: string;
    image: StaticImageData;
    description: string;
  };
}

const ProductCart = ({ data }: ProductCartProps): JSX.Element => {
  const { id, name, image, description } = data;
  return (
    <div key={id} className="cartClass">
      <Image
        src={image.src}
        alt={name}
        style={{ width: "50%", height: "50%" }}
      />
      <h4>{name}</h4>
      <div>{description}</div>
      <BtnAddCart />
    </div>
  );
};

export default ProductCart;
