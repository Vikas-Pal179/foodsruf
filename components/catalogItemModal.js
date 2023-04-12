import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import Image from 'next/image'
const Modal = () => {
    const dispatch = useDispatch()
    const hiden = useSelector((state) => state.settings.mainOrderModalHiden)
    const item = useSelector((state) => state.settings.mainOrderModalItem)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const close = () => {
        dispatch({
            type: 'MAIN_ORDER_MODAL',
          })
          dispatch({
            type: 'MAIN_ORDER_MODAL_ITEM',
            payload: []
          })
    }
    const add = (n) => {


        const i = {
          _id: item._id+'_'+n,
          title: item.title +' '+item.products_var[n].title,
          part: item.part,
          descriptl: item.descriptl,
          descript: item.descript,
          sostav: item.sostav,
          products_var: item.products_var,
          sku: item.sku,
          parrent: item.parrent,
          sort: item.sort,
          created_at: item.created_at,
          updated_at: item.updated_at,
          image: item.products_var[n].file,
          imagemob: item.products_var[n].filemob,
          price: item.products_var[n].price,
          pv: n
  
        }
        dispatch({
          type: 'ADD_ITEM',
          payload: i
        })
      
      
        
          dispatch({
            type: 'MAIN_ORDER_MODAL',
          })
          dispatch({
            type: 'MAIN_ORDER_MODAL_ITEM',
            payload: []
          })
          const total = cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
              accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
          )
      
          if(total+parseInt(item.products_var[n].price, 10)> 399) {
            if(total+parseInt(item.products_var[n].price, 10) < 500) {
              dispatch({
                type: 'MAIN_MOTIV_MODAL',
              })
            }
          }
          if(total+parseInt(item.products_var[n].price, 10) > 799) {
            if(total+parseInt(item.products_var[n].price, 10) < 900) {
              dispatch({
                type: 'MAIN_MOTIV_MODAL',
              })
            }
          }
          if(total+parseInt(item.products_var[n].price, 10) > 1099) {
            if(total+parseInt(item.products_var[n].price, 10) < 1300) {
              dispatch({
                type: 'MAIN_MOTIV_MODAL',
              })
            }
          }
          
    }
    if(hiden){
        return null;
    }
    const imageUrlMob = item.products_var[0].file;
    return (
      <div className="popup__container" >
          <div
            className="popup__container-overlay"
            onClick={() => close()}
          ></div>
          <div className="popup__container-content">
            <div className="popup__dialog popup__dialog_transition-in">
              <div className="popup__dialog-inner">
                <i
                  data-testid="popup__dialog-close"
                  onClick={() => close()}
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
                <div className="opder-popup">
                  <div className="modal-img">
                  
                    <Image
                    src={'https://file.foodsurf.ru/'+imageUrlMob}
                    alt={item.title}
                    className='img-response'
                    width={400}
                    height={400}
                  />
                  </div>
                  <div className="modal-descr">
                    <div>
                      <p className="modalOrderTitle">{item.title}</p>
                      <p className="modalOrderDescr">{item.descript}</p>
                    
                    </div>
                    <div>
                    {item.products_var.length === 1 ? (
                      <button onClick={() => add(0)} className="modal-btn button button_primary">
                        Добавить в корзину за {item.products_var[0].price}р
                      </button>
                    ): (item.products_var.map((it, index) => (
                      <div className='card-bottom'>
                        <div className='row card-bottom--text'>
                          <p className='card-title'>{it.title}</p>
                          <p className='card-price'><span>{it.price} р</span></p>
                    
                        </div>
                        <div className='row'>
                          <button onClick={() => add(index)} className="modal-btn button button_primary" >Выбрать</button>
                        </div>
                      </div>
                    )))}
                      
                      

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
export default Modal