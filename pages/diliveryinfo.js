import Head from 'next/head'
import React, { useState, useEffect } from "react";
import axios from 'axios';
const diliveryinfo = () => {
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
         <title>Информация о доставке - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className='DilInfoPage'>
    <div className='container'>
      <div className='row'>
        <div>
        <h2>Информация о доставке</h2>
        <h3>На вынос</h3>
<p>Минимальная сумма заказа отсутствует. Эта услуга бесплатна. </p>


<h3>Доставка</h3>
<p>Наш курьер доставит заказ по указанному адресу. После предварительного звонка оператора курьер дополнительно свяжется для предупреждения о выезде по адресу доставки (ориентировочно за 1 час).
Стоимость доставки {set.price_dil} руб. при сумме заказа менее {set.free_dil} руб.</p>

<p>При сумме заказа более {set.free_dil} руб. доставка осуществляется бесплатно.</p>


        </div>
        <div>

        </div>
      </div>
    </div>
    <h2 className='container contact-title'>Зона доставки на карте</h2>
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A417784799aa0378597f7ea2e10554be6745f617b6944daa923f6197dbf394780&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
  </div>
  </>
    )
}
export default diliveryinfo;