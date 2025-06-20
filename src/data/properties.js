import img1 from "../assets/images/Image.png";
import img2 from "../assets/images/Image-2.png";
import img3 from "../assets/images/Image-3.png";
import img4 from "../assets/images/Image-4.png";
import img5 from "../assets/images/Image-5.png";
import img6 from "../assets/images/Image-6.png";

const imgs = [img1, img2, img3, img4, img5, img6];

// 30 properties all near Ottawa
export const properties = Array.from({ length: 30 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Ottawa Property ${i + 1}`,
  price: `$${(700000 + i * 50000).toLocaleString()}`,
  latitude: 45.414 + (Math.random() - 0.5) * 0.04, // ±0.02 degrees, 都在Ottawa附近
  longitude: -75.695 + (Math.random() - 0.5) * 0.04,
  image: imgs[i % imgs.length],
}));