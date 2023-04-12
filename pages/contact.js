import Head from "next/head"

const contact = () => {
    return (
        <>
        <Head>
         <title>Контакты - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className='ContactPage'>
    <div className='container'>
      <div className='row'>
        <div>
        <h2>Контакты</h2>
        <ul className='contact-list'>
          <li>Телефон: <a className='contact-link' href='tel:89370258888'>8 937 025-88-88</a>
          <p>Оформите заказ по телефону</p></li>
          <li>Написать на почту: <a className='contact-link' href='mailto:feedback@foodsurf.ru'>feedback@foodsurf.ru</a>
          <p>Вопросы, отзывы, предложения по улучшению сервиса и качества</p></li>
          <li>Адрес: ул. Тельмана 137 ТЦ «Аврора»</li>
        </ul>
        </div>
        <div>

        </div>
      </div>
    </div>
    <h2 className='container contact-title'>Мы на карте</h2>
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af59a7783b0108d6451ca62c81b14adbd99ceac63dc2921c0508e74aced3de7e5&amp;source=constructor" width="100%" height="400" frameBorder="0"></iframe>
  </div>
  </>
    )
}

export default contact