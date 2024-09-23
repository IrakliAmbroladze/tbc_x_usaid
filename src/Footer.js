import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='app-footer'>
      <div>
        <b> ჩვენ შესახებ</b>
        <div className='footer-info'> მოსაყოლი ბევრია ... </div>
        
      </div>
      <div>
      <b> პროდუქტები</b>
      <ul>
        <li>ყავა</li>
        <li>და</li>
        <li>ლუდი</li>
      </ul>
      </div>
      <div>
      <b> კონტაქტი</b>
      <div className='contact-info'>
        <div>phone: +995 ... </div>
        <div>e-mail: mail@mail.ge</div>
         
      </div>

      </div>
      
    </div>
  )
}
