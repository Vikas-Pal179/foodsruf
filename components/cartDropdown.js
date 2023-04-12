import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import CartItem from "./cartDropdownItem";
const CartDropdown = ({ props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );
  return (
    <div className="cart-dropdown">
      <i
        data-testid="popup__dialog-close cart-dropdown-close"
        onClick={() =>
          dispatch({
            type: "TOGGLE_CART_HIDDEN",
          })
        }
        className="svg-icon popup__dialog-close cart-dropdown-close"
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
            fill="black"
          ></path>
        </svg>
      </i>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">
            В вашей корзине пока пусто :(
            <br />
            При заказе от 800 Р доставим еду бесплатно.
          </span>
        )}
      </div>
      {cartItems.length ? (
        <div>
          <div className="count_price">
            <div className="styled__PriceDesc-sc-120x3e3-1 hxpGXs">
              Сумма заказа
            </div>
            <div className="styled__PriceValue-sc-120x3e3-2 jCsbeD">
              <span className="money ">
                <span className="money__value">{total}</span>
                <span className="money__currency money__currency_on-the-right">
                  {" "}
                  р
                </span>
              </span>
            </div>
          </div>

          <button
            className="custom-button"
            style={{ width: "100%" }}
            onClick={() => {
              dispatch({
                type: "TOGGLE_CART_HIDDEN",
              });
              router.push({
                pathname: "/checkout",
              });
              scroll.scrollToTop();
            }}
          >
            В корзину
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CartDropdown;
