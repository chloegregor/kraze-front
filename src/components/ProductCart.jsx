import OptimizeByCloudinary from '../lib/OptmizeByCloudinary';


export default function ProductCart({piece_unique}) {
  return (
    <a href={`/pieces_uniques/${piece_unique.slug}`}>
      <div className="flex flex-col w-[20em] h-[20em] items-center violet-border">
        <div className="">
          <img src={OptimizeByCloudinary(piece_unique.photos[0].url)} alt={piece_unique.titre} className="w-[15em] h-[15em] m-[1em]"/>
        </div>
        <h3>{piece_unique.titre}</h3>
        <span className="price">${piece_unique.price.toFixed(2)}</span>
      </div>
    </a>
  );

}
