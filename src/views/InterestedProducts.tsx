import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "../component/Button";

interface Props {
  interestedProducts: IProduct[];
}

const Products = ({ interestedProducts }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>{t("products.title")}</h1>
      {interestedProducts.length > 0 ? (
        interestedProducts.map((interestedProduct) => (
          <div className="products" key={interestedProduct.id}>
            <div className="products__image">
              <img src={interestedProduct.image} alt="interestedProduct" />
            </div>
            <div className="products__body">
              <h2>{interestedProduct.name}</h2>
              <hr />
              <p>{interestedProduct.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="noProducts">
          <div>
            <p>{t("products.noProducts")}</p>
            <Button
              className="noProduct__button"
              label={t("products.buttonLabel")}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
