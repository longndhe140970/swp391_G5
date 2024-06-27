import MainLayput from "../layout/MainLayout";
import React, { useEffect, useRef, useState } from 'react';
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
import { BOOK_API } from "../services/constant";
import { sendRequest } from "../services/sendRequest";

const HomePage = () => {
  // const book = [
  //   {
  //     bookId: 1,
  //     title: "Nhà giả kim",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Hiểu về trái tim",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/z/4/z4118763446785_cf4bc22d353b065bbb37e686de1f9207.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "“Hiểu về trái tim” là một cuốn sách đặc biệt được viết bởi thiền sư Minh Niệm. Với phong thái và lối hành văn gần gũi với những sinh hoạt của người Việt, thầy Minh Niệm đã thật sự thổi hồn Việt vào cuốn sách nhỏ này."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Hoàng tử bé",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_6_6.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Hoàng tử bé được xuất bản lần đầu năm 1943 của nhà văn, phi công người Pháp Antoine de Saint-exupéry là một trong những cuốn tiểu thuyết kinh điển nổi tiếng nhất mọi thời đại."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Đắc nhân tâm",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/d/n/dntttttuntitled.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Đắc nhân tâm của Dale Carnegie là quyển sách của mọi thời đại và một hiện tượng đáng kinh ngạc trong ngành xuất bản Hoa Kỳ."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Yêu - Being in love",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/b/e/beinglove.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Trong “Yêu” (Tựa gốc: Being in Love), Osho dẫn người đọc vào một hành trình tìm hiểu táo bạo và đầy sôi nổi về “hiện tượng bí ẩn” mang tên tình yêu."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Flow - Dòng chảy",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_4401.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Có bao giờ bạn hoàn toàn chìm đắm vào một cuốn sách hay, một công việc, hay một buổi trình diễn đến mức không nhận thấy hàng giờ đồng hồ đã trôi qua"
  //   },
  //   {
  //     bookId: 1,
  //     title: "Phòng trọ ba người",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974178644.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Phòng trọ ba người là nơi dành cho ba chàng sinh viên Chuyên, Nhiệm, và Mẫn"
  //   }
  // ]
  // const databook = [
  //   {
  //     bookId: 1,
  //     title: "Lén nhặt chuyện đời",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786043651591_1.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Tại vùng ngoại ô xứ Đan Mạch xưa, người thợ kim hoàn Per Enevoldsen đã cho ra mắt một món đồ trang sức lấy ý tưởng từ Pandora"
  //   },
  //   {
  //     bookId: 1,
  //     title: "Như chim sải cánh",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_239012.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Qua mười một giai thoại kinh điển, từ vị giáo sư trong đầu chứa đầy ý tưởng đến mức không còn có thể học thêm gì khác, cho đến vị tăng đầu bếp giải công án bằng cách."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Rừng Nauy",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_240307.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Câu chuyện bắt đầu từ một chuyến bay trong ngày mưa ảm đạm, một người đàn ông 37 tuổi chợt nghe thấy bài hát gắn liền với hình ảnh người yêu cũ."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Em đến Ý để yêu",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_21831.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Câu chuyện tình yêu lãng mạn, ngọt ngào, nhiều thú vị của một cô gái Việt với một chàng trai người Ý"
  //   },
  //   {
  //     bookId: 1,
  //     title: "Dưới ánh sáo thu",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_39562.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Trời có trăng, và những vì sao đã ló dạng, nhưng tôi thích nhất là dò dẫm xuống trong bóng tối."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Người tập lớn",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/9/7/9786049996610-1.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "“Người tập lớn” như một lời nhắc bạn hãy chậm lại một chút để cảm nhận những điều tử tế giữa cuộc sống này."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Vô thường",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/z/3/z3925582813343_4bf5fd3ce48c2f8b6727ee8491967c92.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Sống chậm lại, yêu thương nhiều hơn"
  //   }
  // ]
  // const books = [
  //   {
  //     bookId: 1,
  //     title: "Tổ chim sẻ nâu",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/z/3/z3925582688247_b30d25fa5eb09fe0728fd1e49e06c456.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Đối thoại với thiên nhiên để rồi tìm được bình yên trước cuộc sống đổi thay khó lường"
  //   },
  //   {
  //     bookId: 1,
  //     title: "Mỉm cười sống tiếp",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/t/h/th_ng-b_o-ph_t-h_nh-m_m-c_ibia-1-mcst.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Ai biết được ngày mai rồi sẽ ra sao? Vậy cớ gì không sống cho ngày hôm nay"
  //   },
  //   {
  //     bookId: 1,
  //     title: "Nói là nhớ em",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_5682.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Phan Anh cung Bạch Dương (sinh ngày 8/4) yêu thích thể thao và yêu cái đẹp. Hiện tại đang sinh sống và làm việc tại Sài Gòn."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Cà phê cùng Tony",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974180548.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Tập bài viết truyền cảm hứng của tác giả Tony Buổi Sáng gửi cho các bạn trẻ."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Giọng của phố",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974187011.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Nói cho cùng, tạp văn là thứ văn mưu sinh, là thể loại 'tủi thân' nếu miễn cưỡng phải so với tiểu thuyết hay truyện ngắn."
  //   },
  //   {
  //     bookId: 1,
  //     title: "Mắt nói",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935280914117.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Nội dung quyển sách “Mắt Nói” bao gồm 10 phần chính, mỗi phần kể về hành trình của tác giả cùng nhóm nghiên cứu tiếp cận để hỗ trợ một người bệnh. "
  //   },
  //   {
  //     bookId: 1,
  //     title: "Chủ nghĩa khắc kỷ",
  //     imageUrl: "https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1-cnkk.jpg",
  //     authors: [
  //       "a", "b", "c"
  //     ],
  //     length: 12,
  //     language: "asdsad",
  //     publisher: ["a", "b", "c"],
  //     copies_available: 12,
  //     description: "Làm thế nào để giữ cho mình một tâm thái bình thản trước mọi giông bão cuộc đời?"
  //   }
  // ]
      const [dataBook, setDataBook] =useState([])
      useEffect(() => {
        const fetchBookData = async () => {
          const dataResponse = await sendRequest({
            method: "GET",
            endpoint: `${BOOK_API.BOOK_HOME}`,
            
          });
          
          setDataBook(dataResponse?.data?.data?.top10BookNew)
          dataBook?.map((item)=>({...item, copies_available: 12}))
          console.log('searchData :>> ', dataBook);
        }
        fetchBookData()
      }, []);

  return (<>
    <MainLayput>
      <div>
        <img src="https://github.com/LuongHuyenChauAnh/Image/blob/main/book%20banner.png?raw=true"/> 
      </div>
      <div className="bg-[rgb(255,241,227)] pb-6">

        <h2 className="pt-6 mt-20 text-4xl
         font-semibold text-center text-sky-950 cardo">
          Top sách thịnh hành
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
          {dataBook?. map((length)=>(
          <SwiperSlide><BookCardV2 item={length} /></SwiperSlide>
          ))}
        </Swiper>
      </div>

      
      <div className="bg-[rgb(255,241,227)] pb-6">
        <h2 className="pt-6 mt-20 text-4xl
         font-semibold text-center text-sky-950 cardo">
          Top sách bán chạy
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
          {dataBook?. map((length)=>(
          <SwiperSlide><BookCardV2 item={length} /></SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="bg-[rgb(255,241,227)] pb-6">
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
          {dataBook?. map((length)=>(
          <SwiperSlide><BookCardV2 item={length} /></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MainLayput>
  </>);
}

export default HomePage;