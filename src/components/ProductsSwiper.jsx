
// ProductCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoveRight, MoveLeft } from 'lucide-react';


  export default function ProductsSwiper({ produits }) {
    return (

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        slidesPerView={1}
        navigation= {{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        keyboard={{ enabled: true }}
        loop={true}
      >
        {produits.map((produit) => (
          <SwiperSlide key={produit.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',

            }}>
            <div className="content">
              <img src={`${import.meta.env.STRAPI_URL}${produit.photo[0].url}`} alt={produit.name} />
              <span className="detailsproduits">
                <h2>{produit.name}</h2>
                <p>{produit.produit_couleurs.length} coloris </p>
              </span>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
        <MoveLeft color="#8940f0" />
        </div>
        <div className="swiper-button-next">
        <MoveRight color="#8940f0" />
        </div>

      </Swiper>
    );
  }
