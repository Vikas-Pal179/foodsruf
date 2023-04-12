import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";

const CatalogItem = ({ item, setModalShow, setModalItem }) => {
  const { title, descript, sostav, products_var } = item;
  const [sorts, setSorts] = useState(products_var);
  const dispatch = useDispatch();
  const select = async () => {
    dispatch({
      type: "MAIN_ORDER_MODAL_ITEM",
      payload: item,
    });
    dispatch({
      type: "MAIN_ORDER_MODAL",
    });
  };
  const imageUrlMob = item.products_var[0].filemob;
  const products_length = products_var.length;
  const sort = () => {
    const sortedList = products_var.sort((a, b) => {
      return a.price - b.price;
    });
    setSorts(sortedList);
  };
  if (products_length !== 1) {
    sort;
  }

  return (
    <>
      {products_length === 1 ? (
        <div className="card" onClick={() => select()}>
          <div className="cardImage">
            <Image
              src={"https://file.foodsurf.ru/" + imageUrlMob}
              alt={title}
              className="item__image"
              width={280}
              height={230}
            />
          </div>
          <div className="cardTextBlock">
            <div style={{ marginTop: 10 }}></div>
            <h4>{title}</h4>
            <div style={{ marginTop: 10 }}></div>

            {/* <p
              className={
                sostav.length < 2
                  ? "card-decritp card-decritp-hid"
                  : "card-decritp"
              }
            >
              {sostav.length > 2
                ? sostav.length < 80
                  ? sostav
                  : sostav.substr(0, 70) + " ..."
                : null}
            </p> */}

            <div className="card-bottom">
              <div className="row card-bottom--text">
                <p className="card-price">
                  <span>{products_var[0].price} р</span>
                </p>
              </div>
              <div className="row">
                <button variant="primary">Выбрать</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" onClick={() => select()}>
          <div className="cardImage">
            <Image
              src={"https://file.foodsurf.ru/" + imageUrlMob}
              alt={title}
              className="item__image"
              width={280}
              height={230}
            />
          </div>

          <div className="cardTextBlock">
            <div style={{ marginTop: 10 }}></div>
            <h4>{title}</h4>
            <div style={{ marginTop: 10 }}></div>

            {/* <p
              className={
                sostav.length < 2
                  ? "card-decritp card-decritp-hid"
                  : "card-decritp"
              }
            >
              {sostav.length > 2
                ? sostav.length < 80
                  ? sostav
                  : sostav.substr(0, 70) + " ..."
                : null}
            </p> */}

            <div className="card-bottom">
              <div className="row card-bottom--text">
                <p className="card-price">
                  <span>от {sorts[0].price} р</span>
                </p>
              </div>
              <div className="row">
                <button variant="primary">Выбрать</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogItem;
