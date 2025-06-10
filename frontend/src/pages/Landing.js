import GreenButton from '../components/GreenButton/GreenButton';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { useEffect } from 'react';

export default function Landing() {
  
  useEffect(()=>{
    document.title = 'Добро пожаловать!'
  },[])

  return (
    <main>
      <section className="presentation">
        <div className="presentation__content">
          <div className="text__content">
            <h2>ЗАБОТА</h2>
            <p>О ваших питомцах для нас больше, чем просто работа!</p>
          </div>
          <GreenButton text="ВЫЗВАТЬ ВРАЧА"/>
        </div>
      </section>
    </main>
  )
}
