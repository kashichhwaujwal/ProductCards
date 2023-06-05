import React from "react";
import { animated, to } from "react-spring";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface Props {
  index: number;
  xAxis: number;
  yAxis: number;
  rotation: number;
  scale: number;
  transformation: any;
  bind: any;
  products: IProduct[];
}

const Card: React.FC<Props> = ({
  index,
  xAxis,
  yAxis,
  rotation,
  scale,
  transformation,
  bind,
  products,
}) => {
  const { brand, name, image, price, oldPrice } = products[index];
  const { t } = useTranslation();

  return (
    <animated.div
      key={index}
      style={{
        transform: to(
          [xAxis, yAxis],
          (xAxis, yAxis) => `translate3d(${xAxis}px,${yAxis}px,0)`
        ),
      }}
    >
      <animated.div
        key={index}
        {...bind(index)}
        style={{
          transform: to([rotation, scale], transformation),
        }}
      >
        <div className="card" key={index}>
          <div className="cards__image">
            <img src={image} alt="profilePicture" />
          </div>

          <div className="cards__body">
            <div className="cards__product_name">
              <h2>{name}</h2>
              <p>{brand}</p>
            </div>

            <div className="cards__price">
              <label>{t("card.oldPrice")}</label>
              <br />
              <span>{oldPrice ? oldPrice : `${t("card.noPrice")}`}</span>
              <hr />
            </div>

            <div className="cards__price">
              <label>{t("card.price")}</label>
              <br />
              <span>{price}</span>
              <hr />
            </div>
          </div>

          <Button
            className="cards__button"
            label={`${t("card.buttonLabel")}`}
          />
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Card;
