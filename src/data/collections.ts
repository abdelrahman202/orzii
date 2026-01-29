import { Collection } from '../types/product';

export const collections: Collection[] = [
  {
    id: 'bracelets',
    name: 'ORZI - Heritage Bracelets',
    nameAr: 'الإسورات',
    slug: 'bracelets',
    description: 'Timeless signature bracelets that define your identity. Each piece is a testament to heritage and refined taste.',
    descriptionAr: 'إسورات توقيعية خالدة تحدد هويتك. كل قطعة هي شهادة على التراث والذوق الرفيع.',
    status: 'available',
    image: '/signature.jpg',
    productCount: 3,
  },
  {
    id: 'heritage-trousers',
    name: 'ORZI - Heritage Trousers',
    nameAr: 'أورزي - بنطلون التراث',
    slug: 'heritage-trousers',
    description: 'A wide-cut fabric trouser inspired by classic old-money tailoring. Timeless, refined, and designed to last beyond trends.',
    descriptionAr: 'بنطلون قماش واسع مستوحى من الخياطة الكلاسيكية الفاخرة. خالد ومصقول ومصمم ليدوم بعد الصيحات.',
    status: 'coming-soon',
    image: '/Trousers.webp',
    productCount: 0,
  },
  {
    id: 'heritage-polo',
    name: 'ORZI - Heritage Polo',
    nameAr: 'أورزي - بولو التراث',
    slug: 'heritage-polo',
    description: 'A knitted short-sleeve polo inspired by classic European summer style. Effortless elegance, designed to pair perfectly with ORZI tailoring.',
    descriptionAr: 'بولو منسوج قصير الأكمام مستوحى من أسلوب الصيف الأوروبي الكلاسيكي. أناقة بلا مجهود، مصمم ليتناسب بشكل مثالي مع خياطة أورزي.',
    status: 'coming-soon',
    image: '/polo.jpeg',
    productCount: 0,
  },
];
