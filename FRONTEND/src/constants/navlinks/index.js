export const navlinks = [
  {
    icon: 'bx bxs-dashboard',
    to: '/',
    title: 'Dashboard',
    role:['ADMIN', 'SUPER-ADMIN', 'DELEVERYMAN']
  },
  {
    icon: 'bx bxs-user-detail',
    to: '/empolyee',
    title: 'Hodimlar',
    role:['SUPER-ADMIN']
  },
  {
    icon: 'bx bxs-add-to-queue',
    to: '/category',
    title: 'Mahsulot turlari',
    role:['SUPER-ADMIN']
  },
  {
    icon: 'bx bx-folder-plus',
    to: '/categories',
    title: 'Mahsulotlar',
    role:['SUPER-ADMIN']
  },
  {
    icon: 'bx bxs-contact',
    to: '/contacts',
    title: 'Contactlar',
    role:['SUPER-ADMIN']
  },
  {
    icon: 'bx bxs-user-plus',
    to: '/orders',
    title: 'Buyurtma',
    role:['ADMIN', 'SUPER-ADMIN','DELEVERYMAN']
  },
  {
    icon: 'bx bxs-user-plus',
    to: '/addorder',
    title: "Buyurtma qo'shish",
    role:['ADMIN', 'SUPER-ADMIN', 'DELEVERYMAN']
  },
  {
    icon: 'bx bxs-user-plus',
    to: '/delivery',
    title: "Buyurtma yetkazuvchi",
    role:['ADMIN', 'SUPER-ADMIN']
  },
  {
    icon: 'bx bxs-user-plus',
    to: '/tarix',
    title: "Tarix",
    role:['ADMIN', 'SUPER-ADMIN']
  },
  {
    icon: 'bx bxs-user-plus',
    to: '/newDelivery',
    title: "Yangi zakazlar",
    role:['ADMIN', 'SUPER-ADMIN']
  },
]
