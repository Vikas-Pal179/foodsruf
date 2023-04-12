import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
const Modal = ({show, upt, supt}) => {
  const router = useRouter()
  const [types, setTypes] = useState(false)
  const [samId, setSamId] = useState(2)
  const selected = useSelector((state) => state.cart.gifts_select)
  const currentUser = useSelector((state) => state.user.currentUser)
  const selectAdress = useSelector((state) => state.cart.selectAdres)
  const [_id, setId] = useState(Math.random().toString(36).substring(2, 15)+ new Date().getTime())
  const [userAdres, setuserAdres] = useState('new')
  const [street, setStreet] = useState('')
  const [house, sethouse] = useState('')
  const [flat, setflat] = useState('')
  const [doorway, setdoorway] = useState('')
  const [doorwayCode, setdoorwayCode] = useState('')
  const [flour, setflour] = useState('')
  const [adressName, setadressName] = useState('')
  const [comment, setcomment] = useState('')
  const [inew, setinew] = useState(true)
  const [streetIsValid, setstreetIsValid] = useState(false)
  const [houseIsValid, sethouseIsValid] = useState(false)
  const [c, setC] = useState(false)
  const [l, setL] = useState(false)
  const newadres = () => {
    setId(Math.random().toString(36).substring(2, 15)+ new Date().getTime())
    setuserAdres('new')
    setStreet('');
    sethouse('');
    setflat('');
    setdoorway('');
    setdoorwayCode('');
    setflour('');
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

      dispatch({
        type: 'SELECT_ADRESS',
        payload: {
          types: types,
          _id: samId,
          street: street
        }

      })
      dispatch({
        type: 'CLEAR_ITEM_FROM_CART',
        payload: select
      })
      dispatch({
        type: 'GIFTS_SELECT',
        payload: null
      })
      close()
    }else{
      if(!streetIsValid) {
        return;
      }
      if(!houseIsValid) {
        return;
      }
      dispatch({
        type: 'SELECT_ADRESS',
        payload: {
          _id:_id,
          userAdres:userAdres,
          types: types,
          street: street,
          house: house,
          flat: flat,
          doorway: doorway,
          doorwayCode: doorwayCode,
          flour: flour,
          adressName: adressName,
          comment: comment,
          
        }
      })
      
      close()
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

    setId(adres._id)
    setuserAdres(adres.userAdres)
    setStreet(adres.street)
    sethouse(adres.house)
    setflat(adres.flat)
    setdoorway(adres.ent)
    setdoorwayCode(adres.inc)
    setflour(adres.flour)
    setadressName(adres.adressName)
    setcomment(adres.comment)
    
    setstreetIsValid(true)
    sethouseIsValid(true)
  }
  useEffect(() => {
    if(!l){
      if(upt){
        if(selectAdress.userAdres==='new'){
          setId(selectAdress._id)
          setuserAdres(selectAdress.userAdres)
          setStreet(selectAdress.street)
          sethouse(selectAdress.house)
          setflat(selectAdress.flat)
          setdoorway(selectAdress.ent)
          setdoorwayCode(selectAdress.inc)
          setflour(selectAdress.flour)
          setadressName(selectAdress.adressName)
          setcomment(selectAdress.comment)
        }
      }else{
        if(selectAdress.types === true){
          setTypes(false)
        }else{
          setTypes(true)
        }
      }
    }
    setL(true)
    
  })
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
                  <button onClick={()=> {setTypes(true), setSamId(2), setStreet('В зале')}} name="types" value="true" type="button" className="tab__link" data-testid="tab__item_carryout-button">На вынос</button>
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
                    <div key={adres.id} className="order-type-form__client-address-pizzeria">
                      <div className="order-type-form__client-address-pizzeria-info">
                        <div className="order-type-form__client-address-category">

                        {_id ===  adres._id ? (<input  defaultChecked type="radio" data-testid={userAdres} data-testnane='null' id={adres._id} className="radio-button__input" name='userAdres' value={adres._id} />): (<input data-testnane='null2' data-testid={userAdres}  type="radio" id={adres._id} className="radio-button__input" name='userAdres' value={adres._id} />)}
                            <label onClick={() => setAdr(adres)} data-testid="delivery-or-carry-out-form__client-address-form-address" for={adres.id} className=" radio-button__label">ул.{adres.street}, д.{adres.house}{adres.flat !== null ? (', кв.'+adres.flat): null}{adres.flour !== null ? (', э.'+adres.flour): null}{adres.doorway !== null ? (', под.'+adres.doorway): null} {adres.adressName !== null ? (<b className='adresname'>{adres.adressName}</b>): null}</label>
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
                          <input onChange={(text)=> setflour(text.target.value)} autoComplete="off" placeholder="Этаж" type="text" name="flour" className="input" required="" value={flour} />
                          <a onClick={() => setflour('Последний')} value='Последний' name="flour" className="order-type-form__link link">Последний</a>
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
const checkoutPageTwo = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const cart = useSelector((state) => state.cart)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const selectAdress = useSelector((state) => state.cart.selectAdres)
    const promocodeAccept = useSelector((state) => state.cart.cartPromoAccept)
    let user = useSelector((state) => state.user.currentUser)
    if (typeof window !== 'undefined') {
     
    }else {
      user = {
          name: '',
          phone: '',
          bonus: 0
       }
     }
    
    const [name, setName] = useState(user.name)
    const [promoError, setPromoError] = useState(false)
    const [promocode, setPromo] = useState('')
    const [phone, setPhone] = useState(user.phone)
    const [sdacha, setSdacha] = useState(0)
    const [nosdacha, setNosdacha] = useState(false)
    const [comment, setComment] = useState('')
    const [payType, setPayType] = useState(1)
    const [sdachaIsValid, setSdachaIsValid] = useState(true)
    const [sending, setSending] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [adrupd, setadrupd] = useState(false)
    const [getsPromo, setGetsPromo] = useState(true)
    const [Pers, setPers] = useState(true)
    const [ball, setBall] = useState(0)
    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
      let dil = 80
      if(total>=800){
        dil = 0
      }
      if(selectAdress.types) {
        dil = 0
      }
      let canUseBonus = user.bonus
    let maxUseBonus = Math.floor((total+dil)*0.8)
    if(user.bonus > maxUseBonus) {
      canUseBonus = maxUseBonus
    }
      const chengeadr =  () => {
        setadrupd(true)
        setModalShow(true)
      }
      
      const sendOrder = async () => {
        setSending(true)
        let oplata_type = ''
        let diltype = ''
        if(selectAdress.types === true){
          


          if(payType===1){
            oplata_type = 1
          }else{
            oplata_type = 2
          }
          diltype=2
        }else{


          if(payType===1){
            oplata_type = 1
          }else{
            oplata_type = 2
          }
          diltype=1
        }
        if(ball > canUseBonus) {
          setSending(false)
          return;
        }
        let sa = {
          id:selectAdress.id,
          userAdres: selectAdress.userAdres,
          type: selectAdress.types,
          street: selectAdress.street,
          house: selectAdress.house,
          flat: selectAdress.flat,
          ent: selectAdress.doorway,
          inc: selectAdress.doorwayCode,
          flour: selectAdress.floor,
          adressName: selectAdress.adressName,
          comment: selectAdress.comment,
        }
        if(diltype===2){
          sa = {
            id:selectAdress.id,
            userAdres: 'ofice',
            type: selectAdress.types,
            street: selectAdress.street,
            house: selectAdress.house,
            flat: selectAdress.flat,
            ent: selectAdress.doorway,
            inc: selectAdress.doorwayCode,
            flour: selectAdress.floor,
            adressName: selectAdress.adressName,
            comment: selectAdress.comment,
          }
        }
        


        let newadr = {
          Aname: null,
          street: null,
          flat: null,
          flour: null,
          inc: null,
          ent: null,
          comment: null,
        }
        if(selectAdress.userAdres==='new'){
          newadr = {
            Aname: selectAdress.adressName,
            street: selectAdress.street,
            house: selectAdress.house,
            flat: selectAdress.flat,
            flour: selectAdress.floor,
            inc: selectAdress.doorwayCode,
            ent: selectAdress.doorway,
            comment: selectAdress.comment,
          }
        }
        const authData = {
          'order': cartItems,
          'name': name,
          'phone': phone,
          'user': user._id,
          'usepromocode': cart.promocode,
          'select_adres': sa,
          'newadr': newadr,
          
          'type': diltype,
          'bonuses': parseInt(ball,10),
          'sdacha': sdacha,
          'nosdacha': nosdacha,
          'pay1': oplata_type,
          'apptype': 1,
          'get_bonus': 0,
          'total': total,
          
          'comment': comment
        };
        let url = 'https://admin.foodsurf.ru/api/public/order/new';

    try {
     
      const response = await axios.post(url, authData,{ timeout: 15000});
			
       const script = document.createElement("script");

        const scriptText = document.createTextNode("VK.Goal('purchase'); ym(62762404,'reachGoal','endorder')");

        script.appendChild(scriptText);
        document.head.appendChild(script);
      dispatch({
        type: 'SET_OLD_CART',
        payload: cartItems

      })
      dispatch({
        type: 'SET_ORDER_ID',
        payload: response.data

      })
      dispatch({
        type: 'SET_ORDER_BONUS',
        payload: ball

      })
      
     
			if(cart.cartPromoAccept){
        dispatch({
          type: 'PROMOCODE',
          payload: ''
  
        })
        dispatch({
          type: 'PROMOCODE_ITEM',
          payload: []
  
        })
        dispatch({
          type: 'PROMOCODE_ACCEPT',

  
        })
				
				
      }
      dispatch({
        type: 'GIFTS_SELECT',
        payload: null
      })
      dispatch({
        type: 'CLEAR_CART',


      })
			const getUserInfo = async event => {

        if(localStorage.getItem('localid') !== null){
    
   
        let url = 'https://admin.foodsurf.ru/api/public/user/profile?id='+user._id;
        
        try {
          const response = await axios.get(url);
    
          
			   const data = response.data;

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
         }
          
          dispatch({
            type: 'SET_CURRENT_USER',
            payload: user
            })
            
          
        } catch (error) {
          console.log(error);
        };
      }else {
        
      }
      }
      getUserInfo()
      router.push({
        pathname: '/checkout/thanks',
    
      })
      scroll.scrollToTop();
      setSending(false)
      scroll.scrollToTop();
    } catch (error) {
	  console.log(error);
    setSending(false)
    scroll.scrollToTop();
	};
      }

      const [isLoaded, setIsLoaded] = useState(false)

  const [set, setSet] = useState({
    free_dil: 0,
    price_dil: 0,
    online: true
  })
  const loadConf = () => {
    
    let url = 'https://admin.foodsurf.ru/api/config';
    console.log('start Load');
    axios.get(url)
      .then(
        (result) => {
          setSet(result.data)
         
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
         
        }
      )
  
}
if(!isLoaded){
  loadConf()
  setIsLoaded(true);
}
      
    return (
        <>
        <Head>
         <title>Оформление заказа - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className="checkout-page">
    <div className="container checkout_snd" >
        <div className="checkout-form__left">
            <div className="checkout-form__title">
                <h2 className="title title_h1">Заказ на {!selectAdress.types ? "доставку" : "вынос"}</h2></div>
                <div className="checkout-form__content">
                    <div className="checkout-form__messages"></div>
                    <div className="checkout-form__login-form">
                        <div className="form">
                            <div className="form__row">
                                <div className="form__col form__col_padtop form__col_4-1 mform__col_4-1">
                                    <label className="label label_inline">Имя</label>
                                </div>
                                <div className="form__col form__col_padtop form__col_4-2 mform__col_4-3">
                                    <div className="error-tooltip-wrapper">
                                        <div className="validation-wrapper">
                                            <input type="text" data-testid="checkout-form__name-input" onChange={(text) =>setName(text.target.value)} name='names' id="nm-input" className="input" maxLength="30" required="" value={name} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form__row">
                                <div className="form__col form__col_padtop form__col_4-1">
                                    <label className="label label_inline">Номер телефона</label>
                                </div>
                                <div className="form__col form__col_padtop form__col_4-2 mform__col_4-3">
                                    <div className="error-tooltip-wrapper">
                                        <div className="validation-wrapper">
                                            <input disabled data-testid="checkout-form__phone-input" name='phone' type="tel" id="phn-input" className="input " placeholder="+7 999 999-99-99"  required="" value={phone} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-form__order-type-form">
                        {selectAdress.types ?(
                            <div className="form__row">
                                <div className="form__col form__col_padtop form__col_4-1">
                                    <label className="label label_inline">Адрес на вынос</label>
                                </div>
                                <div className="form__col form__col_padtop form__col_4-3">
                                    <div className="checkout-form__order-type-form__address">
                                        {
                                            selectAdress.id === 1 ? (
                                            <div className="checkout-form__order-type-form__address-text">Ул. Тельмана, 137, ТЦ Аврора</div>
                                            ): (
                                            <div className="checkout-form__order-type-form__address-text">Ул. Тельмана, 137, ТЦ Аврора (В зале)</div>
                                            )}
                                            
                                            
                                            <div className="checkout-form__order-type-form-toggle"><a onClick={()=> setModalShow(true)} data-dil="false" className="link" data-testid="checkout-form__order-type-form-toggle">Выбрать доставку</a></div>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                                <div className="form__row">
                                    <div className="form__col form__col_padtop form__col_4-1">
                                        <label className="label label_inline">Адрес доставки</label>
                                    </div>
                                    <div className="form__col form__col_padtop form__col_4-3">
                                        <div className="checkout-form__order-type-form__address">
                                            <div className="checkout-form__order-type-form__address-text">ул.{selectAdress.street}, д.{selectAdress.house}{selectAdress.flat  ?  ', кв.'+selectAdress.flat+',': null }{selectAdress.floor ?  ' э.'+selectAdress.floor+',': null }{selectAdress.doorway ?  ' п.'+selectAdress.doorway+',': null }</div>
                                            <div className="checkout-form__order-type-form__comment">{selectAdress.comment}</div>
                                            <div className="error-tooltip-wrapper"><a onClick={() => chengeadr()} data-testid="checkout-form__order-type-form-change" className="checkout-form__order-type-form-change link">Изменить</a></div>
                                            <div className="checkout-form__order-type-form-toggle"><a onClick={()=> setModalShow(true)} data-dil="true" className="link" data-testid="checkout-form__order-type-form-toggle">Выбрать на вынос</a></div>
                                        </div>
                                    </div>
                                </div>) 
                            }
                            <div className="form__row">
                                <div className="form__col form__col_padtop form__col_4-1">
                                    <label className="label label_inline">Коментарий к заказу</label>
                                </div>
                                <div className="form__col form__col_padtop form__col_4-3">
                                    <div className="cvalidation-wrapper">
                                        <textarea type="text" rows='3' data-testid="checkout-form__name-input" onChange={(text) =>setComment(text.target.value)} name='comment' id="nm-input" className="input input--textarea " required="" value={comment} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                        
                    {selectAdress.types  ? null :(
                      <div className="checkout-form__payment-method-container">

                        
                            
                         

                              <div className="checkout-form__title">
                                <h2 className="title title_h1">Оплата</h2></div>
                                <div className="checkout-form__payment-method">
                                    <div className="form__row">
                                        <div className="form__col form__col_4-4 form__col_padtop">
                                            <div className="payment-method ">
                                                <ul className="radio-button">
                                                    <li data-testid="checkout-form__payment-item_cash" className="radio-button__item payment-method-cash">
                                                        <input onClick={()=>setPayType(1)} type="radio" className="radio-button__input" name="payment_type" value="cash" id="Cash" defaultChecked />
                                                        <label data-testid="checkout-form__payment-control" className="radio-button__label radio-button__label_large" htmlFor="Cash">Наличными</label>
                                                        {payType === 2 ? null : (
                                                            
                                                            !selectAdress.types  ? (
                                                            <div className="radio-button__content">
                                                                <div className="cash-form "><span className="cash-form__client-note-about">С какой суммы подготовить сдачу?</span>
                                                                    <div className="cash-form__client-note-value">
                                                                        <div className="error-tooltip-wrapper">
                                                                            <input  type={!nosdacha ? ('text'): ('hidden')} id="cnt-input" data-testid="cash-form__change-input" name='sdacha' onChange={(text) =>setSdacha(text.target.value)} inputMode="numeric" className={sdachaIsValid ? 'input input_client-note': 'input input_client-note input_error'} value={sdacha}/>
                                                                        </div>
                                                                        {!nosdacha ? (<label className="label label_inside label_inside-right"> р</label>): null}
                                                                    </div>
                                                                    <div className="checkbox__item cash-form__exactly-sum" data-testid="cash-form__exactly-summ">
                                                                        <input onChange={() => setNosdacha(!nosdacha)} data-testid="__input" type="checkbox" className="checkbox__input" name="exactly_summ" id="exactly_summ"/>
                                                                        <label data-testid="__label" className="checkbox__label " htmlFor="exactly_summ">Без сдачи</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            ):null
                                                            )}
                                                            
                                                        </li>
                                                        <li data-testid="checkout-form__payment-item_terminal-at-courier" className="radio-button__item ">
                                                            <input onClick={()=>setPayType(2)} type="radio" className="radio-button__input" value="courier" name="payment_type" id="CourierTerminal" />
                                                            <label data-testid="checkout-form__payment-control" className="radio-button__label radio-button__label_large" htmlFor="CourierTerminal">Картой </label>
                                                        </li>
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                        )}

                                <div className="checkout-form__content">
                                    <div className="checkout-form__confirmation">
                                        <div className="checkout-form__confirmation-item">
                                            <div className="checkout-form__confirmation-checkbox-outer">
                                                <div className="checkbox__item checkout-form__confirmation-checkbox">
                                                    <input onClick={()=> setPers(!Pers)} data-testid="__input"  type="checkbox" className="checkbox__input" name="check_personalDataProcessing" id="check_personalDataProcessing" defaultChecked />
                                                    <label data-testid="__label" className="checkbox__label " htmlFor="check_personalDataProcessing">Согласен на обработку персональных данных </label>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="checkout-form__confirmation-item">
                                            <div className="subscription">
                                                <div className="subscription__checkbox-outer">
                                                    <div className="checkbox__item subscription__checkbox">
                                                        <input onClick={()=> setGetsPromo(!getsPromo)} data-testid="__input" defaultChecked type="checkbox" className="checkbox__input" name="check_receiveSms" id="check_receiveSms" />
                                                        <label data-testid="__label" className="checkbox__label " htmlFor="check_receiveSms">Получать промокоды и другие предложения </label>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout-form__actions"><a onClick={()=> {router.push({
                                      pathname: '/checkout',
                                  
                                    });scroll.scrollToTop()}} data-testid="checkout-form__button-back"  className="checkout-form__button-back button button_secondary button_large">Назад в корзину</a>
                                        {sending ? (<button  type="button" data-testid="checkout-form__button-to-kitchen" data-payment-type="payment-type_1" className="checkout-form__button-to-kitchen button button_primary button_large">Отправка заказа...</button>) : (<button  onClick={() => sendOrder()} type="button" data-testid="checkout-form__button-to-kitchen" data-payment-type="payment-type_1" className="checkout-form__button-to-kitchen button button_primary button_large">Оформить заказ на<span className="checkout-form__button-to-kitchen-price"><span className="money "><span className="money__value">{!selectAdress.types ? (total <=set.free_dil ? (total+parseInt(set.price_dil)):(total)):(total)}</span><span className="money__currency money__currency_on-the-right"> р</span></span>
                                        </span>
                                    </button>)}
                                </div>
                            </div>
                        </div>
                        <div className="checkout-form__composition">
                            <div className="checkout-order-composition">
                                <div className="checkout-order-composition__title">Состав заказа</div>
                                <div className="checkout-order-composition__content">
                                    <div className="scroll">
                                        <div className="scroll__gradient scroll__gradient_top" style={{transform: 'translateY(-100%) translateZ(0px)', opacity: '0'}}></div>
                                        <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 'auto', minHeight: '0px', maxHeight: '382px'}}>
                                            <div style={{position: 'relative', overflow: 'scroll', marginRight: '0px', marginBottom: '0px', minHeight: '0px', maxHeight: '382px'}}>
                                                {
                                                    cartItems.map(cartItem => (
                                                      cartItem.type === 'gift' ? (
                                                        <div key={cartItem.id} className="checkout-order-composition-line " data-testid="checkout-order-composition-line_product">
                                                        <div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">{cartItem.title}</span>
                                                            <div className="checkout-order-composition-line__description">{cartItem.descript}</div>
                                                        </div>
                                                        <div className="checkout-order-composition-line__right"><span className="checkout-order-composition-line__count"> </span><span className="money "><span className="money__value">Подарок</span><span className="money__currency money__currency_on-the-right"></span></span>
                                                        </div>
                                                    </div>
                                                      ): (
                                                        <div key={cartItem.id} className="checkout-order-composition-line " data-testid="checkout-order-composition-line_product">
                                                        <div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">{cartItem.title}</span>
                                                            <div className="checkout-order-composition-line__description">{cartItem.descript}</div>
                                                        </div>
                                                        <div className="checkout-order-composition-line__right"><span className="checkout-order-composition-line__count">{cartItem.quantity} × </span><span className="money "><span className="money__value">{cartItem.price}</span><span className="money__currency money__currency_on-the-right"> р</span></span>
                                                        </div>
                                                    </div>
                                                      )
                                                    
                                                    ))
                                                }
                                                
                                                
                                                
                                                {!selectAdress.types ? (total <= 800 &&  (
                                                    <div className="checkout-order-composition-line checkout-order-composition-line_summary" data-testid="checkout-order-composition-line_surf-currency">
                                                        <div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">Доставка</span></div>
                                                        <div className="checkout-order-composition-line__right"><span className="money "><span className="money__value">{set.price_dil}</span><span className="money__currency money__currency_on-the-right"> <span className="surf-currency"> р</span></span>
                                                        </span>
                                                    </div>
                                                </div>
                                                )): null }
                                               
                                            </div>
                                            <div style={{position: 'absolute', height: '6px', display: 'none', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px'}}>
                                                <div style={{position: 'relative', display: 'block', height: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></div>
                                            </div>
                                            <div style={{position: 'absolute', width: '6px', display: 'none', right: '2px', bottom: '2px', top: '2px', borderRadius: '3px'}}>
                                                <div className="scroll__scrollbar" style={{position: 'relative', display: 'block', width: '100%'}}></div>
                                            </div>
                                        </div>
                                        <div className="scroll__gradient" style={{transform: 'translateY(100%) translateZ(0px)', opacity: '0'}}></div>
                                    </div>
                                </div>
                                <div className="checkout-order-composition__summary">
                                    
                                    
                                    <div className="checkout-order-composition-line checkout-order-composition-line_summary" data-testid="checkout-order-composition-line_total">
                                        <div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">Сумма к оплате</span></div>
                                        <div className="checkout-order-composition-line__right"><span className="money "><span className="money__value">{!selectAdress.types ? (total <=parseInt(set.free_dil) ? (total+parseInt(set.price_dil)-ball):(total-ball)):(total-ball)}</span><span className="money__currency money__currency_on-the-right"> р</span></span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    {modalShow? <Modal show={setModalShow} upt={adrupd} supt={setadrupd}/>:null}
                    </>
                    )
                }
                export default checkoutPageTwo;