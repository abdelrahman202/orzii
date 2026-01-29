import { Collection } from '../types/product';

export const collections: Collection[] = [
  {
    id: 'bracelets',
    name: 'Bracelets',
    nameAr: 'الإسورات',
    slug: 'bracelets',
    description: 'Timeless signature bracelets that define your identity. Each piece is a testament to heritage and refined taste.',
    descriptionAr: 'إسورات توقيعية خالدة تحدد هويتك. كل قطعة هي شهادة على التراث والذوق الرفيع.',
    status: 'available',
    image: '/straight.jpg',
    productCount: 3,
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    nameAr: 'الملابس الخارجية',
    slug: 'outerwear',
    description: 'Curated outerwear collection coming soon. Expect luxury tailoring and heritage craftsmanship.',
    descriptionAr: 'مجموعة الملابس الخارجية المختارة قريبًا. نتوقع الخياطة الفاخرة والحرفية التراثية.',
    status: 'coming-soon',
    image: '/straight.jpg',
    productCount: 0,
  },
  {
    id: 'tailored',
    name: 'Tailored Pieces',
    nameAr: 'القطع المخصصة',
    slug: 'tailored',
    description: 'Custom tailored pieces designed exclusively for the discerning. Currently sold out.',
    descriptionAr: 'قطع مخصصة موضوعة حصريًا للأفراد ذوي الذوق الرفيع. غير متاحة حاليًا.',
    status: 'sold-out',
    image: '/straight.jpg',
    productCount: 0,
  },
];
