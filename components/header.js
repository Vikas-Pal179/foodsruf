import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Link, animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import CartDropdown from "../components/cartDropdown";
const MenuMob = ({ setLogin, setMenuShow, user }) => {
  const router = useRouter();
  console.log(router.asPath, "router.asPath");
  return (
    <div className="header-popup-modal">
      <div className="header-modal-row">
        <div className="logo">
          <img src="/static/img/footerlogo.png" alt="FoodSurf" />
        </div>
        <img
          onClick={() => setMenuShow(false)}
          src="/static/svg/closebtn.svg"
          alt="close"
        />
      </div>
      <div className="header-row">
        <p>
          Бесплатная доставка
          <br />
          от 800 р
        </p>
        <img src="/static/svg/truck1.svg" />
      </div>
      <nav>
        <ul className="header-menu">
          <li>
            <a href="/contact">Контакты</a>
          </li>
          <li>
            <a href="/about">О нас</a>
          </li>
          {user == null ? (
            <li>
              <a onClick={() => setLogin(true)}>Войти</a>
            </li>
          ) : (
            <li>
              <a
                onClick={() =>
                  router.push({
                    pathname: "/user",
                  })
                }
              >
                Профиль
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className="down-app">
        <h2>Закажи в приложении</h2>
        <ul>
          <li>
            <a
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
              style={{ width: "135px", height: "40px" }}
              href="https://play.google.com/store/apps/details?id=ru.foodsurf.main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <img
                style={{ width: "111%", marginLeft: "-10px" }}
                alt="Доступно в Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/ru_badge_web_generic.png"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
const LoginModal = ({ setLogin }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [code, setCode] = useState(false);
  const [codes, setCodes] = useState("");
  const [phone, setPhone] = useState("+7");
  const [error, setError] = useState(false);
  const closeModal = () => {
    setLogin(false);
  };

  const submit = async (event) => {
    event.preventDefault();

    let authData = {
      phone,
      codes,
      type: 1,
    };

    let url = "https://admin.foodsurf.ru/api/public/user/auth";

    if (code) {
      authData = {
        phone,
        codes,
        type: 2,
      };
    }

    try {
      if (code !== true) {
        setCode(true);
        const response = await axios.post(url, authData);
      } else {
        const response = await axios.post(url, authData);

        const data = response.data;

        if (data.status !== "false") {
          const user = {
            _id: data.userf._id,
            name: data.userf.name,
            email: data.userf.email,
            dates: data.userf.date_birstday,
            month: data.userf.month_birstday,
            // localid: user.localid,
            phone: data.userf.phone,
            adress: data.adres,
            bonus: data.userf.bonus_bal,
          };

          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

          localStorage.setItem("localid", data.userf._id);
          localStorage.setItem("expirationDate", expirationDate);

          dispatch({
            type: "SET_CURRENT_USER",
            payload: user,
          });
          if (window.location.pathname === "/checkout") {
          } else {
            if (user.name == null) {
              router.push({
                pathname: "/user",
              });
            }
            if (user.email == null) {
              router.push({
                pathname: "/user",
              });
            }
          }
          setLogin(false);

          setCode(false);
          setCodes("");
          setPhone("");
        } else {
          setCodes("");
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup__container">
      <div className="popup__container-overlay" onClick={closeModal}></div>
      <div className="popup__container-content">
        <div className="popup__dialog popup__dialog_transition-in">
          <div className="popup__dialog-inner">
            <i
              data-testid="popup__dialog-close"
              onClick={closeModal}
              className="svg-icon popup__dialog-close"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                  fill="white"
                ></path>
              </svg>
            </i>
            <div className="login-popup">
              <div className="login-popup__header">
                <h1 className="title title_h1">Вход на сайт</h1>
              </div>
              <div className="login-popup__content">
                <form onSubmit={submit}>
                  <div className="login-popup__phone">
                    <div className="error-tooltip-wrapper">
                      {code ? null : (
                        <>
                          <p style={{ margin: 0 }}>Номер телефона</p>
                          <input
                            name="phone"
                            type="tel"
                            className="input input"
                            onChange={(text) => setPhone(text.target.value)}
                            value={phone}
                            label="Номер телефона"
                            placeholder="+7 999 999-99-99"
                            maxLength="12"
                            required
                          />
                        </>
                      )}
                      {code === true && (
                        <>
                          <p style={{ margin: 0 }}>Код из смс</p>
                          <input
                            name="codes"
                            type="text"
                            className="input input"
                            onChange={(text) => setCodes(text.target.value)}
                            value={codes}
                            label="Код подтверждения"
                            placeholder="1234"
                            maxLength="4"
                            required
                          />
                        </>
                      )}
                      {error === true && <p>Неверный код из СМС</p>}
                    </div>
                  </div>

                  <button
                    onClick={submit}
                    type="submit"
                    className="primary-orange login-popup-button button button_large"
                  >
                    {code ? null : "Выслать код"}
                    {code === true && "Авторизоваться"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(router.asPath, "router.asPath");
  const [login, setLogin] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const hidden = useSelector((state) => state.cart.hidden);
  const user = useSelector((state) => state.user.currentUser);
  const itemCount = cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
  );
  const check = () => {
    if (hidden === false) {
      dispatch({
        type: "TOGGLE_CART_HIDDEN",
      });
    }
  };
  const contact = () => {
    const script = document.createElement("script");

    const scriptText = document.createTextNode(
      "VK.Goal('contact'); function ymphgoal() {ym(62762404, 'reachGoal', 'phone-header'); return true;}; ymphgoal()"
    );

    script.appendChild(scriptText);
    document.head.appendChild(script);
  };
  if (typeof window !== "undefined") {
    return (
      <>
        <div className="header-first ">
          <div className="container">
            <div className="row">
              <div className="header-logo">
                <a href="/">
                  <img src="/static/img/logo.jpg" alt="logo" />
                </a>
              </div>
              <div className="header-dilivery">
                <img src="/static/svg/truck1.svg" />
                <h1 className="header-dilivery--descr">
                  Доставка и самовывоз еды
                </h1>
              </div>
              <div className="header-dilivery--phone">
                <a
                  onClick={() => contact()}
                  className="header-dilivery--phone-link"
                  href="tel:89370258888"
                >
                  8 937 025-88-88
                </a>
                {router.asPath === "/checkout" && (
                  <span style={{ fontSize: "12px", color: "#ef7f1a" }}>
                    Доставка часы с 10.00 до 23.00
                  </span>
                )}
              </div>

              {user == null ? (
                <div className="header-btn header-btnweb">
                  <img
                    className="profile-img"
                    src="/static/svg/menuprofileact.svg"
                  />
                  <button
                    onClick={() => setLogin(true)}
                    className="header__user-profile-button button button_secondary  login btn header-btn--user"
                  >
                    Войти
                  </button>
                </div>
              ) : (
                <div className="header-btn header-btnweb">
                  <img
                    onClick={() =>
                      router.push({
                        pathname: "/user",
                      })
                    }
                    className="profile-img"
                    src="/static/svg/menuprofileact.svg"
                  />
                  <button
                    onClick={() =>
                      router.push({
                        pathname: "/user",
                      })
                    }
                    className="header__user-profile-button button button_secondary header__user-profile-button_is-loggedin header-btn--user"
                  >
                    {user.name}
                  </button>
                </div>
              )}

              <div
                onClick={() => setMenuShow(true)}
                className="header-btn header-btnmobile"
              >
                <img className="menu-img" src="/static/svg/menu.svg" />
                <button className="header__user-profile-button button button_secondary  login btn header-btn--user">
                  Меню
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <nav className="header-menus">
            <div className="container">
              <div className="row">
                {window.location.pathname !== "/" ? (
                  <ul className="header-nav">
                    <li>
                      <a onClick={() => check()} href="/#burger">
                        Бургеры
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#bord">
                        Борды
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#box">
                        Боксы
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#rolls">
                        Роллы
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/#slots">
                        Слоты
                      </a>
                    </li>
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

                    <li>
                      <a onClick={() => check()} href="/contact">
                        Контакты
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/about">
                        О нас
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="header-nav">
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
                        to={"box"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Боксы
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
                        to={"slots"}
                        spy={true}
                        smooth={true}
                        duration={800}
                        activeClass="primary-orange"
                      >
                        Слоты
                      </Link>
                    </li>
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

                    <li>
                      <a onClick={() => check()} href="/contact">
                        Контакты
                      </a>
                    </li>
                    <li>
                      <a onClick={() => check()} href="/about">
                        О нас
                      </a>
                    </li>
                  </ul>
                )}

                <div
                  className="header-btn cartButton"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_CART_HIDDEN",
                    })
                  }
                >
                  <p className="busket">
                    Корзина {itemCount > 0 && "| " + itemCount}
                  </p>
                </div>
              </div>
            </div>
          </nav>

          {itemCount > 0 && (
            <div
              className="cart-btn  cartButtonMobile"
              onClick={() => {
                router.push({
                  pathname: "/checkout",
                });
                scroll.scrollToTop();
              }}
            >
              <p className="busket">{itemCount > 0 && itemCount}</p>
            </div>
          )}
          {hidden ? null : <CartDropdown />}
          {menuShow ? (
            <MenuMob
              setMenuShow={setMenuShow}
              user={user}
              setLogin={setLogin}
            />
          ) : null}
        </div>
        {login ? <LoginModal setLogin={setLogin} /> : null}
      </>
    );
  } else {
    return (
      <>
        <div className="header-first ">
          <div className="container">
            <div className="row">
              <div className="header-logo">
                <a href="/">
                  <img src="/static/img/logo.jpg" alt="logo" />
                </a>
              </div>
              <div className="header-dilivery">
                <img src="/static/svg/truck1.svg" />
                <h1 className="header-dilivery--descr">
                  Доставка и самовывоз еды
                </h1>
              </div>
              <div className="header-dilivery--phone">
                <a
                  onClick={() => contact()}
                  className="header-dilivery--phone-link"
                  href="tel:89370258888"
                >
                  8 937 025-88-88
                </a>
              </div>

              {user == null ? (
                <div className="header-btn header-btnweb">
                  <img
                    className="profile-img"
                    src="/static/svg/menuprofileact.svg"
                  />
                  <button
                    onClick={() => setLogin(true)}
                    className="header__user-profile-button button button_secondary  login btn header-btn--user"
                  >
                    Войти
                  </button>
                </div>
              ) : (
                <div className="header-btn header-btnweb">
                  <img
                    onClick={() =>
                      router.push({
                        pathname: "/user",
                      })
                    }
                    className="profile-img"
                    src="/static/svg/menuprofileact.svg"
                  />
                  <button
                    onClick={() =>
                      router.push({
                        pathname: "/user",
                      })
                    }
                    className="header__user-profile-button button button_secondary header__user-profile-button_is-loggedin header-btn--user"
                  >
                    {user.name}
                  </button>
                </div>
              )}

              <div
                onClick={() => setMenuShow(true)}
                className="header-btn header-btnmobile"
              >
                <img className="menu-img" src="/static/svg/menu.svg" />
                <button className="header__user-profile-button button button_secondary  login btn header-btn--user">
                  Меню
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <nav className="header-menus">
            <div className="container">
              <div className="row">
                <ul className="header-nav">
                  <li>
                    <a onClick={() => check()} href="/#burger">
                      Бургеры
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#bord">
                      Борды
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#box">
                      Боксы
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#rolls">
                      Роллы
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/#slots">
                      Слоты
                    </a>
                  </li>
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

                  <li>
                    <a onClick={() => check()} href="/contact">
                      Контакты
                    </a>
                  </li>
                  <li>
                    <a onClick={() => check()} href="/about">
                      О нас
                    </a>
                  </li>
                </ul>

                <div
                  className="header-btn cartButton"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_CART_HIDDEN",
                    })
                  }
                >
                  <p className="busket">
                    Корзина {itemCount > 0 && "| " + itemCount}
                  </p>
                </div>
              </div>
            </div>
          </nav>

          {itemCount > 0 && (
            <div
              className="cart-btn  cartButtonMobile"
              onClick={() => {
                router.push({
                  pathname: "/checkout",
                });
                scroll.scrollToTop();
              }}
            >
              <p className="busket">{itemCount > 0 && itemCount}</p>
            </div>
          )}
          {hidden ? null : <CartDropdown />}
          {menuShow ? (
            <MenuMob
              setMenuShow={setMenuShow}
              user={user}
              setLogin={setLogin}
            />
          ) : null}
        </div>
        {login ? <LoginModal setLogin={setLogin} /> : null}
      </>
    );
  }
};

export default Header;
