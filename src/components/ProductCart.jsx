import OptimizeByCloudinary from '../lib/OptmizeByCloudinary';
import {getPieceStock} from '../lib/api/sizesAndStock.js';
import { useState, useEffect } from 'react';


export default function ProductCart({piece_unique}) {

  const [stock, setStock] = useState(piece_unique.stock);
  const fetchStock = async () => {
    const produit = await getPieceStock(piece_unique.slug);

    setStock(produit.stock);
  }
  useEffect(() => {
    fetchStock();
  }, []);

  const isSoldOut = stock < 1;
  
  return (
    <a href={`/pieces-uniques/${piece_unique.slug}`} className="">
      <div className="flex flex-col items-center violet-border p-[0.5em] h-[100%]">

          <img src={OptimizeByCloudinary(piece_unique.photos[0].url)} alt={piece_unique.titre} className="w-[100%] h-[90%] object-cover "/>

        <div className="detailsproduits">
          <h3>{piece_unique.titre}</h3>
          <span className="price">{isSoldOut? "Vendu !" :`${piece_unique.price}€`}</span>
        </div>
      </div>
    </a>
  );

}
