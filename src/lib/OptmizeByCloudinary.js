
export default function OptimizeByCloudinary(imageUrl) {
  if (!imageUrl) return null;

  return imageUrl.replace('/upload/', '/upload/q_auto,f_auto/')

 ;
}
