import React, { useState, useEffect } from "react";
import axios from 'axios';
import Image from 'next/image'
import Head from 'next/head'
const about = () => {
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
         <title>О нас - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className='AboutPage'>
    <div className='container'>
      <div className='row rowtitle'>
        <h2 className="about_title">О нас</h2>
        <p>Всё, что вы хотели знать о FoodSurf, но стеснялись спросить</p>
      </div>
      <div className='row'>
        <div className='col-6 text-block'>
         
            <p>В какой-то момент мы, создатели FoodSurf, поняли, что в нашем городе не так много уютных и недорогих кафе с хорошей едой, куда можно прийти с семьёй или друзьями, отдохнуть и весело провести время. </p>

            <p>И мы подумали: раз нет того, что нам нужно, то почему бы не создать 
            это самим! </p>

            <p>Поэтому, мы сделали FoodSurf именно таким местом, в которое 
            нам самим хотелось бы приходить!</p>
        </div>
        <Image
        className='col-6 descktor-only'
        src='/static/img/aboutlogo.jpg'
        alt='FoodSurf logo'
        width={558}
        height={436}
      />


      </div>
      <div className='row'>

      <Image
        className='col-6 descktor-only'
        src='/static/img/about2.jpg'
        alt='FoodSurf about2'
        width={558}
        height={436}
      />
        <div className='col-6 text-block'>
          <div className='row'>
            
            <h2 className="about_title">Места хватит всем</h2>
          </div>
          <p> Мы тщательно продумывали интерьер, чтобы сделать его комфортным для компаний любых размеров: вы можете прийти сюда большой семьёй, привести детей и родителей.</p>
        </div>
        
      </div>
      <div className='row'>
        <div className='col-6 text-block'>
          <div className='row'>

            <h2 className="about_title">Проверенный вкус и качество</h2>
          </div>
          <p>Огромное внимание мы уделили разработке меню, чтобы учесть все вскусы и предпочтения. А самое важное - несмотря на то, что мы предлагаем гостям фастфуд, готовим мы не из замороженных полуфабрикатов! Продукты в наше кафе привозят со всей страны: мы перепробовали десятки видов мяса, булочек, лаваша и овощей от разных производителей, пока не нашли все самое вкусное и качественное. </p>
        </div>
        <Image
        className='col-6 descktor-only'
        src='/static/img/about3.jpg'
        alt='FoodSurf about3'
        width={558}
        height={436}
      />
      </div>
      
      <h2 className="about_title">С любовью</h2>
      <p>К тому же, мы придерживаемся принципов открытой кухни, чтобы даже самые щепетильные гости могли убедиться - готовим мы только из свежих продуктов.</p>
      <p>Мы собрали FoodSurf из сотен мелких деталей - от дизайна мебели до фирменных соусов - и верим, что вы полюбите это место так же сильно, как и мы, его создатели!</p>

      <div className='dilivery'>
          <h2 className='about_title'>ДОСТАВКА И ОПЛАТА</h2>
            <div className='row'>
              <div className='dilivery-item'>
                <img src='/static/img/truck.png'/>
                <h3>НА ВЫНОС БЕСПЛАТНО!</h3>
                <p>Заберите ваши любимые борды по адресу: 
                </p><p>
                г. Энгельс ул. Тельмана 137 ТЦ “АВРОРА” </p>
              </div>
              <div className='dilivery-item'>
                <img src='/static/img/point.png'/>
                <h3>ДОСТАВКА бесплатно при <br/>заказе от {set.free_dil} р</h3>
                <p>
                Наш курьер доставит заказ по указанному адресу. После предварительного звонка оператора курьер дополнительно свяжется для предупреждения о выезде по адресу доставки (ориентировочно за 15-20 минут). 
                </p>
                <span>Стоимость доставки </span>
                <p>
                Доставка по городу Энгельс {set.price_dil} руб при сумме заказа менее {set.free_dil} руб. <br/>
                от {set.free_dil} руб доставка бесплатно!
                  </p>
              </div>
              <div className='dilivery-item'>
              <img src='/static/img/pay.png'/>
                <h3>ОПЛАТА</h3>
                
                <p>
                Вы можете оплатить свой заказ при получении 
                с помощью банковской карты или наличными курьеру или на кассе.</p>
              </div>
            </div>

          </div>
          <h2 className='about_title'>Мы на карте</h2>
    </div>
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af59a7783b0108d6451ca62c81b14adbd99ceac63dc2921c0508e74aced3de7e5&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
  </div>
  </>
    )
}

export default about