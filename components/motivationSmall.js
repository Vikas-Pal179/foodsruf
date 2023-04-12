import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
const LoginModal = ({setShowGift, data}) => {
  // console.log(data.length)
	const dispatch = useDispatch()
    const selected = useSelector((state) => state.cart.gifts_select)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const cartPromoAccept = useSelector((state) => state.cart.cartPromoAccept)
    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      
	const [code, setCode] = useState(false)
	const [codes, setCodes] = useState('')
	const [phone, setPhone] = useState('+7')
	const [error, setError] = useState(false)
	const [errorText, setErrorText] = useState('')
  let sm = data.length
 	const closeModal = () => {

		setShowGift(false)
	}
 	const select = async (ms) => {
    console.log(ms)
		const select = {
           
        "id": data[ms].product.sku,
        "title": data[ms].product.title,
        "descript": data[ms].product.descriptl,
        "type": "gift",
        "price": "0",
        "image": data[ms].file,
        "imagemob": data[ms].product.products_var[0].filemob,
        'products_var': [
            {
              'title': '',
              'price': '0',
              'file': data[ms].product.products_var[0].file,
              'filemob': data[ms].product.products_var[0].filemob
            }
          ]
           
        }

        dispatch({
            type: 'ADD_ITEM',
            payload: select
          })
        dispatch({
            type: 'GIFTS_SELECT',
            payload: ms
          })
        dispatch({
            type: 'MOTIV',
            payload: data[ms].min
          })
	}
     
 	const reselect = async (ms) => {

		const select = {
           
      "id": data[ms].product.sku,
      "title": data[ms].product.title,
      "descript": data[ms].product.descriptl,
      "type": "gift",
      "price": "0",
      "image": data[ms].product.products_var[0].file,
      "imagemob": data[ms].product.products_var[0].filemob,
      'products_var': [
          {
            'title': '',
            'price': '0',
            'file': data[ms].product.products_var[0].file,
            'filemob': data[ms].product.products_var[0].filemob
          }
        ]
       
    }
        dispatch({
            type: 'CLEAR_ITEM_FROM_CART',
            payload: select
          })
          dispatch({
            type: 'GIFTS_SELECT',
            payload: null
          })
          dispatch({
            type: 'MOTIV',
            payload: null
          })
	}

	
	
	
	return (
		<div className="popup__container">
		<div className="popup__container-overlay" onClick={closeModal} ></div>
		<div className="popup__container-content" >
			<div className="popup__dialog popup__dialog_transition-in" >
				<div className="popup__dialog-inner">
				<i data-testid="popup__dialog-close" onClick={closeModal}  className="svg-icon popup__dialog-close"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path  d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path>
	</svg>
	</i>
					<div className="login-popup">
						<div className="login-popup__header">
              <h2 className="title title_h1">Выберите подарок</h2>
              <p>Подарочная система доступна только при заказе на доставку</p>
						</div>
                        <div className="login-popup__content giftss__list">
                        
                        {data.map(item => {
                          sm=sm-1
                          return (

                        
                        <div key={item._id} className='giftss__card giftss__card--select'>
                            <div className='giftss__cardImage' >
        
                            <Image
                                src={'https://file.foodsurf.ru/'+item.product.products_var[0].file}
                                alt={item.product.title}
                                className='giftss__cardImage__image'
                                width={500}
                                height={500}
                            />
                            </div>
                            
                            <div className='cardTextBlock'>
                            <h4>{item.product.title}</h4>
                            <p className='card-decritp'></p>
                            
                            
                                <div className='card-bottom'>
                            
                                <div className='row'>
                                { window.location.pathname === '/checkout/2' ? (<p>На странице оформления заказа нельзя добавить подарок</p>):(
                                  cartPromoAccept ? (<p>Подарок нельзя использвать вместе с промокодом!</p>) : total < parseInt(item.min) ? (
                                    <p>Доступно при заказе от {item.min} р</p>
                                ): (
                                    selected !== null ? (
                                    selected === sm+1 ? (
                                        <button variant="primary" onClick={()=> reselect(sm+1)}>Выбрать другой</button>
                                    ):(
                                      <button variant="primary motiv-dis" className='button__disable'>Выбрать</button>
                                    )
                                    

                                    ): (
                                        <button variant="primary" onClick={()=> {select(sm+1),closeModal()}}>Выбрать</button>
                                        
                                    )
                                )
                                )
                              }

                                
                                </div>
                                </div>
                            
                                
                            
                            
                            
                            </div>
                        </div>
)})}
                        
                        

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	  );
}
const MotivModal = ({setShowModal}) => {
	const dispatch = useDispatch()
    const selected = useSelector((state) => state.cart.gifts_select)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const cartPromoAccept = useSelector((state) => state.cart.cartPromoAccept)
    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      
	const [code, setCode] = useState(false)
	const [codes, setCodes] = useState('')
	const [phone, setPhone] = useState('+7')
	const [error, setError] = useState(false)
	const [errorText, setErrorText] = useState('')
 	const closeModal = () => {

		dispatch({
      type: 'MAIN_MOTIV_MODAL',
    })
	}
	
	return (
		<div className="popup__container">
		<div className="popup__container-overlay" onClick={closeModal} ></div>
		<div className="popup__container-content" >
			<div className="popup__dialog popup__dialog_transition-in" >
				<div className="popup__dialog-inner">
				<i data-testid="popup__dialog-close" onClick={closeModal}  className="svg-icon popup__dialog-close"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path  d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path>
	</svg>
	</i>
					<div className="login-popup">
						<div className="login-popup__header">
              <h2 className="title title_h1">Вам подарок</h2>
              <p>Подарочная система доступна только при заказе на доставку</p>
              {total <500 ? (
                <p>Добавь в корзину еще товаров на {500-total} ₽ и получи в подарок при заказе на доставку:</p>
              ): (total < 900 ? <p>Добавь в корзину еще товаров на {900-total} ₽ и получи в подарок при заказе на доставку:</p>:total<1300?<p>Добавь в корзину еще товаров на {1300-total} ₽ и получи в подарок при заказе на доставку:</p>:null)}
             
            </div>
           
            {total<1300 ? (total >1099 ?
              <div className="opder-popup">
                <div className="modal-imgs">
                    
              <Image
              src={'https://file.foodsurf.ru/product-chikentar.jpg'}
              alt={'title'}
              className='img-response'
              width={400}
              height={400}
            />
            </div>
            <div className="modal-descr">
              <div>
                <p className="modalOrderTitle">Чикен тар</p>
                <p className="modalOrderDescr"></p>
              
              </div>
              <div>
            
                <button onClick={() => dispatch({
                  type: 'MAIN_MOTIV_MODAL',
                })} className="modal-btn button button_primary">
                  ОК
                </button>
              
                
                

              </div>
            </div>
            </div>
            :null): null}
            {total<900 ? (total >799?
              <div className="opder-popup">
                <div className="modal-imgs">
                    
              <Image
              src={'https://file.foodsurf.ru/product-nagets6.jpg'}
              alt={'title'}
              className='img-response'
              width={400}
              height={400}
            />
            </div>
            <div className="modal-descr">
              <div>
                <p className="modalOrderTitle">Наггетсы 6шт</p>
                <p className="modalOrderDescr"></p>
              
              </div>
              <div>
            
                <button onClick={() => dispatch({
                  type: 'MAIN_MOTIV_MODAL',
                })} className="modal-btn button button_primary">
                  ОК
                </button>
              
                
                

              </div>
            </div>
            </div>
            :null): null}
            {total<500 ? (total>399 ?
              <div className="opder-popup">
                <div className="modal-imgs">
                    
              <Image
              src={'https://file.foodsurf.ru/cupon.jpg'}
              alt={'title'}
              className='img-response'
              width={400}
              height={400}
            />
            </div>
            <div className="modal-descr">
              <div>
                <p className="modalOrderTitle">Купон на скидку 10%</p>
                <p className="modalOrderDescr"></p>
              
              </div>
              <div>
            
                <button onClick={() => dispatch({
                  type: 'MAIN_MOTIV_MODAL',
                })} className="modal-btn button button_primary">
                  ОК
                </button>
              
                
                

              </div>
            </div>
            </div>
            :null): null}
            
    
    
                        


					</div>
				</div>
			</div>
		</div>
	</div>
	  );
}
const MotivationSmall = () => {

    const [show, setshow] = useState(false)
    const dispatch = useDispatch()
    const [showGift, setShowGift] = useState(false)
    const [Load, setLoad] = useState(false)
    const [Motiv, setMotiv] = useState([{min: 0}])
    const [MotivView, setMotivView] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const selected = useSelector((state) => state.cart.gifts_select)
    const mainMotivModalHiden = useSelector((state) => state.cart.mainMotivModalHiden)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const promo = useSelector((state) => state.cart.cartItems)
    const user = useSelector((state) => state.user.currentUser)
    const cartPromocode = useSelector((state) => state.cart.cartPromocode)
    const cartPromocodeItem = useSelector((state) => state.cart.cartPromocodeItem)
    const promocodeAccept = useSelector((state) => state.cart.cartPromoAccept)
    const [h, setH]  = useState(0);
    const [hc, setHc]  = useState(0);
    let mc = Motiv.length
    // console.log(Motiv[Motiv.length])
    
    const removeItem = (item) => {
      
      dispatch({
          type: 'REMOVE_ITEM',
          payload: item
        })
  }
    const delpromo = () => {

      removeItem(cartPromocodeItem)
      dispatch({
        type: 'PROMOCODE',
        payload: ''
      })
      dispatch({
        type: 'PROMOCODE_ITEM',
        payload: null
      })
      dispatch({
        type: 'PROMOCODE_ACCEPT',
  
      })
    }
    const promoCheck = async event => {
      if(!user) {
        
        setPromoErrorText('Вы не авторизованы');
        setPromoError(true)
        return;
      }
      if(selected){
        setPromoErrorText('Промокод нельзя использвать вместе с подарком!');
        setPromoError(true)
        return;
      }
        const body = {
          code: cartPromocode,
          user: user._id,
          app: '1',
          total: total,
          quantity: totalq
        }
        let url = 'https://admin.foodsurf.ru/api/public/promo';
      try {
        const response = await axios.post(url, body);
  
      
        if(response.data.status){
          if(response.data.status==='Not First order'){
            delpromo()
            setPromoErrorText('Вы уже совершали первый заказ!');
          setPromoError(true)
          }else if(response.data.status==='Hight Total busket'){
            delpromo()
            setPromoErrorText('Превышена максимальная сумма корзины для заказа с этим промокодом!');
          setPromoError(true)
          
          }else if(response.data.status==='Low Total busket'){
            delpromo()
            setPromoErrorText('У вас не соответсвует минимальная сумма корзины для заказа с этим промокодом!');
            setPromoError(true)
          
          }else if(response.data.status==='Not Permit app'){
            delpromo()
            setPromoErrorText('Данный промокод не действителен на сайте!');
            setPromoError(true)
          }else if(response.data.status==='Not Active'){
            delpromo()
            Alert.alert('Ошибка!', 'Промокод не доступен сейчас!');
            setPromoErrorText('Промокод не доступен сейчас!');
            setPromoError(true)
          }else if(response.data.status==='Not Found'){
            delpromo()
            setPromoErrorText('Промокод не найден!');
            setPromoError(true)
          }else if(response.data.status==='Not Login'){
            delpromo()
            setPromoErrorText('Пожалуйста войдите!');
            setPromoError(true)
          }
          
          
        }else{
          
          
          
        }
  
      
      } catch (error) {
        console.log(error);
      };
    }
    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      useEffect(() => {
        
          setH(total / hc)
          if(selected){
            
              if(total<Motiv[selected].min){
                const select = {
           
                  "id": Motiv[selected].product.sku,
                  "title": Motiv[selected].product.title,
                  "descript": Motiv[selected].product.descriptl,
                  "type": "gift",
                  "price": "0",
                  "image": Motiv[selected].product.products_var[0].file,
                  "imagemob": Motiv[selected].product.products_var[0].filemob,
                  'products_var': [
                      {
                        'title': '',
                        'price': '0',
                        'file': Motiv[selected].product.products_var[0].file,
                        'filemob': Motiv[selected].product.products_var[0].filemob
                      }
                    ]
                   
                }
                    dispatch({
                        type: 'REMOVE_ITEM',
                        payload: select
                      })
                      dispatch({
                        type: 'GIFTS_SELECT',
                        payload: null
                      })
              }
            
            
            
          }else{
            // if(total>400){
            //   if(total<500){
            //     setShowModal(true)
            //   }
            // }
            // if(total>800){
            //   if(total<900){
            //     setShowModal(true)
            //   }
            // }
            // if(total>1100){
            //   if(total<1300){
            //     setShowModal(true)
            //   }
            // }
          }
          if(promocodeAccept){
            promoCheck()
          }
        
          if(!Load){
            let url = 'https://admin.foodsurf.ru/api/public/motivation';
            axios.get(url)
              .then(
                (result) => {
                  setMotiv(result.data)
                  const c = result.data.length
                  setHc(result.data[0].min/100+0.5)
                  // console.log(result.data[c-1].min/100)
                  // console.log(result.data[0].min/100+0.5)
                  setH((total / result.data[0].min/100+0.5))
                  dispatch({
                    type: 'MOTIV_LIST',
                    payload: result.data
                  })
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                 
                }
              )
            setLoad(true)
          }
        
      })
      
      
   
return (
    <>
    {showGift ? <LoginModal setShowGift={setShowGift} data={Motiv}/> : null}
    {/* {mainMotivModalHiden ? <MotivModal setShowModal={setShowModal} /> : null} */}
    
      <div className={show ? 'motivs__btn motivs__btn--active' :'motivs__btn'} onClick={() => setshow(!show)}>
    {show ? (
        <svg viewBox="0 0 66.037 66.9657">
	                <svg viewBox="0 0 129 129" enable-background="new 0 0 129 129">
	                  <path d="M7.6,121.4c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2l51.1-51.1l51.1,51.1c0.8,0.8,1.8,1.2,2.9,1.2c1,0,2.1-0.4,2.9-1.2   c1.6-1.6,1.6-4.2,0-5.8L70.3,64.5l51.1-51.1c1.6-1.6,1.6-4.2,0-5.8s-4.2-1.6-5.8,0L64.5,58.7L13.4,7.6C11.8,6,9.2,6,7.6,7.6   s-1.6,4.2,0,5.8l51.1,51.1L7.6,115.6C6,117.2,6,119.8,7.6,121.4z"></path>
	                </svg>
	              </svg>
    ): (
        <svg viewBox="0 0 512 512" className="animated infinite tada"><path d="m393.2,105.9c9.3-10 15.1-23.6 15.1-38.6 0-31.3-25-56.3-55.3-56.3-23,0-76,34.4-97.2,65.3-21.9-30.9-74.7-64.3-96.8-64.3-30.2,0-55.3,25-55.3,56.3 0,14.5 5.4,27.6 14.1,37.5h-106.8v134.5h29.2v260.7h153.3 125.1 153.3v-260.6h29.1v-134.5h-107.8zm-40.2-74c18.8-7.10543e-15 34.4,15.6 34.4,36.5 0,17.6-12.3,32.7-28.2,35.9h-84.6c-5.4-1.6-7.1-3.5-7.1-4.6 0-17.8 62.5-67.8 85.5-67.8zm-194-0c21.9,0 85.5,50 85.5,67.8 0,1.6-3.7,3.4-6.4,4.6h-85.2c-15.9-3.2-28.2-18.3-28.2-35.9-0.1-19.9 15.6-36.5 34.3-36.5zm34.4,448.2h-132.4v-239.7h132.4v239.7zm0-259.5h-161.5v-93.8h161.6v93.8zm104.2,259.5h-83.4v-353.4h83.4v353.4zm153.3,0h-132.4v-239.7h132.4v239.7zm29.1-259.5h-161.5v-93.8h161.6v93.8z"></path></svg>
    )}
    
    </div>
    <div className={show ? 'motivs motivs--active' :'motivs'} >

        <div className='counter'>
            <div className='counter--value' style={{height: h+'%'}}></div>

        </div>
        <div className='motivs__list'>
          {Motiv.map(m => {
            mc = mc - 1
            return (
              <div key={mc} className={total >= m.min ? 'motivs__card motivs__card--active motivs__card--v'+(mc+1): 'motivs__card'}>
              <div className='badge'>
                  <svg viewBox="0 0 32 32"><path d="M26.899,9C26.436,6.718,24.419,5,22,5H10C7.581,5,5.564,6.718,5.101,9H0l3,13c0,2.761,2.239,5,5,5h16c2.761,0,5-2.239,5-5 l3-13H26.899z M10,7h12c1.304,0,2.403,0.837,2.816,2H7.184C7.597,7.837,8.696,7,10,7z M27,22c-0.398,1.838-1.343,3-3,3H8 c-1.657,0-2.734-1.343-3-3L2.563,11H5v1h2v-1h18v1h2v-1h2.437L27,22z M10,21h12v-2H10V21z M9,17h14v-2H9V17z"></path></svg>
                  <span className="price">&gt;{m.min}<span className="currency"> Р</span></span>
                  
              </div>
              {total < m.min ? (<p className='motivs__button motivs__button--hidden' >Выбрать</p>) : ( <p className='motivs__button' onClick={() => {setShowGift(true), setshow(false)}}>Выбрать</p>)}

          </div>
            )
          }
           
          )}
            
            

            
        </div>

    </div>

    
    </>
)
}

export default MotivationSmall