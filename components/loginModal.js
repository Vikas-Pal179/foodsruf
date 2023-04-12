
import React from 'react';
import axios from 'axios';
import FormInput from '../form-input/form-input.component';



class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '+7',
      codes: '',
      code: false,
      error: false,
    };
  }
  setUser(user) {
    return {
      type: 'SET_CURRENT_USER',
      payload: user
    }
  }
  
  handleSubmit = async event => {
    event.preventDefault()
    const { phone, codes, code } = this.state;

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
      


      if(this.state.code !== true ){
        this.setState({ code: true });
        const response = await axios.post(url, authData);
      } else {
        const response = await axios.post(url, authData);
        
        const data = response.data;
        const user = data;
        if(data !== 'false'){
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);


    localStorage.setItem('localid', data.userf._id);
    localStorage.setItem('expirationDate', expirationDate);
    
  
    if(window.location.pathname === '/checkout'){
      
    }
    else{
      if(user.name == null){
        this.props.history.push('/user');
      }
      if(user.email == null){
        this.props.history.push('/user');
      }
    }

    
    
    this.setState({ code: false, phone: '', codes: '', error: false });
        } else {
          this.setState({ codes: '', error: true});
        }
      }
    
    } catch (error) {
      console.log(error);
    }
  };
  closeModal = event => {
    

  }
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    
  };

  render() {
    return (
      <div className="popup__container">
      <div className="popup__container-overlay" onClick={this.closeModal} ></div>
      <div className="popup__container-content" >
          <div className="popup__dialog popup__dialog_transition-in" >
              <div className="popup__dialog-inner">
              <i data-testid="popup__dialog-close" onClick={this.closeModal}  className="svg-icon popup__dialog-close"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path  d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z" fill="white"></path>
  </svg>
  </i>
                  <div className="login-popup">
                      <div className="login-popup__header">
                          <h2 className="title title_h1">Вход на сайт</h2>
                      </div>
                      <div className="login-popup__content">
                          <div className="login-popup__phone">
                              <div className="error-tooltip-wrapper">
                              {this.state.code ? null : <FormInput
                                name='phone'
                                type='tel'
                                handleChange={this.handleChange}
                                value={this.state.phone}
                                label='Номер телефона'
                                placeholder="+7 999 999-99-99"
                                maxLength='12'
                                required
                              />}
                              {this.state.code === true && <FormInput
                                name='codes'
                                type='text'
                                handleChange={this.handleChange}
                                value={this.state.codes}
                                label='Код подтверждения'
                                placeholder="1234"
                                maxLength='12'
                                required
                              />}
                              {this.state.error === true && (<p>Неверный код из СМС</p>)}
                                  
                              </div>
                          </div>
                          
                          <button onClick={this.handleSubmit} type='submit' className="primary-orange login-popup-button button button_large">{this.state.code ? null : 'Выслать код'}{this.state.code === true && 'Авторизоваться' }</button>
                          
                          
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
  }
}

//export default LoginModal;
export default LoginModal;


