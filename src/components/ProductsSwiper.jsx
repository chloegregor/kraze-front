
// ProductCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules';
import OptimizeByCloudinary from '../lib/OptmizeByCloudinary'
import {useState, useEffect} from 'react';
import {getProducts} from '../lib/api/produits.js';


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoveRight, MoveLeft } from 'lucide-react';


  export default function ProductsSwiper({ produits }) {


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
      <>

      <Swiper
        modules={[EffectFade, Navigation, Pagination, Keyboard]}
        spaceBetween={50}
        effect={''}
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

        {produits.map((produit) => (

          <SwiperSlide key={produit.id}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: '100%'

            }}>



                <a href={`produits/${produit.slug}`} className="swiper-link border lg:w-[30%]">
                  <div className="content">
                    <img src={`${OptimizeByCloudinary(produit.produit_couleurs[0].photo[0].url)}`} alt={produit.name} className="" />
                    <div className="detailsproduits">
                      <p>{produit.name}</p>
                      <p>{produit.produit_couleurs.length} coloris </p>
                    </div>
                </div>
              </a>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
        <div className="swiper-button-prev" id="fleche-gauche2">
        <MoveLeft color="#8940f0" />
        </div>
        <div className="swiper-button-next" id="fleche-droite2">
        <MoveRight color="#8940f0" />
        </div>
      </>
    );
  }
