export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type Spec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // تومان
  oldPrice?: number; // برای نمایش تخفیف
  description: string;
  longDescription: string;
  swatch: string; // گرادیان رنگی جایگزین (fallback) در صورت خطای بارگذاری تصویر
  image: string; // آدرس تصویر اصلی کالا
  gallery: string[]; // آدرس تصاویر گالری کالا
  rating: number; // از ۵
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  specs: Spec[];
  reviews: Review[];
};

export const categories = ["همه", "سفال", "فلزکاری", "بافت"] as const;

export const categoryTree = [
  {
    name: "سفال",
    icon: "🏺",
    subcategories: ["کاسه و بشقاب", "گلدان تزیینی", "کوزه و پارچ", "سرویس چای‌خوری"],
  },
  {
    name: "فلزکاری",
    icon: "🔔",
    subcategories: ["مسی قلم‌زنی", "برنجی", "نقره‌کوب", "جعبه فلزی"],
  },
  {
    name: "بافت",
    icon: "🧵",
    subcategories: ["گلیم دستباف", "ترمه", "روفرشی", "شال و روسری"],
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "کاسه سفالی لعاب فیروزه‌ای",
    category: "سفال",
    price: 480000,
    description: "دست‌ساز، لعاب سنتی فیروزه‌ای، مناسب سرو یا تزیین.",
    longDescription:
      "این کاسه به‌صورت کاملاً دستی روی چرخ سفالگری شکل گرفته و با لعاب سنتی فیروزه‌ای در کوره‌ی سنتی پخته شده است. به‌دلیل تفاوت طبیعی مواد اولیه، هر قطعه رگه‌های رنگی منحصربه‌فرد خود را دارد و هیچ دو نمونه دقیقاً مشابه هم نیستند. مناسب سرو میوه، تنقلات یا صرفاً به‌عنوان یک قطعه‌ی تزیینی روی میز.",
    swatch: "from-firuzeh to-firuzeh-dark",
    image: "/products/kase-sofal1.jpg",
    gallery: [
      "/products/kase-sofal1.jpg",
      "https://picsum.photos/seed/turquoise-bowl-2/800/800",
      "https://picsum.photos/seed/turquoise-bowl-3/800/800",
    ],
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    isNew: true,
    specs: [
      { label: "جنس", value: "سفال طبیعی" },
      { label: "قطر", value: "۲۲ سانتی‌متر" },
      { label: "وزن", value: "۶۵۰ گرم" },
      { label: "روش ساخت", value: "دست‌ساز روی چرخ سفالگری" },
      { label: "مناسب برای", value: "سرو، تزیین، شست‌وشوی دستی" },
    ],
    reviews: [
      {
        id: "r1",
        author: "سارا. م",
        rating: 5,
        date: "۱۴۰۴/۰۳/۱۲",
        text: "کیفیت لعاب فوق‌العاده بود، رنگش دقیقاً مثل عکس بود و بسته‌بندی هم خیلی ایمن.",
      },
      {
        id: "r2",
        author: "امیر ح.",
        rating: 4,
        date: "۱۴۰۴/۰۲/۰۱",
        text: "زیبا و اصیل، فقط کمی کوچک‌تر از چیزی بود که فکر می‌کردم.",
      },
    ],
  },
  {
    id: "p2",
    name: "گلدان کوچک نقش‌برجسته",
    category: "سفال",
    price: 620000,
    oldPrice: 740000,
    description: "نقوش هندسی برگرفته از کاشی‌کاری اصفهان.",
    longDescription:
      "الهام‌گرفته از نقوش کاشی‌کاری بناهای تاریخی اصفهان، این گلدان با تکنیک نقش‌برجسته‌ی دستی تزیین شده و برای گیاهان کوچک آپارتمانی یا به‌عنوان یک قطعه‌ی دکوری مستقل مناسب است.",
    swatch: "from-navy-light to-navy-dark",
    image: "https://picsum.photos/seed/relief-vase-1/800/800",
    gallery: [
      "https://picsum.photos/seed/relief-vase-1/800/800",
      "https://picsum.photos/seed/relief-vase-2/800/800",
      "https://picsum.photos/seed/relief-vase-3/800/800",
    ],
    rating: 4.6,
    reviewCount: 21,
    inStock: true,
    specs: [
      { label: "جنس", value: "سفال لعاب‌دار" },
      { label: "ارتفاع", value: "۱۸ سانتی‌متر" },
      { label: "قطر دهانه", value: "۹ سانتی‌متر" },
      { label: "دارای سوراخ زهکشی", value: "بله" },
    ],
    reviews: [
      {
        id: "r1",
        author: "نگین ص.",
        rating: 5,
        date: "۱۴۰۴/۰۱/۲۰",
        text: "نقش‌برجسته‌ها خیلی ظریف کار شده، عالیه برای هدیه.",
      },
    ],
  },
  {
    id: "p3",
    name: "قندان مسی قلم‌زنی شده",
    category: "فلزکاری",
    price: 950000,
    description: "قلم‌زنی دستی روی مس، مناسب هدیه.",
    longDescription:
      "قلم‌زنی این قندان توسط استادکاران اصفهانی و به‌صورت کاملاً دستی روی صفحه‌ی مسی انجام شده است. طرح‌های گل و بوته‌ی سنتی روی بدنه با دقت بالا حکاکی شده‌اند و ظرف با یک لایه‌ی محافظ ضدزنگ پوشش داده شده است.",
    swatch: "from-gold to-gold-light",
    image: "https://picsum.photos/seed/copper-sugarbowl-1/800/800",
    gallery: [
      "https://picsum.photos/seed/copper-sugarbowl-1/800/800",
      "https://picsum.photos/seed/copper-sugarbowl-2/800/800",
      "https://picsum.photos/seed/copper-sugarbowl-3/800/800",
    ],
    rating: 4.9,
    reviewCount: 58,
    inStock: true,
    specs: [
      { label: "جنس", value: "مس خالص با روکش ضدزنگ" },
      { label: "ارتفاع", value: "۱۲ سانتی‌متر" },
      { label: "تکنیک", value: "قلم‌زنی دستی" },
      { label: "وزن", value: "۴۰۰ گرم" },
    ],
    reviews: [
      {
        id: "r1",
        author: "محمد ک.",
        rating: 5,
        date: "۱۴۰۳/۱۲/۰۵",
        text: "برای هدیه گرفتم، کیفیت قلم‌زنی حرف نداشت.",
      },
      {
        id: "r2",
        author: "الهام ر.",
        rating: 5,
        date: "۱۴۰۴/۰۲/۱۸",
        text: "دقیقاً شبیه عکس‌ها بود، بسیار راضی‌ام.",
      },
    ],
  },
  {
    id: "p4",
    name: "گلیم دستباف کوچک",
    category: "بافت",
    price: 1750000,
    description: "بافت پشمی با رنگرزی گیاهی، ابعاد ۵۰×۷۰.",
    longDescription:
      "این گلیم با نخ پشم طبیعی و رنگرزی کاملاً گیاهی توسط بافنده‌های عشایری بافته شده است. طرح هندسی سنتی آن الهام‌گرفته از نقوش قومی جنوب ایران است و برای استفاده روی زمین یا به‌عنوان رودری مبل مناسب است.",
    swatch: "from-firuzeh-dark to-navy",
    image: "https://picsum.photos/seed/kilim-rug-1/800/800",
    gallery: [
      "https://picsum.photos/seed/kilim-rug-1/800/800",
      "https://picsum.photos/seed/kilim-rug-2/800/800",
      "https://picsum.photos/seed/kilim-rug-3/800/800",
    ],
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    specs: [
      { label: "جنس", value: "پشم طبیعی" },
      { label: "ابعاد", value: "۵۰×۷۰ سانتی‌متر" },
      { label: "رنگرزی", value: "گیاهی" },
      { label: "بافت", value: "دستباف عشایری" },
    ],
    reviews: [
      {
        id: "r1",
        author: "پریسا ن.",
        rating: 4,
        date: "۱۴۰۴/۰۱/۰۹",
        text: "بافت محکم و رنگ‌ها طبیعی و زیباست.",
      },
    ],
  },
  {
    id: "p5",
    name: "ترمه سفره‌ای طرح سنتی",
    category: "بافت",
    price: 890000,
    oldPrice: 990000,
    description: "پارچه ترمه یزد، مناسب رومیزی و سفره عقد.",
    longDescription:
      "این ترمه اصل یزد با نخ ابریشم و طرح بته‌جقه‌ی سنتی بافته شده و برای رومیزی، سفره‌ی عقد یا تزیین طاقچه استفاده می‌شود. لبه‌های آن با دست حاشیه‌دوزی شده‌اند.",
    swatch: "from-gold-light to-gold",
    image: "https://picsum.photos/seed/termeh-cloth-1/800/800",
    gallery: [
      "https://picsum.photos/seed/termeh-cloth-1/800/800",
      "https://picsum.photos/seed/termeh-cloth-2/800/800",
      "https://picsum.photos/seed/termeh-cloth-3/800/800",
    ],
    rating: 4.5,
    reviewCount: 12,
    inStock: true,
    specs: [
      { label: "جنس", value: "ابریشم و نخ طلایی" },
      { label: "ابعاد", value: "۱۰۰×۱۰۰ سانتی‌متر" },
      { label: "طرح", value: "بته‌جقه سنتی یزد" },
      { label: "شست‌وشو", value: "خشک‌شویی توصیه می‌شود" },
    ],
    reviews: [],
  },
  {
    id: "p6",
    name: "شمعدان برنجی دست‌ریز",
    category: "فلزکاری",
    price: 540000,
    description: "برنج ریخته‌گری‌شده، ارتفاع ۱۸ سانتی‌متر.",
    longDescription:
      "این شمعدان با تکنیک ریخته‌گری سنتی از برنج ساخته شده و سپس صیقل داده شده تا درخشش طلایی خود را حفظ کند. طراحی ساده و کلاسیک آن با هر دکوراسیونی هماهنگ می‌شود.",
    swatch: "from-navy to-firuzeh",
    image: "https://picsum.photos/seed/brass-candle-1/800/800",
    gallery: [
      "https://picsum.photos/seed/brass-candle-1/800/800",
      "https://picsum.photos/seed/brass-candle-2/800/800",
      "https://picsum.photos/seed/brass-candle-3/800/800",
    ],
    rating: 4.4,
    reviewCount: 19,
    inStock: false,
    specs: [
      { label: "جنس", value: "برنج ریخته‌گری‌شده" },
      { label: "ارتفاع", value: "۱۸ سانتی‌متر" },
      { label: "قطر پایه", value: "۸ سانتی‌متر" },
    ],
    reviews: [
      {
        id: "r1",
        author: "کیانا ب.",
        rating: 4,
        date: "۱۴۰۳/۱۱/۲۲",
        text: "زیباست ولی الان متاسفانه ناموجوده، منتظر می‌مونم.",
      },
    ],
  },
  {
    id: "p7",
    name: "کوزه آب‌خنک سفالی",
    category: "سفال",
    price: 720000,
    description: "سفال متخلخل، مناسب خنک نگه‌داشتن آب به‌روش سنتی.",
    longDescription:
      "این کوزه از سفال متخلخل ساخته شده که با تبخیر طبیعی رطوبت، آب داخل خود را به‌روش سنتی خنک نگه می‌دارد؛ بدون نیاز به یخچال یا برق. برای فضای آشپزخانه یا حیاط بسیار مناسب است.",
    swatch: "from-firuzeh-light to-firuzeh",
    image: "https://picsum.photos/seed/clay-jug-1/800/800",
    gallery: [
      "https://picsum.photos/seed/clay-jug-1/800/800",
      "https://picsum.photos/seed/clay-jug-2/800/800",
      "https://picsum.photos/seed/clay-jug-3/800/800",
    ],
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    isNew: true,
    specs: [
      { label: "جنس", value: "سفال متخلخل طبیعی" },
      { label: "ظرفیت", value: "۲.۵ لیتر" },
      { label: "ارتفاع", value: "۲۸ سانتی‌متر" },
    ],
    reviews: [
      {
        id: "r1",
        author: "رضا ف.",
        rating: 5,
        date: "۱۴۰۴/۰۳/۰۱",
        text: "آب واقعاً خنک می‌مونه، دقیقاً مثل کوزه‌های قدیمی مادربزرگم.",
      },
    ],
  },
  {
    id: "p8",
    name: "روفرشی گلیمی راه‌راه",
    category: "بافت",
    price: 1320000,
    description: "بافت دستی عشایری، طرح راه‌راه رنگارنگ.",
    longDescription:
      "این روفرشی با دست و توسط بافنده‌های عشایر بافته شده و طرح راه‌راه رنگارنگ آن الهام‌گرفته از فرهنگ کوچ‌نشینی جنوب ایران است. مقاوم در برابر رفت‌وآمد و مناسب راهرو یا کنار تخت.",
    swatch: "from-gold to-navy-light",
    image: "https://picsum.photos/seed/striped-runner-1/800/800",
    gallery: [
      "https://picsum.photos/seed/striped-runner-1/800/800",
      "https://picsum.photos/seed/striped-runner-2/800/800",
      "https://picsum.photos/seed/striped-runner-3/800/800",
    ],
    rating: 4.6,
    reviewCount: 27,
    inStock: true,
    specs: [
      { label: "جنس", value: "پشم و پنبه" },
      { label: "ابعاد", value: "۶۰×۱۲۰ سانتی‌متر" },
      { label: "بافت", value: "دستباف عشایری" },
    ],
    reviews: [
      {
        id: "r1",
        author: "مهسا ت.",
        rating: 4,
        date: "۱۴۰۴/۰۲/۲۸",
        text: "کیفیت بافت خوبه، رنگ‌بندی هم دقیقاً طبق عکس بود.",
      },
    ],
  },
];
