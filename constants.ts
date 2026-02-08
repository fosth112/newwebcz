import { Product, Category, Banner, Shortcut, User, Log, Order } from './types';

export const MOCK_BANNERS: Banner[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', link: '#' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2665&auto=format&fit=crop', link: '#' },
];

export const MOCK_SHORTCUTS: Shortcut[] = [
  { id: '1', label: 'เติมเงิน', icon: 'Wallet', link: 'topup', color: 'from-blue-600 to-blue-400' },
  { id: '2', label: 'มินิเกม', icon: 'Gamepad2', link: 'minigame', color: 'from-purple-600 to-purple-400' },
  { id: '3', label: 'สินค้าทั้งหมด', icon: 'ShoppingBag', link: 'shop', color: 'from-cyan-600 to-cyan-400' },
  { id: '4', label: 'ติดต่อเรา', icon: 'MessageCircle', link: 'contact', color: 'from-pink-600 to-pink-400' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Valorant Accounts', order: 1 },
  { id: '2', name: 'Streaming Apps', order: 2 },
  { id: '3', name: 'Topup Services', order: 3 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Valorant - Rank Diamond',
    description: 'สกิน Vandal Prime, Phantom Oni, มีด Butterfly',
    price: 1500,
    agentPrice: 1350,
    discountPercent: 0,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    category: '1',
    stock: 5,
    type: 'id_pass',
    isVisible: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Netflix 4K (30 Days)',
    description: 'จอส่วนตัว 4K ดูได้ 30 วัน รับประกันตลอดอายุการใช้งาน',
    price: 120,
    agentPrice: 90,
    promoPrice: 99,
    isPromo: true,
    discountPercent: 17,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8efe85?auto=format&fit=crop&q=80&w=1000',
    category: '2',
    stock: 100,
    type: 'code',
    isVisible: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Youtube Premium',
    description: 'ไม่มีโฆษณา ฟังเพลง Background Play',
    price: 45,
    agentPrice: 35,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    category: '2',
    stock: 999,
    type: 'general',
    isVisible: true
  },
  {
    id: '4',
    name: 'ROV Shells 1000',
    description: 'เติมคูปอง ROV ราคาถูก สะดวกรวดเร็ว',
    price: 300,
    agentPrice: 290,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=1000',
    category: '3',
    stock: 50,
    type: 'general',
    isVisible: true
  },
   {
    id: '5',
    name: 'Valorant - Ascendant',
    description: 'แรงค์ Ascendant 3 สกินเยอะมาก คุ้มๆ',
    price: 2500,
    agentPrice: 2200,
    image: 'https://images.unsplash.com/photo-1624138784181-dc7f5b759b2d?auto=format&fit=crop&q=80&w=1000',
    category: '1',
    stock: 1,
    type: 'id_pass',
    isVisible: true
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  username: 'DemoUser',
  email: 'demo@example.com',
  role: 'USER',
  points: 500,
  balance: 1500.00,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

export const ADMIN_USER: User = {
  id: 'admin-1',
  username: 'admin',
  email: 'admin@xdvzstudio.com',
  role: 'ADMIN',
  points: 999,
  balance: 9999.00,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
};

export const MOCK_LOGS: Log[] = [
  { id: 'l1', userId: 'u1', action: 'Login', details: 'User logged in via Password', timestamp: new Date().toISOString(), type: 'AUTH' },
  { id: 'l2', userId: 'u1', action: 'Purchase', details: 'Bought Item #2', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'PURCHASE' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', userId: 'u2', productName: 'Netflix 4K', amount: 99, timestamp: new Date().toISOString(), status: 'completed' },
  { id: 'o2', userId: 'u3', productName: 'Youtube Premium', amount: 45, timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 'o3', userId: 'u4', productName: 'ROV Shells', amount: 300, timestamp: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
];

export const MOCK_STATS = [
  { label: 'สมาชิกทั้งหมด', value: '466 คน', icon: 'Users', color: 'text-gray-700 dark:text-gray-200' },
  { label: 'จำนวนสินค้าทั้งหมด', value: '10 ชิ้น', icon: 'ShoppingBag', color: 'text-gray-700 dark:text-gray-200' },
  { label: 'จำนวนสต็อกทั้งหมด', value: '515 ชิ้น', icon: 'Box', color: 'text-gray-700 dark:text-gray-200' },
  { label: 'ยอดขายวันนี้', value: '35.00 บาท', icon: 'ShoppingCart', color: 'text-blue-500' },
];
