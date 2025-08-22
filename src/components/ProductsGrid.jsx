import ProductCart from './ProductCart.jsx';
import {useState, useEffect} from 'react';
import {getPieceUniques} from '../lib/api/piece-uniques.js';

export default function ProductsGrid( {pieceUniques} ) {

  const tags = Array.from(new Set(pieceUniques.flatMap(piece => piece.tags.map(tag => tag.tag))));

  const [SelectedTag, setSelectedTag] = useState(pieceUniques);

  const handleTagClick = (tag) => {
    if (tag === 'All') {
      setSelectedTag(pieceUniques);
    } else {
      const filtered = pieceUniques.filter(piece => piece.tags.some(t => t.tag === tag));
      setSelectedTag(filtered);
    }
  }
  console.log('Produits après filtrage :', SelectedTag);

  return (
    pieceUniques.length > 0 ?
    <>
      <nav className="flex gap-2 ">
        <button onClick={() => handleTagClick('All')} className="cursor-pointer orange" key="All">Tout voir</button>
        {tags.map (tag => (
          <button onClick={() => handleTagClick(tag)} className="cursor-pointer orange capitalize" key={tag}>{tag}</button>
        ))}
      </nav>
      <div className="  mt-[3em] grid lg:grid-cols-4 lg:gap-20 gap-4">
        {SelectedTag.map(piece => (
          <div className="w-full " key={piece.id}>
            <ProductCart piece_unique={piece} />
          </div>
        ))}
      </div>
    </>
    : <p className="text-center lg:mt-[1em]">Aucune pièce unique disponible pour le moment.</p>

  );
}
