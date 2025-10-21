import ProductCart from './ProductCart.jsx';
import {useState, useEffect} from 'react';


export default function ProductsGrid( {pieceUniques} ) {


  const tags = Array.from(new Set(pieceUniques.flatMap(piece => piece.tags.map(tag => tag.tag))));

  const [SelectedPieces, setSelectedPieces] = useState(pieceUniques);
  const [SelectedTag, setSelectedTag] = useState('All');

  const handleTagClick = (tag) => {
    if (tag === 'All') {
      setSelectedPieces(pieceUniques);
      setSelectedTag('All');
    } else {
      const filtered = pieceUniques.filter(piece => piece.tags.some(t => t.tag === tag));
      setSelectedPieces(filtered);
      setSelectedTag(tag);
    }
  }
  console.log('Produits après filtrage :', SelectedTag);

  return (
    pieceUniques.length > 0 ?
    <>
      <nav className="flex lg:gap-5  gap-3 flex-wrap">
        <button onClick={() => handleTagClick('All')} className={`cursor-pointer orange ${ SelectedTag === "All" ? `orange-underline` : ""}`} key="All">Tout voir</button>
        {tags.map (tag => (
          <button onClick={() => handleTagClick(tag)} className={`cursor-pointer orange capitalize ${tag === SelectedTag ? `orange-underline` : ""}`} key={tag}>{tag}</button>
        ))}
      </nav>
      <div className="  mt-[3em] grid lg:grid-cols-4 lg:gap-14 gap-4">
        {SelectedPieces.map(piece => (
          <div className="aspect-square" key={piece.id}>
            <ProductCart piece_unique={piece} />
          </div>
        ))}
      </div>
    </>
    : <p className="text-center lg:mt-[1em]">Aucune pièce unique disponible pour le moment.</p>

  );
}
