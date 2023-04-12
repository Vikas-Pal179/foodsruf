import React from "react";
import axios from 'axios';
import Slider from "react-slick";

import Image from 'next/image'
class Sliders extends React.Component {
    constructor() {
        super();
    
        this.state = {
          sections: [
            
          ],
          index: 0
        };
      }
      componentDidMount() {
        let url = 'https://admin.foodsurf.ru/api/public/slider';
        axios.get(url)
          .then(
            (result) => {
    
              this.setState({
                
                sections: result.data
              });
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
              this.setState({
                error
              });
            }
          )
      }
  render() {
    var settings = {
        dots: true,
        centerMode: true,
        // centerPadding: '10%',

        variableWidth: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        loop: true,
        
    };
    return (
      <div>
      <Slider className='slider slider--dect' {...settings}>
       
        
        {this.state.sections.map(item => {
          const {id, image, alt} = item

          return (
            <div key={id} className='slide'>
            <Image
            src={'https://file.foodsurf.ru/slider/'+image}
            className="d-block w-100"

            alt={alt}
            layout='responsive'
            width={1280}
            height={375}

            />
            
            </div>
            
            )})}
            {this.state.sections.map(item => {
          const {id, image, alt} = item

          return (
            <div key={id+'1'} className='slide'>
            <Image
            src={'https://file.foodsurf.ru/slider/'+image}
            className="d-block w-100"

            alt={alt}
            layout='responsive'
            width={1280}
            height={375}

            />
            
            </div>
            
            )})}
      </Slider>
      <Slider className='slider slider--mobile' {...settings}>
       
      {this.state.sections.map(item => {
        const {id, imagemob, alt} = item

        return (
          <div key={id+'2'} className='slide'>
          <Image
          src={'https://file.foodsurf.ru/slider/'+imagemob}
          className="d-block w-100"

          alt={alt}

          layout='responsive'
          width={600}
          height={600}

          />
          
          </div>
          
          )})}
        {this.state.sections.map(item => {
        const {id, imagemob, alt} = item

        return (
          <div key={id+'3'} className='slide'>
          <Image
          src={'https://file.foodsurf.ru/slider/'+imagemob}
          className="d-block w-100"

          alt={alt}

          layout='responsive'
          width={600}
          height={600}

          />
          
          </div>
          
          )})}
            
            
            

            

      </Slider>
      </div>
    );
  }
}
export default Sliders;
