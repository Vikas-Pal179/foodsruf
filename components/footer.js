import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
const contact = () => {
  const script = document.createElement("script");

  const scriptText = document.createTextNode(
    "VK.Goal('contact'); function ympfgoal() {ym(62762404,'reachGoal','phone-footer')}; ympfgoal()"
  );

  script.appendChild(scriptText);
  document.head.appendChild(script);
  // ym('reachGoal', 'phone-footer', {awesomeParameter: 121333393})
};
const instapp = () => {
  const script = document.createElement("script");

  const scriptText = document.createTextNode(
    " function ympfgoal() {ym(62762404,'reachGoal','installapp')}; ympfgoal()"
  );

  script.appendChild(scriptText);
  document.head.appendChild(script);
};
const Footer = () => (
  <div className="footer">
    <div className="footer-menu row">
      <div className="container">
        <div className="row">
          <div className="left">
            <ul>
              <li className="footer-menu--title">
                <img alt="Food Surf" src="/static/img/footerlogo.png" />
              </li>

              <li>
                <a href="/policy">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="/diliveryinfo">Информация о доставке</a>
              </li>
            </ul>
          </div>
          <div className="left footer-menus">
            <h2 className="footer-menu--title">Меню</h2>
            {typeof window !== "undefined" ? (
              window.location.pathname !== "/" ? (
                <div className="footer-navs">
                  <ul className="footer-nav">
                    <li>
                      <a onClick={() => check()} href="/#bord">
                        Борды
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#burger">
                        Бургеры
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#rolls">
                        Роллы
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#slot">
                        Слоты
                      </a>
                    </li>
                  </ul>
                  <ul className="footer-nav">
                    <li>
                      <a onClick={() => check()} href="/#zakuski">
                        Закуски
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#napitki">
                        Напитки
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#deserts">
                        Десерты
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="footer-navs">
                  <ul className="footer-nav">
                    <li>
                      <Link
                        to={"bord"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Борды
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"burger"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Бургеры
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"rolls"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Роллы
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"slot"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Слоты
                      </Link>
                    </li>
                  </ul>
                  <ul className="footer-nav">
                    <li>
                      <Link
                        to={"zakuski"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Закуски
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"napitki"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Напитки
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"deserts"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Десерты
                      </Link>
                    </li>
                  </ul>
                </div>
              )
            ) : (
              <div className="footer-navs">
                <ul className="footer-nav">
                  <li>
                    <a onClick={() => check()} href="/#bord">
                      Борды
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#burger">
                      Бургеры
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#rolls">
                      Роллы
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#slot">
                      Слоты
                    </a>
                  </li>
                </ul>
                <ul className="footer-nav">
                  <li>
                    <a onClick={() => check()} href="/#zakuski">
                      Закуски
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#napitki">
                      Напитки
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#deserts">
                      Десерты
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="right">
            <h2 className="footer-menu--title">Закажи по телефону</h2>

            <div className="footer-phone">
              <a onClick={() => contact()} href="tel:89370258888">
                8 937 025-88-88
              </a>
              <ul className="footer-social">
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/fs_food64/?igshid=YmMyMTA2M2Y"
                  >
                    <img style={{ width: 40 }} src="/static/svg/inst.svg" />
                  </a>
                </li>

                <li>
                  <a href="https://www.vk.com/foodsurf/">
                    <img src="/static/svg/vk.svg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom container">
      <div className="copyright">
        <p>FOOD SURF © 2020</p>
      </div>
      <div className="left">
        <ul>
          <li>
            <a
              onClick={() => instapp()}
              href="https://apps.apple.com/ru/app/foodsurf/id1513556598?mt=8"
              style={{
                display: "inline-block",
                overflow: "hidden",
                background:
                  "url(https://linkmaker.itunes.apple.com/ru-ru/badge-lrg.svg?releaseDate=2020-05-18&kind=iossoftware&bubble=ios_apps) no-repeat",
                width: "135px",
                height: "40px",
              }}
            ></a>
          </li>
          <li>
            <a
              onClick={() => instapp()}
              style={{ width: "155px", height: "40px" }}
              href="https://play.google.com/store/apps/details?id=ru.foodsurf.main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <img
                style={{ width: "100%" }}
                alt="Доступно в Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/ru_badge_web_generic.png"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="right">
        <p>
          Вопросы, отзывы, предложения по улучшению сервиса и качества пишите на
          почту feedback@foodsurf.ru
        </p>
        <span></span>
      </div>
    </div>
  </div>
);

export default Footer;
