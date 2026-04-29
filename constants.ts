
import { Product } from './types';

// Export CATEGORIES and SIZES for FilterSidebar component
export const CATEGORIES = ['All', 'Blouse', 'Skirt', 'Cardigan', 'Pajama', 'Pants'];
export const SIZES = ['All', 'S', 'M', 'L', 'XL'];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Embroidered Notch Collar Blouse",
    category: "Blouse",
    price: 152915,
    originalPrice: 179900,
    discount: 15,
    image: "https://colorbox.co.id/cdn/shop/files/I-BSWKEY225K068_ECRU_1_800x800_e3419d18-8e51-47f8-b5e1-5d0782c31cb9.jpg?v=1766760996",
    size: ["S", "M", "L"],
    color: "Ecru"
  },
  {
    id: 2,
    name: "Front Slit Denim Midi Skirt",
    category: "Skirt",
    price: 254915,
    originalPrice: 299900,
    discount: 15,
    image: "https://colorbox.co.id/cdn/shop/files/I-SDDKEY225K166_LT._BLUE_1_75b48fa2-a7e5-4412-b863-6c649d9ad237.jpg?v=1766759831",
    size: ["M", "L"],
    color: "LightBlue"
  },
  {
    id: 3,
    name: "Buttoned Up Long Sleeve Cardigan",
    category: "Cardigan",
    price: 237915,
    originalPrice: 279900,
    discount: 15,
    image: "",
    size: ["S", "M", "L", "XL"],
    color: "Lilac, Cherry, Cream"
  },
  {
    id: 4,
    name: "Printed Notch Collar Shorts Pajama Set",
    category: "Pajama",
    price: 169915,
    originalPrice: 199900,
    discount: 15,
    image: "",
    size: ["S", "M", "L", "XL"],
    color: "MultiColor"
  },
  // Fixed syntax for product 5: added missing size and color properties
  {
    id: 5,
    name: "High Waist Barrel Pants",
    category: "Pants",
    price: 280415,
    originalPrice: 329900,
    discount: 15,
    image: "",
    size: ["S", "M", "L"],
    color: "Ecru"
  }
];
