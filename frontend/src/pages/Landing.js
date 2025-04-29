import Header from '../components/Header/Header';
import Footer  from '../components/Footer/Footer';
import GreenButton from '../components/GreenButton/GreenButton';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { useEffect } from 'react';

export default function Landing() {
  
  useEffect(()=>{
    document.title = 'Добро пожаловать!'
  },[])

  return (
    <div className="wrapper">
      <Header />
      <section className="presentation">
        <div className="presentation__content">
          <div className="text__content">
            <h2>ЗАБОТА</h2>
            <p>О ваших питомцах для нас больше, чем просто работа!</p>
          </div>
          <GreenButton text="ВЫЗВАТЬ ВРАЧА"/>
        </div>
      </section>
      <section className="our_services">
        <h2>НАШИ УСЛУГИ</h2>
        <ul className="services_area">
          <ServiceCard name="Терапия" src="https://optim.tildacdn.com/tild3735-6631-4130-a130-663235363233/-/resize/454x/-/format/webp/pngegg_2_2.png.webp"/>
          <ServiceCard name="Хирургия" src="https://optim.tildacdn.com/tild3862-6566-4863-b239-356564633939/-/resize/342x/-/format/webp/pngwing_10.png.webp"/>
          <ServiceCard name="Диагностика" src="https://optim.tildacdn.com/tild3237-6563-4662-a162-393533663435/-/resize/292x/-/format/webp/noroot.png.webp"/>
          <ServiceCard name="Груминг" src="https://optim.tildacdn.com/tild3334-3337-4236-b166-303036646231/-/resize/312x/-/format/webp/pngegg_7.png.webp"/>
        </ul>
      </section>
      <Footer />
    </div>
  )
}
