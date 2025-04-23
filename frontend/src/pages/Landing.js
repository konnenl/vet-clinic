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
          <ServiceCard name="Диагностика и обследования" src="https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-pet_23-2149143882.jpg?t=st=1745314334~exp=1745317934~hmac=d3f76f29391e66284ede3bf48d39c8f455572a048c8deaacce853d6b55ece59f&w=1380"/>
          <ServiceCard name="Терапия и лечение" src="https://img.freepik.com/free-photo/high-angle-careful-doctors-helping-sick-dog_23-2148302253.jpg?t=st=1745314364~exp=1745317964~hmac=9b1b41e38bc238c1115ffe54ac3032c757e48fa9e48377eaf9e8a0e071417270&w=1380"/>
          <ServiceCard name="Хирургия" src="https://img.freepik.com/free-photo/cute-dog-consultation_23-2149314356.jpg?t=st=1745314549~exp=1745318149~hmac=a5d827d2d3809ec2ecbe605d6d5de80edcfcf6821ec3fdf02a281e64f97a671b&w=1380"/>
          <ServiceCard name="Стоматология" description='Избавим вашего питомца от неприятного запаха изо рта :3' src="https://avatars.mds.yandex.net/i?id=edf543e964ecf52732f880fbbf6bbc792a8557b6-8497298-images-thumbs&n=13"/>
        </ul>
      </section>
      <Footer />
    </div>
  )
}
