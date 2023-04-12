import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import Motivation from "./motivation";
import MotivationSmall from "./motivationSmall";
import SnowStorm from "react-snowstorm";
const Layout = ({ children }) => {
  const [MotivViewSmall, setMotivViewSmall] = useState(false);
  const [MotivView, setMotivView] = useState(false);
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    if (!Load) {
      let url = "https://admin.foodsurf.ru/api/public/motivation";
      axios.get(url).then(
        (result) => {
          console.log(result.data.length);
          if (result.data.length === 2) {
            setMotivViewSmall(true);
          } else if (result.data.length === 3) {
            setMotivView(true);
          }
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {}
      );
      setLoad(true);
    }
  });
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Заказать еду с доставкой на дом или в офис. Большой выбор и быстрая доставка! Заказать с доставкой Бургеры, Борды, Роллы, Слоты, Закуски, Напитки, Десерты."
        />
        <meta
          name="keywords"
          content="Заказать еду с доставкой, Заказать еду с доставкой в офис, Заказать еду с доставкой на дом, Заказать еду с доставкой Круглосуточно, заказать Бургеры, заказать Роллы, Заказать еду на дом, Заказать еду в офис"
        />
        <meta name="abstract" content="Заказать еду с доставкой" />
        <meta name="robots" content="index, follow" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S2LS9ZWD85"
        ></script>
        <script src="/static/metric.js"></script>
        {/* added___me */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      {MotivView ? <Motivation /> : null}
      {MotivViewSmall ? <MotivationSmall /> : null}
      <div className="wraper">
        <Header />

        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=2706170629488626&ev=PageView
                &noscript=1"
          />
          <img
            src="https://vk.com/rtrg?p=VK-RTRG-502644-10uZi"
            style={{ position: "fixed", left: "-999px" }}
            alt=""
          />
          <div>
            <img
              src="https://mc.yandex.ru/watch/62762404"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        {children}

        <Footer />
      </div>
    </>
  );
};

export default Layout;
