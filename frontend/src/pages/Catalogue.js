import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DropDown from '../components/DropDown/DropDown';
import ServiceCard from '../components/ServiceCard/ServiceCard';

export default function Catalogue() {

  const [filter,setFilter]=useState('all')
  const [services, setServices] = useState([
    { id: 1, name: "УЗИ диагностика", category: "diagnostics", description: "Ультразвуковое исследование внутренних органов", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
    { id: 2, name: "Анализы крови", category: "diagnostics", description: "Лабораторные исследования крови", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380"},
    { id: 3, name: "Терапия", category: "treatment", description: "Консервативное лечение заболеваний", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380"},
    { id: 4, name: "Капельницы", category: "treatment", description: "Инфузионная терапия", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
    { id: 5, name: "Стерилизация", category: "surgery", description: "Хирургическая стерилизация животных", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
    { id: 6, name: "Удаление опухолей", category: "surgery", description: "Оперативное вмешательство", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
    { id: 7, name: "Чистка зубов", category: "dentistry", description: "Профессиональная гигиена полости рта", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
    { id: 8, name: "Удаление зубов", category: "dentistry", description: "Хирургическая стоматология", src: "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380" },
  ]);

  const categoryNames = {
    all: "Все категории",
    diagnostics: "Диагностика",
    treatment: "Лечение",
    surgery: "Хирургия",
    dentistry: "Стоматология"
  };
  
  useEffect(()=>{
    document.title = 'Каталог'
  },[])

  const filteredServices = filter === "all"  ? services : services.filter(service => services.category == filter);                                                       
  
  return (
    <div className="wrapper">
      <Header />
      <main>
        <DropDown />
        {filteredServices.length > 0 ? (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginTop: '32px',
              paddingTop:'20px',
              borderRadius: '12px',
              backgroundColor: '#66a08a'
            }}>
              {filteredServices.map(service => (
                <ServiceCard 
                  key={service.id}
                  name={service.name}
                  category={categoryNames[service.category]}
                  description={service.description}
                  src={service.src}
                />
              ))}
            </div>
          ) : (
            <p style={{ 
              textAlign: 'center', 
              color: '#666',
              fontSize: '18px',
              padding: '40px 0'
            }}>
              В выбранной категории услуг пока нет
            </p>
          )}
      </main>
      <Footer />
    </div>                                                      
  )
}
