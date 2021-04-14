import React from 'react';

function Purchase(props) {
  return (
    <div className='background'>
      <div className='bookWindow'>
        <img src='' alt='' />
        <div className='bookInfo'>
          <h4 className='titleBook' >Название </h4>
          <h6 className='authorBook' >Автор </h6>
        </div>
        <div className='formPurchase'>
          Здесь форма оплаты картой 
          {/* Сайт https://yoomoney.ru/quickpay/form */}
        </div>
      </div>
    </div>
  );
}

export default Purchase;
