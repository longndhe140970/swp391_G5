import MainLayput from "../layout/MainLayout";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BookCardV2 from "../components/CardBook/CardBook";
import Section from "../components/Section";

const HomePage = () => {
  const dataBook = {
    bookId: 1,
    title: "Nha Gia Kim",
    imageUrl: "https://cdn0.fahasa.com/media/catalog/product/n/h/nha-gia-kim-b.jpg",
    authors: [
      "a", "b", "c"
    ],
    length: 12,
    language: "asdsad",
    publisher: ["a", "b", "c"],
    copies_available: 12,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quos debitis vitae minima tenetur cupiditate repellat, labore unde in iure amet illum aliquam sit id quis corrupti tempore pariatur et?"
  }
  return (<>
    <MainLayput>
      <div>
        <h2 className="pt-6 mt-20 text-4xl
         font-semibold text-center text-sky-950 cardo">
          Top 100 sách thịnh hành
        </h2>
        <hr className="mx-auto bg-yellow-400 w-[50%] h-[2.5px] my-10" />
        <Swiper

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}


          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}

          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
        </Swiper>
      </div>

      <div>
        <h2 className="pt-6 mt-20 text-4xl
         font-semibold text-center text-sky-950 cardo">
          Top 100 sách bán chạy
        </h2>
        <hr className="mx-auto bg-yellow-400 w-[50%] h-[2.5px] my-10" />
        <Swiper

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}


          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}

          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
        </Swiper>
      </div>

      <div>
        <h2 className="pt-6 mt-20 text-4xl
         font-semibold text-center text-sky-950 cardo">
          Top sách dành cho bạn
        </h2>
        <hr className="mx-auto bg-yellow-400 w-[50%] h-[2.5px] my-10" />
        <Swiper

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}


          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}

          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
          <SwiperSlide><BookCardV2 item={dataBook} /></SwiperSlide>
        </Swiper>
      </div>
    </MainLayput>
  </>);
}

export default HomePage;