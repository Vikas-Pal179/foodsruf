import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { title, quantity, imagemob, price, type } = item;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item,
    });
    if (total - parseInt(price, 10) > 399) {
      if (total - parseInt(price, 10) < 500) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
    if (total - parseInt(price, 10) > 799) {
      if (total - parseInt(price, 10) < 900) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
    if (total - parseInt(price, 10) > 1099) {
      if (total - parseInt(price, 10) < 1300) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
  };
  const addItem = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
    if (total + parseInt(price, 10) > 399) {
      if (total + parseInt(price, 10) < 500) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
    if (total + parseInt(price, 10) > 799) {
      if (total + parseInt(price, 10) < 900) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
    if (total + parseInt(price, 10) > 1099) {
      if (total + parseInt(price, 10) < 1300) {
        dispatch({
          type: "MAIN_MOTIV_MODAL",
        });
      }
    }
  };
  const clearItem = () => {
    dispatch({
      type: "CLEAR_ITEM_FROM_CART",
      payload: item,
    });
  };
  return (
    <div className="cart-item">
      <Image
        src={"https://file.foodsurf.ru/" + imagemob}
        alt={title}
        width={90}
        height={90}
      />

      <div className="item-details">
        <span className="name">{title}</span>

        <span className="price">
          {type !== null ? (
            type === "gift" ? (
              <div className="quantity">
                <svg viewBox="0 0 512 512" className="animated infinite tada">
                  <path d="m393.2,105.9c9.3-10 15.1-23.6 15.1-38.6 0-31.3-25-56.3-55.3-56.3-23,0-76,34.4-97.2,65.3-21.9-30.9-74.7-64.3-96.8-64.3-30.2,0-55.3,25-55.3,56.3 0,14.5 5.4,27.6 14.1,37.5h-106.8v134.5h29.2v260.7h153.3 125.1 153.3v-260.6h29.1v-134.5h-107.8zm-40.2-74c18.8-7.10543e-15 34.4,15.6 34.4,36.5 0,17.6-12.3,32.7-28.2,35.9h-84.6c-5.4-1.6-7.1-3.5-7.1-4.6 0-17.8 62.5-67.8 85.5-67.8zm-194-0c21.9,0 85.5,50 85.5,67.8 0,1.6-3.7,3.4-6.4,4.6h-85.2c-15.9-3.2-28.2-18.3-28.2-35.9-0.1-19.9 15.6-36.5 34.3-36.5zm34.4,448.2h-132.4v-239.7h132.4v239.7zm0-259.5h-161.5v-93.8h161.6v93.8zm104.2,259.5h-83.4v-353.4h83.4v353.4zm153.3,0h-132.4v-239.7h132.4v239.7zm29.1-259.5h-161.5v-93.8h161.6v93.8z"></path>
                </svg>
                <span className="amount-control__quantity">Подарок</span>
              </div>
            ) : (
              <>
                <div className="quantity">
                  <button
                    onClick={() => removeItem()}
                    className="amount-control__switcher amount-control__switcher_remove"
                  >
                    -
                  </button>
                  <span className="amount-control__quantity">
                    <span className="amount-control__quantity-value amount-control__quantity-values">
                      {quantity}
                    </span>
                  </span>
                  <button
                    onClick={() => addItem()}
                    data-testid="menu__meta-product_add-control"
                    className="amount-control__switcher amount-control__switcher_add"
                  >
                    +
                  </button>
                </div>
                <span>{price} р</span>
              </>
            )
          ) : (
            <>
              <div className="quantity">
                <button
                  onClick={() => removeItem()}
                  className="amount-control__switcher amount-control__switcher_remove"
                >
                  -
                </button>
                <span className="amount-control__quantity">
                  <span className="amount-control__quantity-value amount-control__quantity-values">
                    {quantity}
                  </span>
                </span>
                <button
                  onClick={() => addItem()}
                  data-testid="menu__meta-product_add-control"
                  className="amount-control__switcher amount-control__switcher_add"
                >
                  +
                </button>
              </div>
              <span>{price} р</span>
            </>
          )}

          <div className="cart__line-delete cart__line-deletes">
            <i onClick={() => clearItem()} className="svg-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.75 6H5.25L5.90993 15.8047C5.97132 16.8184 6.50848 17.5 7.39863 17.5H12.6014C13.4915 17.5 14.0133 16.8184 14.0901 15.8047L14.75 6Z"
                  fill="#373535"
                ></path>
                <path
                  d="M13.8498 3.00681L6.19643 3.00688C4.98382 2.88702 5.02127 4.36489 5 5L14.9917 4.99999C15.0165 4.38088 15.0624 3.12667 13.8498 3.00681Z"
                  fill="#373535"
                ></path>
              </svg>
            </i>
          </div>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
