import React, {useState} from 'react';

import CatalogItem from './catalogItem';



const CatalogGroup = ({ routename, title, items, setModalItem, setModalShow}) => {
 

  return(
  
  <div id={routename} className='product_group'>
    <h2 className='title'>{title.toUpperCase()}</h2>
    <div className='ProductList'>
      {items
        
        .map(item => (
          <CatalogItem key={item.id} item={item} setModalShow={setModalShow}  setModalItem={setModalItem} />
        ))}
    </div>
    
  </div>
)};

export default CatalogGroup;
