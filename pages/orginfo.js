import Head from 'next/head'
const orginfo = () => {
    return (
        <>
        <Head>
         <title>Данные об организации - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className='ContactPage'>
    <div className='container'>
      <div className='row'>
        <div>
        <h2>Данные об организации</h2>
        <ul className='contact-list'>
          <li>ИП Зубрилин Максим Дмитриевич</li>
          <li>ИНН 644911659380</li>
          <li>ОГРНИП 306644910100069</li>
         
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
export default orginfo