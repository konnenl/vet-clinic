import Header from '../components/Header/Header';
import Footer  from '../components/Footer/Footer';
import GreenButton from '../components/GreenButton/GreenButton';
import ServiceCard from '../components/ServiceCard/ServiceCard';

export default function Landing() {
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
          <ServiceCard name="Диагностика и обследования"/>
          <ServiceCard name="Терапия и лечение"/>
          <ServiceCard name="Хирургия"/>
          <ServiceCard name="Стоматология" description='Избавим вашего питомца от неприятного запаха изо рта :3'/>
        </ul>
      </section>
      <Footer />
    </div>
  )
}
