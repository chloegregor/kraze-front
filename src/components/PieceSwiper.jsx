
// ProductCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules';
import OptimizeByCloudinary from '../lib/OptmizeByCloudinary'
import {useState, useEffect} from 'react';


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoveRight, MoveLeft } from 'lucide-react';


  export default function ProductsSwiper({ piece }) {


{
  /*
    const [produitsDynamiques, setProduitsDynamiques] = useState(produits);

    useEffect(() => {
      const fetchProduct = async () => {
        const produits = await getProducts();
        console.log('Produits récupérés:', produits);
        setProduitsDynamiques(produits);
      };
      fetchProduct();
    }, []);
*/
}





    return (

      <Swiper
        modules={[EffectFade, Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        navigation= {{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        keyboard={{ enabled: true }}
        loop={true}
      >

        {piece.photos.map((pp) => (

          <SwiperSlide key={piece.id}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%',
              marginBottom: '3em',


            }}>



              <div className="flex flex-col w-[100%] items-center justify-center">

                  <img src={`${OptimizeByCloudinary(pp.url)}`} alt={piece.titre} className="lg:w-[40%] w-[100%] h-[100%] object-fit-contain" />

              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev" id="fleche-gauche">
        <MoveLeft color="#8940f0" />
        </div>
        <div className="swiper-button-next"id="fleche-droite">
        <MoveRight color="#8940f0" />
        </div>

      </Swiper>
    );
  }
