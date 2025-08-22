import OptimizeByCloudinary from '../lib/OptmizeByCloudinary';


export default function ProductCart({piece_unique}) {
  return (
    <a href={`/pieces_uniques/${piece_unique.slug}`} className="h-[fit-content] w-[fit-content]">
      <div className="flex flex-col items-center violet-border">
        <div className="">
          <img src={OptimizeByCloudinary(piece_unique.photos[0].url)} alt={piece_unique.titre} className="w-[15em] h-[15em] m-[1em]"/>
        </div>
        <div className="detailsproduits w-full mb-[1em]">
          <h3>{piece_unique.titre}</h3>
          <span className="price">${piece_unique.price.toFixed(2)}</span>
        </div>
      </div>
    </a>
  );

}
