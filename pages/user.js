import Head from 'next/head'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'

const UserFormInput = ({ handleChange, label, labels, classes, invalidclass, valid, btnclasses, handleClick,  ...otherProps }) => (
  <div className='UserInput' style={{marginTop: '-10px', width: '100%'}}>
    <span className='UserInputSpan' style={{marginRight: '1em'}}>
    {valid ? (
      <input className={classes} onChange={handleChange} {...otherProps} />
    ): (
      <input className={invalidclass} onChange={handleChange} {...otherProps} />
      )}
      
    </span>
    <button type="button" disabled="" className={btnclasses} onClick={handleClick}>{label}</button>
    <div className="profile__input__info">{labels}</div>
  </div>
);
const user = () => {

    const dispatch = useDispatch()
    const router = useRouter()
  
     let user = useSelector((state) => state.user.currentUser)
   
    if (typeof window !== 'undefined') {
      if(user === null){
      
      router.push({
        pathname: '/',
        
    
      })
      return(<></>)

    }
    }else {
      user = {
          name: '',
          phone: ''
       }
     }
    
    const [name, setName] = useState(user.name)
    const [editName, setEditName] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)

    const [dateOfBis_name, setDateOfBis_name] = useState('')
    const [date, setDate] = useState('День')
    const [editDate, setEditDate] = useState(false)
    const [month, setMonth] = useState(0)
    const [monthN, setMonthN] = useState('Месяц')
    const [editMonth, setEditMonth] = useState(false)
    const [editD, setEditD] = useState(false)
    const [editM, setEditM] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [editEmail, setEditEmail] = useState(false)
    const [load, setLoad] = useState(false)
    const getUserInfo = async event => {

if(localStorage.getItem('localid') !== null){


const authData = {
  localid: localStorage.getItem('localid'), 
};
let url = 'https://api.foodsurf.ru/api/user/getinfo';

try {
  const response = await axios.post(url, authData);

  
       const data = response.data;


  
  dispatch({
    type: 'SET_CURRENT_USER',
    payload: data
    })
    
  
} catch (error) {
  console.log(error);
};
}else {

}
}

    const saveDate = async () => {
        const count = date + '/' + month;
        const authData = {
            type: 'date',
            value: count,
            localid: localStorage.getItem('localid'), 
        };
        let url = 'https://api.foodsurf.ru/api/user/updinfo';
        
        try {
        const response = axios.post(url, authData);

       
        
        } catch (error) {
        console.log(error);
        };
        getUserInfo()
        setEditDate(false)
    }
    const hiddenall = async () => {
        if(editD){
            setEditD(false)
        }
        if(editM){
            setEditM(false)
        }
        

    }
    if(!load){
        if(user.month_birstday !==null){

        
        if(user.month_birstday === '1') {
      setDateOfBis_name( user.date_birstday + " Января");
      
    }else if(user.month_birstday === '2'){
      setDateOfBis_name( user.date_birstday + " Февраля");
      
    }else if(user.month_birstday === '3'){
      setDateOfBis_name( user.date_birstday + " Марта");
      
    }else if(user.month_birstday === '4'){
      setDateOfBis_name( user.date_birstday + " Апреля");
      
    }else if(user.month_birstday === '5'){
      setDateOfBis_name( user.date_birstday + " Мая");
      
    }else if(user.month_birstday === '6'){
      setDateOfBis_name( user.date_birstday + " Июня");
      
    }else if(user.month_birstday === '7'){
      setDateOfBis_name( user.date_birstday + " Июля");
      
    }else if(user.month_birstday === '8'){
      setDateOfBis_name( user.date_birstday + " Августа");
     
    }else if(user.month_birstday === '9'){
      setDateOfBis_name( user.date_birstday + " Сентября");
      
    }else if(user.month_birstday === '10'){
      setDateOfBis_name( user.date_birstday + " Октября");
      
    }else if(user.month_birstday === '11'){
      setDateOfBis_name( user.date_birstday + " Ноября");
      
    }else if(user.month_birstday === '12'){
      setDateOfBis_name(    user.date_birstday + " Декабря");
    }}else{
        setEditDate(true)
    }
    setLoad(true)
    }
    const handleChangeName = event => {

    const { value } = event.target;
    if(value.length <3){
      setNameIsValid(false);
    }else{
      setNameIsValid(true);
    }
    setName(value);

    }
    const handleChangeEmail = event => {

    const { value } = event.target;
    if(value.length < 5 ){
      setEmailIsValid(false);
    }else{
      setEmailIsValid(true);
    }
    setEmail(value);

    }
    const handleClickName = async () => {
      if(!nameIsValid) {
      return;
    }
    if(name === user.name) {
      setEditName(false)
      return;
    }
    const authData = {
      type: 'name',
      value: name,
      localid: localStorage.getItem('localid'), 
    };
    let url = 'https://api.foodsurf.ru/api/user/updinfo';
    
    try {
      const response = await axios.post(url, authData);


      
    } catch (error) {
      console.log(error);
    };
    setEditName(false)
    getUserInfo()
    }
    const handleClickEmail = async () => {
      if(!emailIsValid) {
      return;
    }
    if(email === user.email) {
      setEditEmail(false)
      return;
    }
    const authData = {
      type: 'email',
      value: email,
      localid: localStorage.getItem('localid'), 
    };
    let url = 'https://api.foodsurf.ru/api/user/updinfo';
    
    try {
      const response = await axios.post(url, authData);


      
    } catch (error) {
      console.log(error);
    };
    setEditEmail(false)
    getUserInfo()
    }
    const logout = async () => {
      localStorage.removeItem('localid');
        localStorage.removeItem('expirationDate');
        await router.push({
        pathname: '/',
        
    
      });
      dispatch({
          type: 'SET_CURRENT_USER',
          payload: null
          })
    }
    return (
        <>
        <Head>
         <title>Профиль - FoodSurf Доставка и самовывоз еды</title>
        </Head>
        <div className='user' onClick={() => hiddenall()}>
      <div className="container">
        <h2>Личный кабинет</h2>
        <div className='user__row'>
          <div className='user__label'>Имя:</div>
          <div className='user__value'>
          
            {// eslint-disable-next-line
                editName === false && name } {editName === false ? ( <a  onClick={()=>setEditName(true)} className='profile__edit-link link link_dashed'>Изменить</a>) :( <UserFormInput 
              name='names'
              type='text'
              
              classes='profile__input input'
              invalidclass='profile__input input input_error'
              btnclasses='profile__button button button_primary button_large'
              value={name}
              handleChange={handleChangeName}
              handleClick={()=>handleClickName()}
              label='Сохранить'
              placeholder=""
              labels=''
              valid={nameIsValid}
              required
              />)}
          </div>
           
        </div>
        <div className='user__row'>
          <div className='user__label'>Номер телефона:</div>
          <div className='user__value'>{user.phone}</div>
        </div>
        <div className='user__row'>
          <div className='user__label'>День рождения:</div>
          <div className='user__value'>
        
        {editDate === false ? dateOfBis_name :(
           <div className="profile__value-edit">
           <div data-testid="profile__value-edit-birthday-day" className="select profile__value-edit-birthday-day">
               <div onClick={() => setEditD(true)} className="select__control"><span className="select__control-value">{date}</span><span className="select__control-icon"></span></div>
               <div data-testid="select__drop_closed" className={editD ? "select__drop select__drop_show select__drop_top" : "select__drop select__drop_top"}>
                   <div className="scroll">
                       <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 'auto', minHeight: '0px', maxHeight: '200px'}}>
                           <div style={{position: 'relative', overflow: 'scroll', marginRight: '0px', marginBottom: '0px', minHeight: '0px', maxHeight: '200px'}}>
                           <span onClick={()=> {setDate('День'); setEditD(false)}} data-testid="select__drop-item" data-value="День" data-text="День" className={date === 'День' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>День</span>
                           <span onClick={()=> {setDate('1'); setEditD(false)}} data-testid="select__drop-item" data-value="1" data-text="1" className={date === '1' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>1</span>
                           <span onClick={()=> {setDate('2'); setEditD(false)}} data-testid="select__drop-item" data-value="2" data-text="2" className={date === '2' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>2</span>
                           <span onClick={()=> {setDate('3'); setEditD(false)}} data-testid="select__drop-item" data-value="3" data-text="3" className={date === '3' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>3</span>
                           <span onClick={()=> {setDate('4'); setEditD(false)}} data-testid="select__drop-item" data-value="4" data-text="4" className={date === '4' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>4</span>
                           <span onClick={()=> {setDate('5'); setEditD(false)}} data-testid="select__drop-item" data-value="5" data-text="5" className={date === '5' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>5</span>
                           <span onClick={()=> {setDate('6'); setEditD(false)}} data-testid="select__drop-item" data-value="6" data-text="6" className={date === '6' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>6</span>
                           <span onClick={()=> {setDate('7'); setEditD(false)}} data-testid="select__drop-item" data-value="7" data-text="7" className={date === '7' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>7</span>
                           <span onClick={()=> {setDate('8'); setEditD(false)}} data-testid="select__drop-item" data-value="8" data-text="8" className={date === '8' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>8</span>
                           <span onClick={()=> {setDate('9'); setEditD(false)}} data-testid="select__drop-item" data-value="9" data-text="9" className={date === '9' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>9</span>
                           <span onClick={()=> {setDate('10'); setEditD(false)}} data-testid="select__drop-item" data-value="10" data-text="10" className={date === '10' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>10</span>
                           <span onClick={()=> {setDate('11'); setEditD(false)}} data-testid="select__drop-item" data-value="11" data-text="11" className={date === '11' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>11</span>
                           <span onClick={()=> {setDate('12'); setEditD(false)}} data-testid="select__drop-item" data-value="12" data-text="12" className={date === '12' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>12</span>
                           <span onClick={()=> {setDate('13'); setEditD(false)}} data-testid="select__drop-item" data-value="13" data-text="13" className={date === '13' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>13</span>
                           <span onClick={()=> {setDate('14'); setEditD(false)}} data-testid="select__drop-item" data-value="14" data-text="14" className={date === '14' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>14</span>
                           <span onClick={()=> {setDate('15'); setEditD(false)}} data-testid="select__drop-item" data-value="15" data-text="15" className={date === '15' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>15</span>
                           <span onClick={()=> {setDate('16'); setEditD(false)}} data-testid="select__drop-item" data-value="16" data-text="16" className={date === '16' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>16</span>
                           <span onClick={()=> {setDate('17'); setEditD(false)}} data-testid="select__drop-item" data-value="17" data-text="17" className={date === '17' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>17</span>
                           <span onClick={()=> {setDate('18'); setEditD(false)}} data-testid="select__drop-item" data-value="18" data-text="18" className={date === '18' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>18</span>
                           <span onClick={()=> {setDate('19'); setEditD(false)}} data-testid="select__drop-item" data-value="19" data-text="19" className={date === '19' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>19</span>
                           <span onClick={()=> {setDate('20'); setEditD(false)}} data-testid="select__drop-item" data-value="20" data-text="20" className={date === '20' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>20</span>
                           <span onClick={()=> {setDate('21'); setEditD(false)}} data-testid="select__drop-item" data-value="21" data-text="21" className={date === '21' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>21</span>
                           <span onClick={()=> {setDate('22'); setEditD(false)}} data-testid="select__drop-item" data-value="22" data-text="22" className={date === '22' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>22</span>
                           <span onClick={()=> {setDate('23'); setEditD(false)}} data-testid="select__drop-item" data-value="23" data-text="23" className={date === '23' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>23</span>
                           <span onClick={()=> {setDate('24'); setEditD(false)}} data-testid="select__drop-item" data-value="24" data-text="24" className={date === '24' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>24</span>
                           <span onClick={()=> {setDate('25'); setEditD(false)}} data-testid="select__drop-item" data-value="25" data-text="25" className={date === '25' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>25</span>
                           <span onClick={()=> {setDate('26'); setEditD(false)}} data-testid="select__drop-item" data-value="26" data-text="26" className={date === '26' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>26</span>
                           <span onClick={()=> {setDate('27'); setEditD(false)}} data-testid="select__drop-item" data-value="27" data-text="27" className={date === '27' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>27</span>
                           <span onClick={()=> {setDate('28'); setEditD(false)}} data-testid="select__drop-item" data-value="28" data-text="28" className={date === '28' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>28</span>
                           <span onClick={()=> {setDate('29'); setEditD(false)}} data-testid="select__drop-item" data-value="29" data-text="29" className={date === '29' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>29</span>
                           <span onClick={()=> {setDate('30'); setEditD(false)}} data-testid="select__drop-item" data-value="30" data-text="30" className={date === '30' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>30</span>
                           <span onClick={()=> {setDate('31'); setEditD(false)}} data-testid="select__drop-item" data-value="31" data-text="31" className={date === '31' ? "select__drop-item select__drop-item_is-focused" : "select__drop-item"}>31</span>
                          </div>
                           <div style={{position: 'absolute', height: '6px', display: 'none', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px'}}>
                               <div style={{position: 'relative', display: 'block', height: '100%', cursor: 'pointer', bordeRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></div>
                           </div>
                           <div style={{position: 'absolute', width: '6px', display: 'none', right: '2px', bottom: '2px', top: '2px', borderRadius: '3px'}}>
                               <div className="scroll__scrollbar" style={{position: 'relative', display: 'block', width: '100%'}}></div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <div data-testid="profile__value-edit-birthday-month" className="select profile__value-edit-birthday-month">
               <div onClick={() => setEditM(true)} className="select__control"><span className="select__control-value">{monthN}</span><span className="select__control-icon"></span></div>
               <div data-testid="select__drop_closed" className={editM ? "select__drop select__drop_show select__drop_top" : "select__drop select__drop_top"} >
                   <div className="scroll">
                       <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 'auto', minHeight: '0px', maxHeight: '200px'}}>
                           <div style={{position: 'relative', overflow: 'scroll', marginRight: '0px', marginBottom: '0px', minHeight: '0px', maxHeight: '200px'}}>
                           <span onClick={()=>{setMonth('0');setMonthN('Месяц'); setEditM(false)}} data-testid="select__drop-item" data-value="0" data-text="Месяц" className={month=== '0' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Месяц</span>
                           <span onClick={()=>{setMonth('1');setMonthN('Января'); setEditM(false)}} data-testid="select__drop-item" data-value="1" data-text="Января" className={month=== '1' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Января</span>
                           <span onClick={()=>{setMonth('2');setMonthN('Февраля'); setEditM(false)}} data-testid="select__drop-item" data-value="2" data-text="Февраля" className={month=== '2' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Февраля</span>
                           <span onClick={()=>{setMonth('3');setMonthN('Марта'); setEditM(false)}} data-testid="select__drop-item" data-value="3" data-text="Марта" className={month=== '3' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Марта</span>
                           <span onClick={()=>{setMonth('4');setMonthN('Апреля'); setEditM(false)}} data-testid="select__drop-item" data-value="4" data-text="Апреля" className={month=== '4' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Апреля</span>
                           <span onClick={()=>{setMonth('5');setMonthN('Мая'); setEditM(false)}} data-testid="select__drop-item" data-value="5" data-text="Мая" className={month=== '5' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Мая</span>
                           <span onClick={()=>{setMonth('6');setMonthN('Июня'); setEditM(false)}} data-testid="select__drop-item" data-value="6" data-text="Июня" className={month=== '6' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Июня</span>
                           <span onClick={()=>{setMonth('7');setMonthN('Июля'); setEditM(false)}} data-testid="select__drop-item" data-value="7" data-text="Июля" className={month=== '7' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Июля</span>
                           <span onClick={()=>{setMonth('8');setMonthN('Августа'); setEditM(false)}} data-testid="select__drop-item" data-value="8" data-text="Августа" className={month=== '8' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Августа</span>
                           <span onClick={()=>{setMonth('9');setMonthN('Сентября'); setEditM(false)}} data-testid="select__drop-item" data-value="9" data-text="Сентября" className={month=== '9' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Сентября</span>
                           <span onClick={()=>{setMonth('10');setMonthN('Октября'); setEditM(false)}} data-testid="select__drop-item" data-value="10" data-text="Октября" className={month=== '10' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Октября</span>
                           <span onClick={()=>{setMonth('11');setMonthN('Ноября'); setEditM(false)}} data-testid="select__drop-item" data-value="11" data-text="Ноября" className={month=== '11' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Ноября</span>
                           <span onClick={()=>{setMonth('12');setMonthN('Декабря'); setEditM(false)}} data-testid="select__drop-item" data-value="12" data-text="Декабря" className={month=== '12' && "select__drop-item select__drop-item_is-focused" || "select__drop-item"}>Декабря</span>
                           </div>
                           
                           <div style={{position: 'absolute', height: '6px', display: 'none', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px'}}>
                               <div style={{position: 'relative', display: 'block', height: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></div>
                           </div>
                           <div style={{position: 'absolute', width: '6px', display: 'none', right: '2px', bottom: '2px', top: '2px', borderRadius: '3px'}}>
                               <div className="scroll__scrollbar" style={{position: 'relative', display: 'block', width: '100%'}}></div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <button data-testid="birthday-save-button__disabled" type="button" onClick={() => saveDate()} disabled="" className="profile__button button button_primary button_large button_no-left-radius">Сохранить</button>
       </div>
    )}
           
          </div>
        </div>
        <div className='user__row'>
          <div className='user__label'>Email:</div>
          <div className='user__value'>
          {// eslint-disable-next-line
            editEmail === false && email } {editEmail === false ? ( <a  onClick={()=>setEditEmail(true)} className='profile__edit-link link link_dashed'>Изменить</a>) :( <UserFormInput 
            name='email'
            type='text'
            classes='profile__input input'
            invalidclass='profile__input input input_error'
            btnclasses='profile__button button button_primary button_large '
            value={email}
            handleChange={handleChangeEmail}
            handleClick={()=>handleClickEmail()}
            label='Сохранить'
            placeholder="user@foodsurf.ru"
            valid={emailIsValid}
            required
            />)}
            </div>
        </div>
        
        <button className='profile__button button button_primary button_large ' onClick={() => logout()}>Выйти</button>
        
      </div>
    </div>
        </>
    )
}
export default user