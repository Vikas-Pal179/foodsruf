import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'
const MenuMob = ({setLogin}) => {
    const router = useRouter()
    return (
        <div className="header-popup-modal">

<div className='header-modal-row'>
  <div className='logo'>
    <img src='/static/img/footerlogo.png' alt='FoodSurf'/>
  </div>
    <img onClick={toggleMenuHidden} src='/static/svg/closebtn.svg' alt="close"/>
</div>
<div className='header-row'>
<p>Бесплатная доставка<br/>
от 800 р</p>
<img src='/static/svg/truck1.svg'/>
</div>
<nav>
  <ul className='header-menu'>
  <li><a href='/contact'>Контакты</a></li>
  <li><a href='/about'>О нас</a></li>
  {user == null ? (
      
      
    <li><a onClick={toggleLoginHidden}>Войти</a></li>
    
  ) : (
    
    <li><a onClick={() => router.push({
					pathname: '/user',
	
				  })}>Профиль</a></li>
  )}
  </ul>
</nav>
<div className='down-app'>
    <h2>Закажи в приложении</h2>
    <ul >
      <li>
      <a href="https://apps.apple.com/ru/app/foodsurf/id1513556598?mt=8" style={{display:'inline-block',overflow:'hidden',background:'url(https://linkmaker.itunes.apple.com/ru-ru/badge-lrg.svg?releaseDate=2020-05-18&kind=iossoftware&bubble=ios_apps) no-repeat',width:'135px',height:'40px'}}></a>
      </li>
      <li>
      <a style={{width:'135px',height:'40px'}} href='https://play.google.com/store/apps/details?id=ru.foodsurf.main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img style={{width: '111%', marginLeft: '-10px'}} alt='Доступно в Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/ru_badge_web_generic.png'/></a>
      </li>
    </ul>
</div>



</div>
    )
}