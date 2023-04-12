import React, {useState} from 'react';
import axios from 'axios';
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
const checkoutPageThanks = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    
    const user = useSelector((state) => state.user.currentUser)
    const selectAdres = useSelector((state) => state.cart.selectAdres)
    const cartItems = useSelector((state) => state.cart.oldCart)
    const ball = useSelector((state) => state.cart.bonus)
    const orderid = useSelector((state) => state.cart.orderid)

    const total = cartItems.reduce(
        (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
    return (
		<>
		<Head>
         <title>Спасибо за заказ - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className="container">
					<h2 style={{textAlign: 'center'}}>Ваш заказ успешно оформлен</h2>
					<h3 style={{textAlign: 'center'}}>Номер заказа #{orderid}</h3>
					{selectAdres.types ? (
					
						
							<p style={{textAlign: 'center'}}>Мы находимся по адресу: Ул. Тельмана, 137, ТЦ Аврора</p>
						
						
					): (
						<p style={{textAlign: 'center'}}>Адрес доставки: ул.{selectAdres.street}, д.{selectAdres.house}{selectAdres.flat ? (', кв.'+selectAdres.flat): null}{selectAdres.floor ? (', э.'+selectAdres.floor): null}{selectAdres.doorway  ? (', п.'+selectAdres.doorway): null}</p>
					)
			}
				
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
											</div>)
										))
									}
								
									
									
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
				
					{!selectAdres.types ? (total <= 800 ?  (
						<div className="checkout-order-composition-line checkout-order-composition-line_summary" data-testid="checkout-order-composition-line_surf-currency">
					<div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">Доставка</span></div>
					<div className="checkout-order-composition-line__right"><span className="money "><span className="money__value">80</span><span className="money__currency money__currency_on-the-right"> <span className="surf-currency"> р</span></span>
							</span>
					</div>
			</div>
					): null): null }
					{ball > 0 ?  (
						<div className="checkout-order-composition-line checkout-order-composition-line_summary" data-testid="checkout-order-composition-line_surf-currency">
					<div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">Списано баллов</span></div>
					<div className="checkout-order-composition-line__right"><span className="money "><span className="money__value">{ball}</span><span className="money__currency money__currency_on-the-right"> <span className="surf-currency"></span></span>
							</span>
					</div>
			</div>
					): null }
					
						<div className="checkout-order-composition-line checkout-order-composition-line_summary" data-testid="checkout-order-composition-line_total">
							<div className="checkout-order-composition-line__left"><span className="checkout-order-composition-line__title">Итог</span></div>
							<div className="checkout-order-composition-line__right"><span className="money "><span className="money__value">{!selectAdres.types ? (total <= 800 ? (total+80-ball): (total-ball)) : (total-ball)}</span><span className="money__currency money__currency_on-the-right"> р</span></span>
							</div>
						</div>
					</div>
					
				</div>
				</div>
			
        </>
    )
}
export default checkoutPageThanks;