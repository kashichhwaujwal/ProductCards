import React, { useEffect, useState } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { products } from "data";

import Card from "../component/Card";

import "react-toastify/dist/ReactToastify.css";
import Button from "../component/Button";

interface Props {
  interestedProducts: IProduct[];
  setInterestedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const to = (i: number): any => ({
  xAxis: 0,
  yAxis: i,
  scale: 1,
  rotation: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (i: number): any => ({ rotation: 0, scale: 1.5, yAxis: -1000 });

const transformation = (r: number, s: number): any =>
  `perspective(1px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`;

const Cards = ({ interestedProducts, setInterestedProducts }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isInterestedToreview, setIsInteresetedToreview] =
    useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [removeCard] = useState(() => new Set());
  const [haveProduct, setHaveProduct] = useState<boolean>(true);

  const filteredProducts: IProduct[] = products.filter(
    (product) => !interestedProducts.includes(product)
  );

  const [springProps, setSpringProps] = useSprings(
    filteredProducts.length,
    (key) => ({
      ...to(key),
      from: from(key),
    })
  );

  useEffect(() => {
    if (isInterestedToreview === true && productId !== null) {
      const product = filteredProducts[productId];
      if (product) {
        setInterestedProducts([...interestedProducts, product]);
      }
    }

    // TODO [UK 2022-07-12] This block demands all the dependencies but only two dependencies is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInterestedToreview, productId]);

  const bind = useDrag(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;

      const direction = xDir < 0 ? -1 : 1;

      if (!down && trigger) removeCard.add(index);

      setSpringProps((key) => {
        if (index !== key) return;
        const isRemoved = removeCard.has(index);

        const xAxis = isRemoved
          ? (200 + window.innerWidth) * direction
          : down
          ? xDelta
          : 0;

        if (xAxis >= 575) {
          setIsInteresetedToreview(true);
          setProductId(key);
          toast.success("Interested", { autoClose: 1 });
        } else if (xAxis <= -575) {
          toast.error("Not Interested", { autoClose: 1 });
        }

        const rotation =
          xDelta / 100 + (isRemoved ? direction * 10 * velocity : 0);

        const scale = down ? 1.02 : 1;

        return {
          xAxis,
          rotation,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isRemoved ? 200 : 500 },
        };
      });
      if (!down && removeCard.size === filteredProducts.length)
        setHaveProduct(false);
    }
  );

  return (
    <>
      {filteredProducts.length !== 0 && haveProduct ? (
        springProps.map(({ xAxis, yAxis, rotation, scale }, i) => (
          <Card
            key={i}
            index={i}
            xAxis={xAxis}
            yAxis={yAxis}
            rotation={rotation}
            scale={scale}
            transformation={transformation}
            products={filteredProducts}
            bind={bind}
          />
        ))
      ) : (
        <div className="noProduct">
          <div>
            <p>{t("card.noProducts")}</p>
            <Button
              className="noProduct__button"
              label={t("card.warningButtonLabel")}
              onClick={() => navigate("products")}
            />
          </div>
        </div>
      )}
      <ToastContainer limit={2} />
    </>
  );
};

export default Cards;
