// ProductCarousel.jsx
  import { useRef, useState, useEffect } from 'react';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { EffectFade, Navigation, Pagination, Keyboard } from 'swiper/modules';
  import {getSizesAndStock} from '../lib/api/sizesAndStock.js';
  import OptimizeByCloudinary from '../lib/OptmizeByCloudinary'



  import 'swiper/css';
  import 'swiper/css/effect-fade';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { MoveRight, MoveLeft } from 'lucide-react';
  import { RefreshCcw } from 'lucide-react';
  import AddButton from './AddButton';


  export default function ColorsSwiper({ produits, description, price, slug }) {
      console.log('ColorsSwiper rendu avec slug:', slug);
    const swiperRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(0);

        const flatSlides = produits.flatMap((produit, index) => produit.photo.map((photo) => ({
          url: photo.url,
          produitIndex: index,
          produitId: produit.id
        }))
      )
      console.log('Flat slides:', flatSlides);

      const firstSlideOfProduct = [];
      flatSlides.forEach((slide, index) => {
        if (firstSlideOfProduct[slide.produitIndex] === undefined) {
          firstSlideOfProduct[slide.produitIndex] = index;
        }
      })

    const [produitDynamique, setProduitDynamique] = useState(produits);

    const fetchProduits = async () => {
        const produit = await getSizesAndStock(slug);
        console.log('Fetching produit pour slug :', slug);

        setProduitDynamique(produit.produit_couleurs);
        console.log('Produit dynamique mis à jour:', produitDynamique);
      }
    useEffect(() => {

      fetchProduits();
    }
    , []);


    const couleurs = produits.map(produit => (produit.couleur.hex)
      );
    const taillesdisponibles = produitDynamique[selectedIndex]?.produit_couleur_sizes?.filter(size => (size.stock - size.reserve) > 0)



      const symbols = ["XS", "S", "M", "L", "XL" ];
      const [chosenItem, setChosenItem] = useState(null);


     useEffect(() => {
      setChosenItem(null);
    }, [selectedIndex]);

    useEffect(()=> {
      console.log("dernier item choisi:", chosenItem);
    },[chosenItem])

    const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    if (isSpinning) return; // éviter clics multiples pendant l'animation
    setIsSpinning(true);
    await fetchProduits();
    // Après l’animation, on enlève la classe
    setTimeout(() => {
      setIsSpinning(false);
    }, 400); // Durée de l’animation en ms

  };

    return (
      <>
        <div className="lg:h-[calc(100vh-13em)] ">

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
            onSwiper ={(swiper) => {
              swiperRef.current = swiper;
            }
            }
            onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            const produitIndex = flatSlides[realIndex].produitIndex;
            setSelectedIndex(produitIndex);
            }}
          >

            {flatSlides.map((produit) => (



                <SwiperSlide key={produit.id}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginBottom: '3em',

                  }}>



                    <div className=" lg:min-w-[28em] flex flex-col h-[100%] items-center justify-center">

                        <img src={`${OptimizeByCloudinary(produit.url)}`} alt={produit.name} className="lg:w-[430px] w-[250px] lg:h-[480px] h-[250px] object-contain" />


                    </div>
                  </div>
                </SwiperSlide>

            ))}

                <div className="swiper-button-prev" id="fleche-gauche">
                <MoveLeft color="#8940f0" />
                </div>
                <div className="swiper-button-next" id="fleche-droite">
                <MoveRight color="#8940f0" />
                </div>


          </Swiper>
          <div className="flex flex-col mt-[1em]">
            <div className="flex justify-center">
              {couleurs.map((groupe, index) => (
                <div key={index}
                  onClick={() => {
                    const slideIndex = firstSlideOfProduct[index];

                    if (slideIndex !== undefined){

                      swiperRef.current.slideToLoop(slideIndex)}
                    }
                  }
                  className={`w-[1.5em] h-[1.5em] rounded-full m-2 cursor-pointer ${selectedIndex === index ? 'orange-border' : ''}`}
                  style={{ background: groupe.length === 1 ? groupe[0].HEX : `linear-gradient(to right, ${groupe[0].HEX} 50%, ${groupe[1].HEX} 50%)`}}>
                </div>
              )
              )}
            </div>
            <div className="flex justify-center">
              {symbols.map(symbol => {
                const isAvailable = taillesdisponibles.some(size => size.taille === symbol);
                const isClicked = chosenItem && chosenItem.size === symbol;
                return(
                <div key={symbol} onClick={() => {
                  const taillecliquée = taillesdisponibles.find(size => size.taille === symbol);
                  if (taillecliquée) {
                    const structuredData ={
                      documentId: taillecliquée.documentId,
                      product: produitDynamique[selectedIndex].nom,
                      size: taillecliquée.taille,
                      price: price,

                    }
                    setChosenItem(structuredData);
                  }
                }

                } className={`w-[1.5em] h-[1.5em] rounded-full m-2 flex items-center justify-center  ${isAvailable ? 'cursor-pointer' : ' text-gray-400'} ${isClicked ? ' orange-border' : ''}`}>
                  {symbol}
                </div>
              )})}
            </div>
            <button className="justify-center flex" >
              <RefreshCcw onClick={handleClick} className={`w-[1.5em] h-[1.5em] m-2 cursor-pointer  color="#8940f0 ${isSpinning ? "spin-once" : ""}`} />
            </button>

        </div>
        </div>

        <div className="flex justify-center mt-[1em]">
          <div className="lg:w-[50%] flex flex-col items-center gap-[2em]">
            <p className=" text-center last-center">{description} Envie d’un corset unique, brodé, ou dans un coloris spécifique ? <a href="/projet-custom" className="underline underline-offset-4 ">Contactez-nous</a>, nous vous ferons un devis !</p>
            <p className=" text-[1.6em]">{price} €</p>


            <AddButton product={chosenItem} />
          </div>
        </div>


    </>);
  }
