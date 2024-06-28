import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import BookCardV2 from '../CardBook/CardBook';
import { useNavigate } from 'react-router-dom';

const SlideSwip = ({ item }) => {
  const navigate = useNavigate()
  return (<>
    <Swiper

      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      spaceBetween={5}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }}
      pagination={{
        clickable: true,
      }}

      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {item?.map((el) => (
        <SwiperSlide><BookCardV2 item={el} handleTitleOnClick={() => {
          navigate(`/book-detail/${el?.bookId}`);
        }} /></SwiperSlide>
      ))}
    </Swiper>

  </>);
}

export default SlideSwip;