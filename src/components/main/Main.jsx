import React from 'react';
import './Main.css';
import { ItemGrid } from '../item_grid/ItemGrid';

export default function Main() {
  return (
    <main className='app-main'>
{/*       
      <img src={luarsabi}  />
      <div> 
      კარგი რამ იყო თავად თათქარიძის სახლ-კარი. წარმოიდგინეთ შუა კახეთის პატარა სოფელში ერთი ტრიალი, დაცემული ადგილი და იმ ადგილის შუაგულსა — ორსართულიანი სახლი ქვითკირისა. აი, ის სართულები რა ფერისა იყო: ქვეშ იყო მარანი, წალმით დახურული, და იმ მარნის უკანა კედელზედ ამოყვანილი გახლდათ ერთი პატარა ოთახი მოაჯირითურთ. მოაჯირს ეკრა ზედ მერცხლის ბუდესავით ერთი მცირედი ფიცრული, რომელიც საქვეშაგებოსა ჰთამაშობდა. 
        </div> */}
    <ItemGrid />

    </main>
  )
}
