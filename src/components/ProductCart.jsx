import OptimizeByCloudinary from '../lib/OptmizeByCloudinary';


export default function ProductCart({piece_unique}) {
  console.log('ProductCart component called with piece_unique:', piece_unique);
  return (
    <div className="product-cart">
      <img src={OptimizeByCloudinary(piece_unique.photos[0].url)} alt={piece_unique.titre} />
      <h3>{piece_unique.title}</h3>
      <p>{piece_unique.description}</p>
      <span className="price">${piece_unique.price.toFixed(2)}</span>
    </div>
  );

}
