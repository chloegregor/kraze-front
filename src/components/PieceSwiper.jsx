
// ProductCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules';
import OptimizeByCloudinary from '../lib/OptmizeByCloudinary'
import {useState, useEffect} from 'react';
import {getPieceStock} from '../lib/api/sizesAndStock.js';
import AddButton from './AddButton';


import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoveRight, MoveLeft } from 'lucide-react';


  export default function ProductsSwiper( {piece} ) {

  const structuredData = {
  documentId: piece.documentId,
  product: piece.titre.toUpperCase(),
  size: "",
  price: piece.price,
  type: 'piece-unique',

}


    const [stockMinusReserve, setStockMinusReserve] = useState((piece.stock - piece.reserve));
    console.log('Stock minus reserve for piece', piece.slug, ':', stockMinusReserve);
    useEffect(() => {
      const fetchStock = async () => {
        const produit = await getPieceStock(piece.slug);
        setStockMinusReserve(produit.stock - produit.reserve);
      };
      fetchStock();
      console.log('Updated stock minus reserve for piece', piece.slug, ':', stockMinusReserve);
    }, []);







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
         <div className="flex justify-center mt-[1em]">
          <div className="lg:w-[50%] flex flex-col items-center gap-[2em]">
            <div class="flex justify-center mt-[1em]">
              <div class=" flex flex-col items-center gap-[2em]">
                <p class=" text-center last-center">{piece.description}</p>
                <p class=" text-[1.6em]">{piece.price} €</p>

                {
                  piece.stock - piece.reserve > 0
                  ? <AddButton client:load product={structuredData} />
                  :<p class="text-red-500">Cette pièce n'est plus disponible.</p>
                }
              </div>
            </div>
          </div>
        </div>
      </Swiper>
    );
  }
