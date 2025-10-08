import OptimizeByCloudinary from '../lib/OptmizeByCloudinary';


export default function ProductCart({piece_unique}) {
  return (
    <a href={`/pieces-uniques/${piece_unique.slug}`} className="">
      <div className="flex flex-col items-center violet-border p-[0.5em] h-[100%]">

          <img src={OptimizeByCloudinary(piece_unique.photos[0].url)} alt={piece_unique.titre} className="w-[100%] h-[90%] object-cover "/>

        <div className="detailsproduits">
          <h3>{piece_unique.titre}</h3>
          <span className="price">{piece_unique.price}€</span>
        </div>
      </div>
    </a>
  );

}
