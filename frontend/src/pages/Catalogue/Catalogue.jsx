import React, { useEffect, useState } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './Catalogue.css'

export default function Catalogue() {
  const services = [
    {title:'Терапия', count: 29, src:"https://optim.tildacdn.com/tild3735-6631-4130-a130-663235363233/-/resize/454x/-/format/webp/pngegg_2_2.png.webp"},
    {title:'Хирургия', count: 33, src:"https://optim.tildacdn.com/tild3862-6566-4863-b239-356564633939/-/resize/342x/-/format/webp/pngwing_10.png.webp"},
    {title:'Узи', count: 6, src:"https://optim.tildacdn.com/tild3439-6366-4232-b935-333932343765/-/resize/426x/-/format/webp/noroot.png.webp"},
    {title:'Лабораторная диагностика', count: 37, src:"https://optim.tildacdn.com/tild3237-6563-4662-a162-393533663435/-/resize/292x/-/format/webp/noroot.png.webp"},
    {title:'Груминг', count: 11, src:"https://optim.tildacdn.com/tild3730-6430-4763-b532-643130373831/-/resize/446x/-/format/webp/noroot.png.webp"},
    {title:'Гигенические процедуры', count: 8, src:"https://optim.tildacdn.com/tild3334-3337-4236-b166-303036646231/-/resize/312x/-/format/webp/pngegg_7.png.webp"},
    {title:'Вакцинация', count: 8, src:"https://optim.tildacdn.com/tild3065-6364-4634-b734-303431653963/-/format/webp/noroot.png.webp"},
    {title:'Прием специалиста', count: 5, src:"https://optim.tildacdn.com/tild6464-3865-4636-a539-326534636631/-/resize/460x/-/format/webp/noroot.png.webp"},
    {title:'Стоматология', count: 24, src:"https://optim.tildacdn.com/tild3438-3735-4938-a136-396165636330/-/format/webp/white-dog.png.webp"},
  ];
  
  useEffect(() => {
    document.title = 'Каталог'
  }, [])

  return (
    <main>
      <div className="services-section">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} // важно добавить key для каждого элемента в списке
            title={service.title} 
            count={service.count} 
            src={service.src}
          />
        ))}
      </div>
    </main>                                                   
  )
}
