import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Sliders from "../components/slider";

import Modal from "../components/catalogItemModal";
import CatalogItem from "../components/catalogItem";

const Home = ({ data, errorss }) => {
  const [modalItem, setModalItem] = useState({
    title: "",
    descript: "",
    price: "",
    imageUrl: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [set, setSet] = useState({
    free_dil: 0,
    price_dil: 0,
    online: true,
    error: null,
  });

  const loadConf = () => {
    let url = "https://admin.foodsurf.ru/api/config";
    console.log("start Load");
    axios.get(url).then(
      (result) => {
        setSet(result.data);
      },
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
      (error) => {
        setSet({
          error,
        });
      }
    );
  };
  if (!isLoaded) {
    loadConf();
    setIsLoaded(true);
  }

  const contact = () => {
    const script = document.createElement("script");

    const scriptText = document.createTextNode(
      "VK.Goal('contact'); function ymphgoal() {ym(62762404, 'reachGoal', 'phone-header'); return true;}; ymphgoal()"
    );

    script.appendChild(scriptText);
    document.head.appendChild(script);
  };
  function renderName(name) {
    console.log(name);
    if (name === "Чими") return;
    return name.toUpperCase();
  }
  return (
    <>
      {/* <Sliders/> */}
      <div className="container">
        <Head>
          <title>FOOD SURF | Заказать еду с доставкой</title>
          <meta
            name="facebook-domain-verification"
            content="hqc68u55xdlryoe4fso2dkjs8ictzz"
          />
          <meta name="copyright" content="2021 Mercury Labs" />
        </Head>

        <main className="main">
          {data.types &&
            data.types.map(({ name, _id, sku }) => (
              <div key={sku} id={sku} className="product_group">
                <h2 className="title">{renderName(name)}</h2>
                <div className="ProductList">
                  {data.products.map((item) =>
                    item.parrent === sku ? (
                      <CatalogItem
                        key={item._id}
                        item={item}
                        setModalShow={setModalShow}
                        setModalItem={setModalItem}
                      />
                    ) : null
                  )}
                </div>
              </div>
            ))}

          {errorss ? (
            <>
              <h2>
                При загрузке сайта произошла ошибка. Обновите страницу, если
                ошибка останется сделайте заказ по телефону
              </h2>
              <div className="header-dilivery--phone">
                <a
                  onClick={() => contact()}
                  style={{
                    fontSize: "32px",
                    lineHeight: "15px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#EF7F1A",
                  }}
                  href="tel:89370258888"
                >
                  8 937 025-88-88
                </a>
                <span style={{ fontSize: "12px", color: "#ef7f1a" }}>
                  Доставка работает с 10.00 до 23.00
                </span>
              </div>
            </>
          ) : null}
        </main>

        <div className="dilivery">
          <h2 className="title">ДОСТАВКА И ОПЛАТА</h2>
          <div className="row">
            <div className="dilivery-item">
              <img src="/static/img/truck.png" />
              <h3>НА ВЫНОС БЕСПЛАТНО!</h3>
              <p>Заберите ваши любимые блюда по адресу:</p>
              <p>г. Энгельс ул. Тельмана 137 ТЦ “АВРОРА” </p>
            </div>
            <div className="dilivery-item">
              <img src="/static/img/point.png" />
              <h3>
                ДОСТАВКА бесплатно при <br />
                заказе от {set.free_dil} руб
              </h3>
              <p>
                Наш курьер доставит заказ по указанному адресу. После
                предварительного звонка оператора курьер дополнительно свяжется
                для предупреждения о выезде по адресу доставки (ориентировочно
                за 15-20 минут).
              </p>
              <span>Стоимость доставки </span>
              <p>
                Доставка по городу Энгельс {set.price_dil} руб при сумме заказа
                менее {set.free_dil} руб. <br />
                от {set.free_dil} руб доставка бесплатно!
              </p>
            </div>
            <div className="dilivery-item">
              <img src="/static/img/pay.png" />
              <h3>ОПЛАТА</h3>

              <p>
                Вы можете оплатить свой заказ при получении с помощью банковской
                карты или наличными курьеру или на кассе.
              </p>
            </div>
          </div>
          <h2 className="container contact-title">Зона доставки на карте</h2>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A417784799aa0378597f7ea2e10554be6745f617b6944daa923f6197dbf394780&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      <Modal
        item={modalItem}
        setModalShow={setModalShow}
        modalShow={modalShow}
      />
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const res = await fetch(
      `https://admin.foodsurf.ru/api/public/catalogs/mobile`
    );

    const data = await res.json();
    const errorss = false;
    // Pass data to the page via props
    return { props: { data, errorss } };
  } catch (error) {
    try {
      const res = await fetch(
        `https://admin.foodsurf.ru/api/public/catalogs/mobile`
      );

      const data = await res.json();

      // Pass data to the page via props
      return { props: { data } };
    } catch (error) {
      console.error("Ошибка:", error);
      const data = [];
      const errorss = true;
      // Pass data to the page via props
      return { props: { data, errorss } };
    }
    console.error("Ошибка:", error);
    const data = [];
    const errorss = true;
    // Pass data to the page via props
    return { props: { data, errorss } };
  }
}

export default Home;
