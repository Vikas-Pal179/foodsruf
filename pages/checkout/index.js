import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head'
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'

import Image from 'next/image'
const MotModal = ({setShowGift, show, setNo, motiv}) => {
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

    setShowGift(false)
    show(true)
    setNo(true)
	}
 	const select = async (ms) => {
    
		const select = {
           
                "id": motiv._id,
                "title": motiv.product.products_var[0].title,
                "descript": null,
                "type": "gift",
                "price": "0",
                "image": motiv.product.products_var[0].file,
                "imagemob": motiv.product.products_var[0].filemob,
                'products_var': [
                    {
                      'title': '',
                      'price': '0',
                      'file': motiv.product.products_var[0].file,
                      'filemob': motiv.product.products_var[0].filemob
                    }
                  ]
           
        }
        dispatch({
            type: 'ADD_ITEM',
            payload: select
          })
        dispatch({
            type: 'GIFTS_SELECT',
            payload: '1'
          })
	}
    
 	const reselect = async (ms) => {

		const select = {
           
      "id": motiv._id,
      "title": motiv.product.products_var[0].title,
      "descript": null,
      "type": "gift",
      "price": "0",
      "image": motiv.product.products_var[0].file,
      "imagemob": motiv.product.products_var[0].filemob,
      'products_var': [
          {
            'title': '',
            'price': '0',
            'file': motiv.product.products_var[0].file,
            'filemob': motiv.product.products_var[0].filemob
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
	}

	let mc = 0
	
	
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
                        <div className={motiv.length === 3 ? "login-popup__content gifts__list": 'login-popup__content giftss__list'}>
                        
                        {motiv.map(item => {
                          mc = mc+1
                          return (
                            <div key={mc-1} className='gifts__card'>
                            <div className='gifts__cardImage' >
        
                            <Image
                                src={'https://file.foodsurf.ru/'+item.product.products_var[0].file}
                                alt={'title'}
                                className='gifts__cardImage__image'
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
                                  cartPromoAccept ? (<p>Подарок нельзя использвать вместе с промокодом!</p>) : total < item.min ? (
                                    <p>Доступно при заказе от {item.min} р</p>
                                ): (
                                    selected !== null ? (
                                    selected === mc-1 ? (
                                        <button variant="primary" onClick={()=> reselect(mc-1)}>Выбрать другой</button>
                                    ):(
                                      <button variant="primary motiv-dis" className='button__disable'>Выбрать</button>
                                    )
                                    

                                    ): (
                                        <button variant="primary" onClick={()=> {select(mc-1),closeModal()}}>Выбрать</button>
                                        
                                    )
                                )
                                )
                              }

                                
                                </div>
                                </div>
                            
                                
                            
                            
                            
                            </div>
                        </div>
                          )
                        })}
                        {/* <div className='gifts__card'>
                            <div className='gifts__cardImage' >
        
                            <Image
                                src={'https://file.foodsurf.ru/product-chikentar.jpg'}
                                alt={'title'}
                                className='gifts__cardImage__image'
                                width={500}
                                height={500}
                            />
                            </div>
                            
                            <div className='cardTextBlock'>
                            <h4>Чикен тар</h4>
                            <p className='card-decritp'></p>
                            
                            
                                <div className='card-bottom'>
                            
                                <div className='row'>
                                { window.location.pathname === '/checkout/2' ? (<p>На странице оформления заказа нельзя добавить подарок</p>):(
                                  cartPromoAccept ? (<p>Подарок нельзя использвать вместе с промокодом!</p>) : total < 1300 ? (
                                    <p>Доступно при заказе от 1300 р</p>
                                ): (
                                    selected !== null ? (
                                    selected === '2' ? (
                                        <button variant="primary" onClick={()=> reselect2()}>Выбрать другой</button>
                                    ):(
                                      <button variant="primary motiv-dis" className='button__disable'>Выбрать</button>
                                    )
                                    

                                    ): (
                                        <button variant="primary" onClick={()=> {select2(),closeModal()}}>Выбрать</button>
                                        
                                    )
                                )
                                )
                              }

                                
                                </div>
                                </div>
                            
                                
                            
                            
                            
                            </div>
                        </div>
                        <div className='gifts__card'>
                            <div className='gifts__cardImage' >
        
                            <Image
                                src={'https://file.foodsurf.ru/product-nagets6.jpg'}
                                alt={'title'}
                                className='gifts__cardImage__image'
                                width={500}
                                height={500}
                            />
                            </div>
                            
                            <div className='cardTextBlock'>
                            <h4>Наггетсы</h4>
                            <p className='card-decritp'>6шт</p>
                            
                            
                                <div className='card-bottom'>
                            
                                <div className='row'>
                                { window.location.pathname === '/checkout/2' ? (<p>На странице оформления заказа нельзя добавить подарок</p>):(cartPromoAccept ? (<p>Подарок нельзя использвать вместе с промокодом!</p>) : total < 900 ? (
                                    <p>Доступно при заказе от 900 р</p>
                                ): (
                                    selected !== null ? (
                                    selected === '3' ? (
                                        <button variant="primary" onClick={()=> reselect3()}>Выбрать другой</button>
                                    ):(
                                      <button variant="primary" className='button__disable'>Выбрать</button>
                                    )
                                    
                                    

                                    ): (
                                        <button variant="primary" onClick={()=> {select3(),closeModal()}}>Выбрать</button>
                                        
                                    )
                                ))}
                                
                                </div>
                                </div>
                            
                                
                            
                            
                            
                            </div>
                        </div>
                        <div className='gifts__card'>
                            <div className='gifts__cardImage' >
        
                            <Image
                                src={'https://file.foodsurf.ru/cupon.jpg'}
                                alt={'title'}
                                className='gifts__cardImage__image'
                                width={500}
                                height={500}
                            />
                            </div>
                            
                            <div className='cardTextBlock'>
                            <h4>Купон на скидку 10%</h4>
                            <p className='card-decritp'></p>
                            
                            
                                <div className='card-bottom'>
                            
                                <div className='row'>

                                { window.location.pathname === '/checkout/2' ? (<p>На странице оформления заказа нельзя добавить подарок</p>):(
                                  cartPromoAccept ? (<p>Подарок нельзя использвать вместе с промокодом!</p>) : total < 500 ? (
                                    <p>Доступно при заказе от 500 р</p>
                                ): (
                                    selected !== null ? (
                                    selected === '4' ? (
                                        <button variant="primary" onClick={()=> reselect4()}>Выбрать другой</button>
                                    ):(
                                      <button variant="primary"  className='button__disable'>Выбрать</button>
                                    )
                                    
                                    

                                    ): (
                                        <button variant="primary" onClick={()=> {select4(),closeModal()}}>Выбрать</button>
                                        
                                    )
                                ))}
                                
                                </div>
                                </div>
                            
                                
                            
                            
                            
                            </div> 
                        </div>*/}
                        


						</div>
            <button onClick={()=> {closeModal()}} className="primary-orange  button button_large">Нет спасибо / Заказ на вынос</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	  );
}
const LoginModal = ({setLogin}) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [code, setCode] = useState(false)
	const [codes, setCodes] = useState('')
	const [phone, setPhone] = useState('+7')
	const [error, setError] = useState(false)
 	const closeModal = () => {

		setLogin(false)
	}

	const submit = async event=> {
		event.preventDefault()


		let authData = {
			phone, codes, type: 1,
			
		  };
		 
	  
		  let url = 'https://admin.foodsurf.ru/api/public/user/auth'
	  
		  if (code) {
			authData = {
			  phone, codes, type: 2,
			  
			};
		  }
		  
		  try {
			
	  
	  
			if(code !== true ){
			  setCode(true);
			  const response = await axios.post(url, authData);
			} else {
			  const response = await axios.post(url, authData);
			  
        const data = response.data;

        if(data.status !== 'false'){
			  const user = {
				_id: data.userf._id,
				name: data.userf.name,
				email: data.userf.email,
				dates: data.userf.date_birstday,
				month: data.userf.month_birstday,
				// localid: user.localid,
				phone: data.userf.phone,
        adress: data.adres,
        bonus: data.userf.bonus_bal
			  };

		  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
	  
	  
		  localStorage.setItem('localid', data.userf._id);
		  localStorage.setItem('expirationDate', expirationDate);
		  
		  dispatch({
			type: 'SET_CURRENT_USER',
			payload: user
		  })
		  if(window.location.pathname === '/checkout'){
			
		  }
		  else{
			if(user.name == null){
				router.push({
					pathname: '/user',
	
				  })
			}
			if(user.email == null){
				router.push({
					pathname: '/user',
	
				  })
			}
		  }
		  setLogin(false)
		  
		  setCode(false)
		  setCodes('')
		  setPhone('')
		
		  
			  } else {
				setCodes('')
				setError(true)
				
			  }
			}
		  
		  } catch (error) {
			console.log(error);
		  }
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
							<h2 className="title title_h1">Вход на сайт</h2>
						</div>
						<div className="login-popup__content">
							<form onSubmit={submit}>
							<div className="login-popup__phone">
								<div className="error-tooltip-wrapper">

								{code ? null : <><p style={{margin: 0}}>Номер телефона</p><input
								  name='phone'
								  type='tel'
								  className='input input'
								  onChange={(text) => setPhone(text.target.value)}

								  value={phone}
								  label='Номер телефона'
								  placeholder="+7 999 999-99-99"
								  maxLength='12'
								  required
								/></>}
								{code === true && <><p style={{margin: 0}}>Код из смс</p><input
								  name='codes'
                  type='text'
                  className='input input'
								  onChange={(text) => setCodes(text.target.value)}
								  value={codes}
								  label='Код подтверждения'
								  placeholder="1234"
								  maxLength='4'
								  required
								/></>}
								{error === true && (<p>Неверный код из СМС</p>)}
									
								</div>
							</div>
							
							<button onClick={submit} type='submit' className="primary-orange login-popup-button button button_large">{code ? null : 'Выслать код'}{code === true && 'Авторизоваться' }</button>
							</form>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	  );
}
const Modal = ({show}) => {
  const router = useRouter()
  const [types, setTypes] = useState(false)
  
  const [samId, setSamId] = useState(2)
  const selected = useSelector((state) => state.cart.gifts_select)
  const currentUser = useSelector((state) => state.user.currentUser)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const motivMin = useSelector((state) => state.cart.motiv)
  const [_id, setId] = useState(Math.random().toString(36).substring(2, 15)+ new Date().getTime())
  const [userAdres, setuserAdres] = useState('new')
  const [street, setStreet] = useState('')
  const [house, sethouse] = useState('')
  const [flat, setflat] = useState('')
  const [doorway, setdoorway] = useState('')
  const [doorwayCode, setdoorwayCode] = useState('')
  const [floor, setfloor] = useState('')
  const [adressName, setadressName] = useState('')
  const [comment, setcomment] = useState('')
  const [inew, setinew] = useState(true)
  const [streetIsValid, setstreetIsValid] = useState(false)
  const [houseIsValid, sethouseIsValid] = useState(false)
  const [c, setC] = useState(false)
  const total = cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
  const newadres = () => {
    setId(Math.random().toString(36).substring(2, 15)+ new Date().getTime())
    setuserAdres('new')
    setStreet('');
    sethouse('');
    setflat('');
    setdoorway('');
    setdoorwayCode('');
    setfloor('');
    setadressName('');
    setcomment('');

    setstreetIsValid(false);
    sethouseIsValid(false);
  }
  const dispatch = useDispatch()
  let select = {}
  if(selected==='2') {
    select = {
      "id": "chikentar",
      "title": "Чикен тар",
      "descript": null,
      "type": "gift",
      "price": "0",
      "image": "product-chikentar.jpg",
      "imagemob": "product-chikentar.jpg",
      'products_var': [
          {
            'title': '',
            'price': '0',
            'file': 'product-chikentar.jpg',
            'filemob': 'product-chikentar.jpg'
          }
        ]
       
    
    }
  }
  if(selected==='3') {
    select = {
      "id": "freenag6",
      "title": "Наггетсы 6шт",
      "descript": null,
      "type": "gift",
      "price": "0",
      "image": "product-nagets6.jpg",
      "imagemob": "product-nagets6.jpg",
      'products_var': [
          {
            'title': '',
            'price': '0',
            'file': 'product-nagets6.jpg',
            'filemob': 'product-nagets6.jpg'
          }
        ]
       
    
    }
  }
  if(selected==='4') {
    select = {
      "id": "coupon",
      "title": "Купон на скидку 10%",
      "descript": null,
      "type": "gift",
      "price": "0",
      "image": "cupon.jpg",
      "imagemob": "cupon.jpg",
      'products_var': [
          {
            'title': '10%',
            'price': '0',
            'file': 'cupon.jpg',
            'filemob': 'cupon.jpg'
          }
        ]
       
    
    }
  }
  const selectAdr = () => {
    if(types){
      // console.log(samId)
      dispatch({
        type: 'SELECT_ADRESS',
        payload: {
          types: types,
          _id: samId,
          street: street
        }

      })
      if(selected){
        dispatch({
          type: 'REMOVE_ITEM',
          payload: select
        })
        dispatch({
          type: 'GIFTS_SELECT',
          payload: null
        })
      }
      
      router.push({
        pathname: '/checkout/2',
    
      })
      scroll.scrollToTop();
    }else{
      
      if(!streetIsValid) {
        return;
      }
      if(!houseIsValid) {
        return;
      }
      const it = {
        _id:_id,
        userAdres:userAdres,
        types: types,
        street: street,
        house: house,
        flat: flat,
        doorway: doorway,
        doorwayCode: doorwayCode,
        floor: floor,
        adressName: adressName,
        comment: comment,
        
      }
      dispatch({
        type: 'SELECT_ADRESS',
        payload: it
      })
      if(selected){

          if(total< motivMin){
            dispatch({
              type: 'REMOVE_ITEM',
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

        
        
      }
      router.push({
        pathname: '/checkout/2',
    
      })

      scroll.scrollToTop();
    }
  }
  const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
} 
  const close = async () => {
    setC(true)
    await timeout(200)
    show(false)
    scroll.scrollToTop()
  }

  const changeStreet = (value) => {
    if(value.trim().length === 0 || value.trim().length < 3) {
     setstreetIsValid(false)

    }else{
      setstreetIsValid(true)
    }
    setStreet(value)
  }
  const changeHouse = (value) => {
    if(value.trim().length === 0 || value.trim().length < 1) {
     sethouseIsValid(false)

    }else{
      sethouseIsValid(true)
    }
    sethouse(value)
  }
  const setAdr = async (adres) => {
    // console.log(adres)
    setId(adres._id)
    setuserAdres('')
    setStreet(adres.street)
    sethouse(adres.house)
    setflat(adres.flat)
    setdoorway(adres.ent)
    setdoorwayCode(adres.inc)
    setfloor(adres.flour)
    setadressName(adres.adressName)
    setcomment(adres.comment)
    
    setstreetIsValid(true)
    sethouseIsValid(true)
  }
  
  return (

  
    <div className="popup__container">
    <div className="popup__container-overlay" onClick={()=>close()} ></div>
  <div className="popup__container-content" style={c ? {overflowY: 'scroll', opacity: 0, transition: 'opacity 0.15s ease 0s'}:{overflowY: 'scroll', opacity: 1, transition: 'opacity 0.15s ease 0s'}}>
  <div className={c ? "popup__dialog popup__dialog_transition-out": "popup__dialog popup__dialog_transition-in"}>
      <div  className="popup__dialog-inner">
        <i onClick={()=>close()} data-testid="popup__dialog-close" className="svg-icon popup__dialog-close"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path  d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path>
        </svg>
      </i>
      <div className="order-type-popup">
        <div className="order-type-popup__header">
          <h2 className="order-type-popup__title title title_h1" data-testid="order-type-popup__title">Куда доставить?</h2>
        </div>
        <div className="order-type-popup__content">
          <div className="order-type-popup__address">
            <div className="order-type-popup__tabs">
              <ul className="tab">
                <li  className={types ? 'tab__item' : "tab__item tab__item_active"}>
                  <button onClick={()=> {setTypes(false), setuserAdres('new'), setStreet('')}} name="types" value="false" type="button" className="tab__link" data-testid="tab__item_delivery-button">Доставка</button>
                </li>
                <li className={types ?  'tab__item tab__item_active' : "tab__item"}>
                  <button onClick={()=> {setTypes(true),setSamId(2), setStreet('В зале')}} name="types" value="true" type="button" className="tab__link" data-testid="tab__item_carryout-button">На вынос</button>
                </li>
              </ul>
            </div>
            {types ? (
              <div className="order-type-form__carryout-form" data-testid="carryout-form">
              <h3>Мы находимся по адресу: Энгельс Ул. Тельмана, 137, ТЦ Аврора</h3>
              {selected? (
                <p>При выборе на вынос и в зале подарочная система не действует!</p>
              ):null}
                <div className="scroll">
                  <div className="scroll__gradient scroll__gradient_top" style={{transform: 'translateY(-100%) translateZ(0px)', opacity: '0'}}></div>
                  <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 'auto', minHeight: '0px', maxHeight: '328px',}}>
                    <div style={{position: 'relative', overflow: 'scroll', marginRight: '0px', marginBottom: '0px', minHeight: '0px', maxHeight: '328px', paddingBottom: '3px',}}>
                      <div className="order-type-form__carryout-form-content">
                        <div className="order-type-form__carryout-form-pizzeria">
                          <div className="order-type-form__carryout-form-pizzeria-info">
                            <div className="order-type-form__carryout-form-category"><input onClick={() => {setSamId(1), setStreet('С собой')}} type="radio" name="carryoutPizzeria" id="pizzeria_0000002c-0000-0000-0000-0000000000001" className="radio-button__input" value="0000002c-0000-0000-0000-0000000000001"  />
                            <label onClick={() => {setSamId(1), setStreet('С собой')}}
                            htmlFor="pizzeria_0000002c-0000-0000-0000-0000000000001" className="radio-button__label">С собой</label></div>
                            <div className="order-type-form__carryout-form-address"></div>
                          </div>
                          <div></div>
                          <div className="order-type-form__carryout-form-schedule">

                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{position: 'relative', overflow: 'scroll', marginRight: '0px', marginBottom: '0px', minHeight: '0px', maxHeight: '328px', paddingBottom: '3px',}}>
                      <div className="order-type-form__carryout-form-content">
                        <div className="order-type-form__carryout-form-pizzeria">
                          <div className="order-type-form__carryout-form-pizzeria-info">
                            <div className="order-type-form__carryout-form-category"><input onClick={() => {setSamId(2), setStreet('В зале')}} type="radio" name="carryoutPizzeria" id="pizzeria_0000002c-0000-0000-0000-0000000000002" className="radio-button__input" value="0000002c-0000-0000-0000-0000000000002" defaultChecked /><label onClick={() => {setSamId(2), setStreet('В зале')}} htmlFor="pizzeria_0000002c-0000-0000-0000-0000000000002" className="radio-button__label">В зале</label></div>
                            <div className="order-type-form__carryout-form-address"></div>
                          </div>
                          <div></div>
                          <div className="order-type-form__carryout-form-schedule">

                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{position: 'absolute', height: '6px', display: 'none', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px',}}>
                      <div style={{position: 'relative', display: 'block', height: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)',}}></div>
                    </div>
                    <div style={{position: 'absolute', width: '6px', display: 'none', right: '2px', bottom: '2px', top: '2px', borderRadius: '3px',}}>
                      <div className="scroll__scrollbar" style={{position: 'relative', display: 'block', width: '100%',}}></div>
                    </div>
                  </div>
                  <div className="scroll__gradient" style={{transform: 'translateY(100%) translateZ(0px)', opacity: '0',}}></div>
                </div>
              </div>
              ) : (
                <div className="order-type-form" data-testid="delivery-form">
                  <div>
                  {currentUser.adress ? currentUser.adress.map(adres => (
                    <div key={adres._id} className="order-type-form__client-address-pizzeria">
                      <div className="order-type-form__client-address-pizzeria-info">
                        <div className="order-type-form__client-address-category">

                        {_id ===  adres._id ? (<input  onClick={() => setAdr(adres)} defaultChecked type="radio" data-testid={userAdres} data-testnane='null' id={adres._id} className="radio-button__input" name='userAdres' value={adres._id} />): (<input  onClick={() => setAdr(adres)} data-testnane='null2' data-testid={userAdres}  type="radio" id={adres._id} className="radio-button__input" name='userAdres' value={adres._id} />)}
                            <label onClick={() => setAdr(adres)} data-testid="delivery-or-carry-out-form__client-address-form-address" htmlFor={adres.id} className=" radio-button__label">ул.{adres.street}, д.{adres.house}{adres.flat? (', кв.'+adres.flat): null}{adres.floor ? (', э.'+adres.floor): null}{adres.doorway ? (', под.'+adres.doorway): null} {adres.adressName ? (<b className='adresname'>{adres.adressName}</b>): null}</label>
                            </div>
                        </div>
                    </div>
                  )): null}
                  
                  
                    <div className="order-type-form__client-address-pizzeria">
                      <div className="order-type-form__client-address-pizzeria-info">
                        <div className="order-type-form__client-address-category">
                          {userAdres==='new' ? (<input defaultChecked onChange={() => setuserAdres('new')} type="radio" id="new_address" name='userAdres' className="radio-button__input" value="new" />) : (<input   type="radio" id="new_address" name='userAdres' className="radio-button__input" value="new" />)}
                          <label onClick={() => newadres()} htmlFor="new_address" className=" radio-button__label">Добавить новый адрес</label>
                            
                        </div>
                      </div>
                    </div>
  
                  </div>
                  {userAdres==='new' ? (
                    <div>
                      <div className="form__row">
                        <div className="form__col form__col_padtop form__col_4-3">
                          <div className="error-tooltip-wrapper">
                            <div className="">
                              <div className="validation-wrapper">
                                <input onChange={(text)=> changeStreet(text.target.value)} placeholder="Улица" id="strt-input" data-testid="delivery-form_street-input" name="street" type="text" autoComplete="off" className={streetIsValid ? 'input': 'input input_error'} value={street} />
                              </div>
                              <ul className="suggestions order-type-form__list_error"></ul>
                            </div>
                          </div>
                        </div>
                        <div className="form__col form__col_padtop form__col_4-1">
                          <div className="error-tooltip-wrapper">
                            <div className="">
                              <div className="validation-wrapper">
                                <input onChange={(text)=> changeHouse(text.target.value)} disabled="" placeholder="Дом" id="hs-input" type="text" name="house" autoComplete="off" className={houseIsValid ? 'input': 'input input_error'} value={house} />
                              </div>
                              <ul className="suggestions order-type-form__list_error"></ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__col form__col_padtop form__col_4-1">
                          <div className="error-tooltip-wrapper">
                            <input onChange={(text)=> setflat(text.target.value)} autoComplete="off" placeholder="Квартира" type="text" name="flat" className="input" required="" value={flat} />
                          </div>
                        </div>
                        <div className="form__col form__col_padtop form__col_4-1">
                          <input onChange={(text)=> setdoorway(text.target.value)} autoComplete="off" placeholder="Подъезд" type="text" name="doorway" className="input" required="" value={doorway} />
                          <p onClick={() => setdoorway('Последний')} value='Последний'
                          name="doorway" className="order-type-form__link link">Последний</p>
                        </div>
                        <div className="form__col form__col_padtop form__col_4-1">
                          <input onChange={(text)=> setdoorwayCode(text.target.value)} autoComplete="off" placeholder="Код двери" type="text" name="doorwayCode" className="input" required="" value={doorwayCode} />
                          <a onClick={() => setdoorwayCode('Домофон')} value='Домофон' name="doorwayCode" className="order-type-form__link link">Домофон</a>
                        </div>
                        <div className="form__col form__col_padtop form__col_4-1">
                          <input onChange={(text)=> setfloor(text.target.value)} autoComplete="off" placeholder="Этаж" type="text" name="floor" className="input" required="" value={floor} />
                          <a onClick={() => setfloor('Последний')} value='Последний' name="floor" className="order-type-form__link link">Последний</a>
                        </div>
                      </div>
                      <div className="form__row">
                        <div className="form__col form__col_padtop form__col_4-4">
                          <input onChange={(text)=> setadressName(text.target.value)} autoComplete="off" placeholder="Название адреса" name="adressName" type="text" className="input" required="" value={adressName} />Например, <a onClick={() => setadressName('Дом')} value='Дом' name="adressName" className="order-type-form__link link">Дом</a> или <a onClick={() => setadressName('Работа')} value='Работа' name="adressName" className="order-type-form__link link">Работа</a>
                        </div>
                      </div>
                    </div>
                    ) : null }
                  <div className="form__row">
                    <div className="form__col form__col_padtop form__col_4-4">
                      <textarea onChange={(text)=> setcomment(text.target.value)} data-testid="address-comment-input" name="comment" placeholder="Комментарий к адресу" className="textarea" maxLength="254" rows="3" required="" value={comment}></textarea>
                    </div>
                  </div>
                </div>
                )}
              <div className="order-type-form__carryout-form-actions">
              {types? ( <button onClick={()=>selectAdr()} type="button" data-testid="order-type-form__button" className="order-type-form__button button button_primary button_large">Подтвердить</button>):(<button onClick={()=>selectAdr()} type="button" data-testid="order-type-form__button" className="order-type-form__button button button_primary button_large">Подтвердить адрес</button>)}
              </div>
              
            </div>
            
            
          </div>
        </div>
      </div>
      
    </div>

  </div>
</div>
  )
}
const checkoutPageIndex = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [promoError, setPromoError] = useState(false)
    const [no, setNo] = useState(false)
    const [showGift, setShowGift] = useState(false)
    const [promoErrorText, setPromoErrorText] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const selected = useSelector((state) => state.cart.gifts_select)
    const cartPromocode = useSelector((state) => state.cart.cartPromocode)
    const cartPromocodeItem = useSelector((state) => state.cart.cartPromocodeItem)
    const [promo, setPromo] = useState('')
    const [login, setLogin] = useState(false)
    const [L, setL] = useState(false)
    const [moti, setMoti] = useState([])
    const [diltime, setdiltime] = useState(false)
    const user = useSelector((state) => state.user.currentUser)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const promocodeAccept = useSelector((state) => state.cart.cartPromoAccept)
    
    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
    const totalq = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity,
        0
      )
    const removeItem = (item) => {
      
        dispatch({
            type: 'REMOVE_ITEM',
            payload: item
          })
          // console.log(item)
          // console.log(total)
          // if(total-parseInt(item.price, 10)> 399) {
          //   if(total-parseInt(item.price, 10) < 500) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          // if(total-parseInt(item.price, 10) > 799) {
          //   if(total-parseInt(item.price, 10) < 900) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          // if(total-parseInt(item.price, 10) > 1099) {
          //   if(total-parseInt(item.price, 10) < 1300) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          setNo(false)
    }
    const addItem = (item) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: item
          })
          // if(total+parseInt(item.price, 10)> 399) {
          //   if(total+parseInt(item.price, 10) < 500) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          // if(total+parseInt(item.price, 10) > 799) {
          //   if(total+parseInt(item.price, 10) < 900) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          // if(total+parseInt(item.price, 10) > 1099) {
          //   if(total+parseInt(item.price, 10) < 1300) {
          //     dispatch({
          //       type: 'MAIN_MOTIV_MODAL',
          //     })
          //   }
          // }
          setNo(false)
    }
    const clearItem = (item) => {
        dispatch({
            type: 'CLEAR_ITEM_FROM_CART',
            payload: item
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
        code: promo,
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

          setPromoErrorText('Вы уже совершали первый заказ!');
        setPromoError(true)
        }else if(response.data.status==='Hight Total busket'){

          setPromoErrorText('Превышена максимальная сумма корзины для заказа с этим промокодом!');
        setPromoError(true)
        
        }else if(response.data.status==='Low Total busket'){

          setPromoErrorText('У вас не соответсвует минимальная сумма корзины для заказа с этим промокодом!');
          setPromoError(true)
        
        }else if(response.data.status==='Not Permit app'){

          setPromoErrorText('Данный промокод не действителен на сайте!');
          setPromoError(true)
        }else if(response.data.status==='Not Active'){
          Alert.alert('Ошибка!', 'Промокод не доступен сейчас!');
          setPromoErrorText('Промокод не доступен сейчас!');
          setPromoError(true)
        }else if(response.data.status==='Not Found'){

          setPromoErrorText('Промокод не найден!');
          setPromoError(true)
        }else if(response.data.status==='Not Login'){
          setPromoErrorText('Пожалуйста войдите!');
          setPromoError(true)
        }
        
        
      }else{
        const it = response.data.promo.product

        const i = {
          _id: it._id,
          title: it.title,

          descriptl: it.descriptl,
          descript: '',
          sostav: it.structure,
          products_var: it.products_var,
          sku: it.sku,
          parrent: '',
          type: 'gift',
          image: it.products_var[0].file,
          imagemob: it.products_var[0].filemob,
          price: 0,

    
        }
        addItem(i);
        dispatch({
          type: 'PROMOCODE',
          payload: promo
        })
        dispatch({
          type: 'PROMOCODE_ITEM',
          payload: i
        })
        dispatch({
          type: 'PROMOCODE_ACCEPT',

        })
        
        
      }

		
    } catch (error) {
      console.log(error);
    };
  }
  const getMotiv = async () =>{
		let url = 'https://admin.foodsurf.ru/api/public/motivation';
        
        try {
          const response = await axios.get(url);
          // console.log(response.data)
          setMoti(response.data)
          


        } catch (error) {
        
        };
  
  }
  if(!L){
    getMotiv()
    setL(true)
  }
  const delpromo = () => {
    // console.log(cartPromocodeItem)
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
  const check = () => {
    if(no){
      setModalShow(true)
    }else{
      if(selected){
        setModalShow(true)
      }
      else{
        if(moti.length >= 1){
          setShowGift(true)
        }else{
          setModalShow(true)
        }
       
      }
    }
    
    
  }

    return (
        <>
        <Head>
         <title>Корзина - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className="checkout-page">
        <div className='container'>    
    <h2 className="cart__title title title_h1">Корзина</h2>
    <div className="cart__promocode">
        <div className="promocode">
            <div className="promocode__control">
                
                <div className="promocode__input-wrapper">
								{promocodeAccept ? (<input disabled name="promocode" data-testid="promocode__input" className="promocode__input input input_no-right-radius" placeholder="Введите промокод" value={cartPromocode}/>) : (<input onChange={(text)=> setPromo(text.target.value)} name="promocode" data-testid="promocode__input" className="promocode__input input input_no-right-radius" placeholder="Введите промокод" value={promo}/>)}

                    <div>
										<div className="tooltip-base promocode__tooltip promocode__tooltip_warning tooltip-base_shown" data-testid="">
										{promoError ? (<div className="tooltip-base__content">
											<i className="svg-icon tooltip__pointer tooltip__pointer_default">
												<svg viewBox="0 0 18 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
													<path transform="translate(-2 0)" fillRule="evenodd" d="M 9.52569 1.60834L 3.07216 8.64855C 1.89626 9.93135 2.80626 12 4.54647 12L 17.4535 12C 19.1937 12 20.1037 9.93135 18.9278 8.64855L 12.4743 1.60834C 11.6816 0.743602 10.3184 0.743603 9.52569 1.60834Z"></path>
												</svg>
											</i>
											<div className="tooltip__content tooltip__content_default tooltip__content_with-hide-control">
													<button onClick={() => setPromoError(false)} className="tooltip__close-control" type="button">
														<i className="svg-icon tooltip__close-control-icon">
															<svg viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
															<path fill="#FFFFFF" fillOpacity="0.2" fillRule="evenodd" d="M 11 0C 4.92487 1.14941e-15 -7.1838e-16 4.92487 0 11C 8.62056e-16 17.0751 4.92487 22 11 22C 17.0751 22 22 17.0751 22 11C 22 4.92487 17.0751 -1.14941e-15 11 0Z"></path>
															<path transform="translate(6.5 6.5)" fillRule="evenodd" d="M 5.33691 4.39941L 8.60645 1.12793C 8.86426 0.870117 8.86426 0.452148 8.60645 0.193359C 8.34863 -0.0644531 7.93066 -0.0644531 7.67285 0.193359L 4.39941 3.46582L 1.12988 0.193359C 0.87207 -0.0644531 0.454102 -0.0644531 0.196289 0.193359C -0.0654297 0.452148 -0.0654297 0.870117 0.196289 1.12793L 3.46582 4.39941L 0.196289 7.67188C -0.0654297 7.92969 -0.0654297 8.34863 0.196289 8.60645C 0.454102 8.86426 0.87207 8.86426 1.12988 8.60645L 4.39941 5.33398L 7.67285 8.60645C 7.93066 8.86426 8.34863 8.86426 8.60645 8.60645C 8.86426 8.34863 8.86426 7.92969 8.60645 7.67188L 5.33691 4.39941Z"></path>
															</svg>
														</i>
													</button>
													<div className="promocode__tooltip-description">
															<div className="promocode__tooltip-text promocode__tooltip-text_warning">{promoErrorText}</div>
													</div>
											</div>
										</div>): null}
									</div>
                    </div>
                </div>
                {promocodeAccept ? (<button onClick={() => delpromo()} data-testid="promocode__button_primary" type="button" className="promocode__button button button_primary-outline button_no-left-radius">Отменить</button>) : (<button onClick={()=> promoCheck()} data-testid="promocode__button_primary" type="button" className="promocode__button button button_primary-outline button_no-left-radius">Применить</button>)}
            </div>
        </div>
    </div>
    {cartItems.length ? (
    cartItems.map(item => (
        <div key={item.id} className="cart__line" >
    <div className="cart__line-image">
        <div className="product__image product__image_meta">
        <Image
            src={'https://file.foodsurf.ru/'+item.imagemob}
            className="d-block w-100"

            alt={item.title}
            width={67}
            height={67}
            />

        </div>
    </div>
    <div className="cart__line-product">
        <div className="cart__line-name">{item.title}</div>
        <div className="cart__line-description">{item.descript}</div>
    </div>
    {item.type === 'gift' ? (
      <div className="cart__line-control">
        <div className="cart__line-control-w">
            <div className="amount-control">
                
            <div className="styled__Gift-sc-17s91h6-10 izgVcP"><i className="svg-icon"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 17C17 17.7001 17 18.0501 16.8638 18.3175C16.7439 18.5527 16.5527 18.7439 16.3175 18.8638C16.0501 19 15.7001 19 15 19H3C2.29993 19 1.9499 19 1.68251 18.8638C1.44731 18.7439 1.25608 18.5527 1.13624 18.3175C1 18.0501 1 17.7001 1 17V9.48C1 9.31198 1 9.22798 1.0327 9.1638C1.06146 9.10735 1.10735 9.06146 1.1638 9.0327C1.22798 9 1.31198 9 1.48 9H7.5C7.5 9 8 9 8 9.5V17.2C8 17.48 8 17.62 8.0545 17.727C8.10243 17.8211 8.17892 17.8976 8.273 17.9455C8.37996 18 8.51997 18 8.8 18H9.2C9.48003 18 9.62004 18 9.727 17.9455C9.82108 17.8976 9.89757 17.8211 9.9455 17.727C10 17.62 10 17.48 10 17.2V9.5C9.99986 9.0437 10.5 9 10.5 9H16.52C16.688 9 16.772 9 16.8362 9.0327C16.8926 9.06146 16.9385 9.10735 16.9673 9.1638C17 9.22798 17 9.31198 17 9.48V17Z" fill="#FF6900"></path>
            <path d="M17.1 4.4442L14.58 4.4442C15.03 3.99976 15.3 3.37753 15.3 2.66642C15.3 1.15531 14.13 -0.000244141 12.6 -0.000244141C11.7 -0.000244141 10.08 0.799756 9 1.86642C7.92 0.799756 6.3 -0.000244141 5.4 -0.000244141C3.87 -0.000244141 2.7 1.15531 2.7 2.66642C2.7 3.37753 2.97 3.99976 3.42 4.4442H0.9C0.36 4.4442 0 4.79976 0 5.33309L0 7.82198C0 7.91087 0.09 7.99976 0.18 7.99976H7.74C7.92 7.99976 8.1 7.82198 8.1 7.6442V4.79976C8.1 4.62198 8.28 4.4442 8.46 4.4442H9.54C9.72 4.4442 9.9 4.62198 9.9 4.79976V7.6442C9.9 7.82198 10.08 7.99976 10.26 7.99976H17.82C17.91 7.99976 18 7.91087 18 7.82198V5.33309C18 4.79976 17.64 4.4442 17.1 4.4442ZM5.4 3.55531C4.86 3.55531 4.5 3.19976 4.5 2.66642C4.5 2.13309 4.86 1.77753 5.4 1.77753C5.94 1.77753 7.47 3.02198 7.92 3.55531C7.65 3.6442 5.4 3.55531 5.4 3.55531ZM12.6 3.55531C12.6 3.55531 10.17 3.6442 9.9 3.55531C10.44 2.93309 12.06 1.77753 12.6 1.77753C13.14 1.77753 13.5 2.13309 13.5 2.66642C13.5 3.19976 13.14 3.55531 12.6 3.55531Z" fill="#FF6900"></path>
            <path d="M8.1 7.6442C8.1 7.82198 7.92 7.99976 7.74 7.99976H10.26C10.08 7.99976 9.9 7.82198 9.9 7.6442V4.79976C9.9 4.62198 9.72 4.4442 9.54 4.4442H8.46C8.28 4.4442 8.1 4.62198 8.1 4.79976V7.6442Z" fill="#FF6900"></path>
            </svg>
            </i>Подарок</div>
                
            </div>
        </div>
    </div>
    ) : (
      <div className="cart__line-control">
      <div className="cart__line-control-w">
          <div className="amount-control">
              <button onClick={()=> removeItem(item)} className="amount-control__switcher amount-control__switcher_remove"><span className="amount-control__switcher-icon amount-control__switcher-icon_remove"></span></button>
              <span className="amount-control__quantity"><span className="amount-control__quantity-value">{item.quantity}</span></span>
              <button onClick={() => addItem(item)} data-testid="menu__meta-product_add-control" className="amount-control__switcher amount-control__switcher_add"><span className="amount-control__switcher-icon amount-control__switcher-icon_add"></span></button>
          </div>
      </div>
  </div>
    )}
    
    <div className="cart__line-price">
        <span className="money "><span className="money__value">{item.price}</span><span className="money__currency money__currency_on-the-right"> р</span></span>
    </div>
    <div className="cart__line-delete">
        <i onClick={() => clearItem(item)} className="svg-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.75 6H5.25L5.90993 15.8047C5.97132 16.8184 6.50848 17.5 7.39863 17.5H12.6014C13.4915 17.5 14.0133 16.8184 14.0901 15.8047L14.75 6Z" fill="#373535"></path>
          <path d="M13.8498 3.00681L6.19643 3.00688C4.98382 2.88702 5.02127 4.36489 5 5L14.9917 4.99999C15.0165 4.38088 15.0624 3.12667 13.8498 3.00681Z" fill="#373535"></path>
        </svg>
        </i>
    </div>
</div>
    ))) : (
      <div className="cart__list" data-testid="cart__list">
    <div className="cart__list-empty-line">Добавьте что-нибудь из меню</div>
</div>
) }

    <div className='total'>Итог: {total} р</div>
    <div className="cart__actions checkout-form__actions">
  <a onClick={() =>  router.push({
    pathname: '/',

  })} className="cart__button cart__button_back button button_secondary button_large">Вернуться в меню</a>
  {
    !diltime ? (
    user ? (<button onClick={()=>check()} value="false" type="button" data-testid="cart__button_next" className="cart__button cart__button_next button button_primary button_large">Заказать</button>) : (<button onClick={()=>setLogin(true)}  value="false" type="button" data-testid="cart__button_next" className="cart__button cart__button_next button button_primary button_large">Заказать</button>)
    ): (<p className="cart__button cart__button_next button button_primary button_large">Оформление заказа доступно с 10 до 23</p>)
  }
</div>
</div>
</div>
{modalShow? <Modal show={setModalShow}/>:null}
{showGift? <MotModal setShowGift={setShowGift} show={setModalShow} motiv={moti} setNo={setNo} />:null}
{login ? <LoginModal setLogin={setLogin}/> : null}
        </>
    )

}
export default checkoutPageIndex;