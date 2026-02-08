import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  ShoppingBag, 
  User as UserIcon, 
  LogOut, 
  Settings, 
  Wallet, 
  Gamepad2, 
  Home, 
  Menu,
  X,
  Search,
  ChevronRight,
  MessageCircle,
  LayoutDashboard,
  Box,
  Users,
  BarChart3,
  Eye,
  ShoppingCart,
  Zap,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Save,
  CreditCard,
  History,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_PRODUCTS, MOCK_BANNERS, MOCK_CATEGORIES, MOCK_SHORTCUTS, MOCK_USER, ADMIN_USER, MOCK_LOGS, MOCK_ORDERS } from './constants';
import { User, Product, Category, AppConfig, Log, Order } from './types';

// --- Context & State Management ---

interface AppContextType {
  user: User | null;
  login: (identifier: string, password: string) => boolean;
  logout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentPage: string;
  navigateTo: (page: string) => void;
  products: Product[];
  updateProducts: (products: Product[]) => void;
  categories: Category[];
  updateCategories: (cats: Category[]) => void;
  cart: Product[];
  addToCart: (product: Product) => void;
  config: AppConfig;
  updateConfig: (cfg: Partial<AppConfig>) => void;
  logs: Log[];
  orders: Order[];
  selectedProduct: Product | null;
  viewProduct: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

// --- Components ---

const Navbar: React.FC = () => {
  const { user, logout, navigateTo } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                  <div className="relative w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-white/10">
                    <span className="text-cyan-400 font-bold text-xl">X</span>
                  </div>
               </div>
               <span className="ml-3 font-bold text-xl tracking-tight text-white hidden sm:block">XDVZ <span className="text-cyan-500">STUDIO</span></span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', icon: Home, label: 'หน้าแรก' },
                { id: 'shop', icon: ShoppingBag, label: 'ร้านค้า' },
                { id: 'topup', icon: Wallet, label: 'เติมเงิน' },
                { id: 'minigame', icon: Gamepad2, label: 'มินิเกม' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <item.icon size={16} /> <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-cyan-500/50 transition-colors">
                <Search size={14} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาสินค้า..." 
                  className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-500 w-32 focus:w-48 transition-all"
                />
             </div>

            {user ? (
              <div className="relative group flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-white">{user.username}</p>
                    <p className="text-xs text-cyan-400">฿{user.balance.toFixed(2)}</p>
                 </div>
                 <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-cyan-500/50 cursor-pointer" />
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f172a] rounded-xl shadow-2xl py-2 hidden group-hover:block border border-white/10 animate-in fade-in slide-in-from-top-2">
                  {user.role === 'ADMIN' && (
                    <button onClick={() => navigateTo('admin')} className="w-full text-left px-4 py-2 hover:bg-white/5 text-gray-300 flex items-center text-sm">
                      <LayoutDashboard size={16} className="mr-2" /> จัดการระบบ
                    </button>
                  )}
                  <button onClick={() => navigateTo('profile')} className="w-full text-left px-4 py-2 hover:bg-white/5 text-gray-300 flex items-center text-sm">
                    <Settings size={16} className="mr-2" /> ตั้งค่าบัญชี
                  </button>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-white/5 text-red-400 flex items-center text-sm">
                    <LogOut size={16} className="mr-2" /> ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigateTo('login')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20 text-sm"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            )}

            <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-white/10 p-4 space-y-2">
           <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 mb-4">
                <Search size={16} className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="ค้นหาสินค้า..." 
                  className="bg-transparent border-none focus:ring-0 text-sm text-white w-full"
                />
           </div>
          {['home', 'shop', 'topup', 'minigame'].map(page => (
            <button key={page} onClick={() => {navigateTo(page); setIsMenuOpen(false)}} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 capitalize">
               {page}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[200px] md:h-[350px] overflow-hidden rounded-2xl shadow-2xl border border-white/5 group">
      {MOCK_BANNERS.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={banner.imageUrl} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
             <div className="animate-slide-up">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full mb-2 border border-cyan-500/20">RECOMMENDED</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">XDVZ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">STUDIO</span></h2>
                <p className="text-gray-400 text-sm md:text-base max-w-lg">บริการจำหน่ายไอดีเกมราคาถูก ปลอดภัย 100% ด้วยระบบอัตโนมัติ 24 ชั่วโมง</p>
             </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 right-8 flex space-x-2 z-10">
        <button className="p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500 transition-colors backdrop-blur-sm">
           <ChevronRight size={16} className="rotate-180" onClick={() => setCurrentIndex((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length)} />
        </button>
        <button className="p-2 rounded-full bg-black/50 text-white hover:bg-cyan-500 transition-colors backdrop-blur-sm">
           <ChevronRight size={16} onClick={() => setCurrentIndex((prev) => (prev + 1) % MOCK_BANNERS.length)} />
        </button>
      </div>
    </div>
  );
};

const StatsBar: React.FC = () => {
  // Using Mock Data but in a real app this would come from the context/api
  const stats = [
    { label: 'สมาชิกทั้งหมด', value: '1,203', icon: Users, color: 'text-blue-500' },
    { label: 'ยอดเข้าชมเว็บไซต์', value: '14,644', icon: Eye, color: 'text-green-500' },
    { label: 'พร้อมจำหน่าย', value: '32', icon: Box, color: 'text-purple-500' },
    { label: 'ยอดขายสินค้า', value: '79', icon: ShoppingCart, color: 'text-orange-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="relative overflow-hidden bg-[#0f172a] border border-white/5 rounded-2xl p-6 group hover:border-cyan-500/30 transition-all duration-300">
          <div className="relative z-10">
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
          <div className={`absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
            <stat.icon size={40} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ShortcutGrid: React.FC = () => {
  const { navigateTo } = useAppContext();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {MOCK_SHORTCUTS.map((sc) => (
        <div 
          key={sc.id} 
          onClick={() => navigateTo(sc.link)}
          className={`relative h-28 rounded-2xl overflow-hidden cursor-pointer group shadow-lg`}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${sc.color} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 shadow-inner border border-white/20">
                 {sc.icon === 'Wallet' && <Wallet className="text-white" />}
                 {sc.icon === 'Gamepad2' && <Gamepad2 className="text-white" />}
                 {sc.icon === 'ShoppingBag' && <ShoppingBag className="text-white" />}
                 {sc.icon === 'MessageCircle' && <MessageCircle className="text-white" />}
             </div>
             <span className="text-white font-bold text-lg drop-shadow-md">{sc.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { viewProduct, user } = useAppContext();
  
  if (!product.isVisible) return null;

  let displayPrice = product.price;
  if (product.isPromo && product.promoPrice) {
    displayPrice = product.promoPrice;
  } else if (user?.role === 'VIP' || user?.role === 'AGENT') {
     // Show agent price if available
     displayPrice = product.agentPrice || product.price * 0.9;
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 group hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 relative flex flex-col h-full">
      <div className="aspect-square overflow-hidden relative cursor-pointer" onClick={() => viewProduct(product)}>
         <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
         
         {/* Badges */}
         <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            {product.isPromo && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">SALE</span>}
            {product.isNew && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">NEW</span>}
            {product.isBestSeller && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">HOT</span>}
         </div>
         <div className="absolute top-2 right-2">
            <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">Stock: {product.stock}</span>
         </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
         <div className="flex-grow cursor-pointer" onClick={() => viewProduct(product)}>
            <h3 className="font-bold text-white text-lg line-clamp-1 mb-1">{product.name}</h3>
            <p className="text-xs text-gray-400 line-clamp-2 min-h-[2.5em]">{product.description}</p>
         </div>
         
         <div className="flex items-center justify-between mt-4">
             <div>
                {product.isPromo && <span className="text-xs text-gray-500 line-through block">฿{product.price}</span>}
                <span className="text-xl font-bold text-cyan-400">฿{displayPrice}</span>
             </div>
         </div>

         <button 
           onClick={() => viewProduct(product)}
           className={`w-full mt-3 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2
             ${product.stock > 0 
               ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20' 
               : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
         >
           {product.stock > 0 ? 'ดูรายละเอียด' : 'สินค้าหมด'}
         </button>
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { selectedProduct, user, navigateTo } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  let displayPrice = selectedProduct.price;
  if (selectedProduct.isPromo && selectedProduct.promoPrice) {
    displayPrice = selectedProduct.promoPrice;
  } else if (user?.role === 'VIP' || user?.role === 'AGENT') {
     displayPrice = selectedProduct.agentPrice || selectedProduct.price * 0.9;
  }

  const handleBuy = () => {
    if (!user) {
      navigateTo('login');
      return;
    }
    alert(`Buying ${quantity} items of ${selectedProduct.name} for ฿${displayPrice * quantity}`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => navigateTo('home')} className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors">
        <ChevronRight className="rotate-180 mr-1" size={20} /> กลับหน้าหลัก
      </button>

      <div className="bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="bg-[#020617] relative p-8 flex items-center justify-center min-h-[400px]">
             <img src={selectedProduct.image} className="w-full h-auto object-cover rounded-xl shadow-2xl border border-white/5" alt={selectedProduct.name} />
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProduct.name}</h1>
             <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-cyan-400">฿{displayPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-sm">/ ชิ้น</span>
             </div>

             <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
                <div className="flex items-center gap-2 mb-2 text-gray-300 font-bold text-sm">
                   <MessageCircle size={16} /> รายละเอียดสินค้า
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                   {selectedProduct.description}
                   <br/><br/>
                   Support 32bit, Pie 64 (Arm32) Version : Normal, Max ฟังชั่น - ESP & Chams - Aimbot Head - Enemy pull (Head, chest) - Up player - Teleport - No Clip - Vision Hack - Hyper Speed - Infinite Ammo - Rapid Fire
                </p>
             </div>

             <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-sm font-bold text-white">จำนวนที่ต้องการ</span>
                   <span className="text-xs text-cyan-400">เหลือในสต็อก {selectedProduct.stock} ชิ้น</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-500/30 transition-all"
                   >
                      <Minus size={20} />
                   </button>
                   <input 
                     type="number" 
                     value={quantity} 
                     readOnly
                     className="w-full h-12 bg-[#020617] border border-white/10 rounded-lg text-center text-white font-bold focus:outline-none" 
                   />
                   <button 
                     onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                     className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-500/30 transition-all"
                   >
                      <Plus size={20} />
                   </button>
                </div>
             </div>

             <button 
               onClick={handleBuy}
               className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.02]"
             >
                ซื้อสินค้า
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { products, updateProducts, orders } = useAppContext();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'settings'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Calculations for Dashboard ---
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalSales = orders.reduce((acc, o) => acc + o.amount, 0);
  const todaySales = orders
    .filter(o => new Date(o.timestamp).toDateString() === new Date().toDateString())
    .reduce((acc, o) => acc + o.amount, 0);

  // --- Handlers ---
  const toggleVisibility = (id: string) => {
    updateProducts(products.map(p => p.id === id ? { ...p, isVisible: !p.isVisible } : p));
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    }
  };

  const deleteProduct = (id: string) => {
    if (confirm('ยืนยันการลบสินค้า?')) {
      updateProducts(products.filter(p => p.id !== id));
    }
  };

  // Mock Graph Data based on orders (simplified)
  const graphData = [
    { name: '01 Feb', sales: 0 },
    { name: '02 Feb', sales: 40 },
    { name: '03 Feb', sales: 100 },
    { name: '04 Feb', sales: 50 },
    { name: '05 Feb', sales: 30 },
    { name: '06 Feb', sales: 50 },
    { name: '07 Feb', sales: todaySales }, // Today
  ];

  return (
    <div className="flex flex-col gap-6 min-h-[80vh]">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0f172a] p-6 rounded-2xl border border-white/5">
        <div>
           <h1 className="text-2xl font-bold text-white">Dashboard</h1>
           <p className="text-gray-400 text-sm">แผงควบคุมหลัก</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
           <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>หน้าแดชบอร์ด</button>
           <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>จัดการสินค้า</button>
           <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>ตั้งค่าทั่วไป</button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { label: 'จำนวนสมาชิกทั้งหมด', val: '466 คน', icon: Users, bg: 'bg-white/5' },
               { label: 'จำนวนสินค้าทั้งหมด', val: `${products.length} ชิ้น`, icon: Box, bg: 'bg-white/5' },
               { label: 'จำนวนสต็อกทั้งหมด', val: `${totalStock} ชิ้น`, icon: LayoutDashboard, bg: 'bg-white/5' },
               { label: 'ยอดขายวันนี้', val: `฿${todaySales.toFixed(2)}`, icon: CreditCard, bg: 'bg-white/5' },
               { label: 'ยอดเติมในวันนี้', val: '฿929.00', icon: Wallet, bg: 'bg-white/5' },
               { label: 'ยอดเติมทั้งหมด', val: '฿58,299.00', icon: History, bg: 'bg-white/5' },
               { label: 'เว็บไซตฺหมดอายุในอีก', val: '21 วัน', icon: Clock, bg: 'bg-white/5' },
               { label: 'ยอดขายทั้งหมด', val: `฿${totalSales.toFixed(2)}`, icon: ShoppingBag, bg: 'bg-white/5' },
             ].map((stat, i) => (
               <div key={i} className={`p-6 rounded-2xl border border-white/5 flex items-center justify-between ${stat.bg}`}>
                  <div>
                    <span className="bg-gray-700/50 text-gray-300 text-[10px] px-2 py-1 rounded-full">{stat.label}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{stat.val}</h3>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <stat.icon size={24} className="text-gray-300" />
                  </div>
               </div>
             ))}
          </div>

          {/* Graph */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
             <h3 className="font-bold mb-4 text-gray-800">เปรียบเทียบยอดขายได้ใน 7 วัน</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={graphData}>
                   <defs>
                     <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                   <Tooltip />
                   <Area type="monotone" dataKey="sales" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>
        </>
      )}

      {activeTab === 'products' && (
        <div className="bg-[#0f172a] rounded-2xl border border-white/5 overflow-hidden">
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white">รายการสินค้าทั้งหมด</h3>
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center">
                 <Plus size={16} className="mr-2" /> เพิ่มสินค้า
              </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-black/20 text-gray-400">
                 <tr>
                   <th className="px-6 py-3">ลำดับ</th>
                   <th className="px-6 py-3">ภาพ</th>
                   <th className="px-6 py-3">ชื่อสินค้า</th>
                   <th className="px-6 py-3">ราคา</th>
                   <th className="px-6 py-3">ราคาตัวแทน</th>
                   <th className="px-6 py-3">ลดราคา (%)</th>
                   <th className="px-6 py-3">ป้ายสินค้า</th>
                   <th className="px-6 py-3">สถานะ</th>
                   <th className="px-6 py-3">สต็อก</th>
                   <th className="px-6 py-3 text-right">จัดการ</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {products.map((p, idx) => (
                   <tr key={p.id} className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-4 text-gray-500">#{idx + 1}</td>
                     <td className="px-6 py-4">
                       <img src={p.image} className="w-10 h-10 rounded object-cover" alt="p" />
                     </td>
                     <td className="px-6 py-4 font-medium text-white max-w-[150px] truncate" title={p.name}>{p.name}</td>
                     <td className="px-6 py-4 text-cyan-400">฿{p.price}</td>
                     <td className="px-6 py-4 text-blue-400">฿{p.agentPrice || '-'}</td>
                     <td className="px-6 py-4 text-red-400">{p.discountPercent ? `${p.discountPercent}%` : '-'}</td>
                     <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {p.isNew && <span className="px-1.5 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded">New</span>}
                          {p.isBestSeller && <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-500 text-[10px] rounded">Hot</span>}
                          {p.isPromo && <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 text-[10px] rounded">Sale</span>}
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <button onClick={() => toggleVisibility(p.id)} className={`${p.isVisible ? 'text-green-500' : 'text-red-500'}`}>
                           {p.isVisible ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        </button>
                     </td>
                     <td className="px-6 py-4 text-gray-300">{p.stock}</td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={() => setEditingProduct(p)} className="p-2 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"><Edit size={16} /></button>
                           <button onClick={() => deleteProduct(p.id)} className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
           <div className="bg-[#0f172a] p-8 rounded-2xl w-full max-w-2xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Edit size={24} className="text-cyan-500" /> แก้ไขสินค้า</h2>
              <form onSubmit={saveProduct} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">ชื่อสินค้า</label>
                       <input 
                         type="text" 
                         value={editingProduct.name} 
                         onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">หมวดหมู่ ID</label>
                       <input 
                         type="text" 
                         value={editingProduct.category} 
                         onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">ราคาปกติ</label>
                       <input 
                         type="number" 
                         value={editingProduct.price} 
                         onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">ราคาตัวแทน</label>
                       <input 
                         type="number" 
                         value={editingProduct.agentPrice || ''} 
                         onChange={e => setEditingProduct({...editingProduct, agentPrice: Number(e.target.value)})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">สต็อก</label>
                       <input 
                         type="number" 
                         value={editingProduct.stock} 
                         onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                    <div>
                       <label className="block text-sm text-gray-400 mb-1">ส่วนลด %</label>
                       <input 
                         type="number" 
                         value={editingProduct.discountPercent || 0} 
                         onChange={e => setEditingProduct({...editingProduct, discountPercent: Number(e.target.value)})}
                         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm text-gray-400 mb-1">รายละเอียด</label>
                    <textarea 
                       value={editingProduct.description} 
                       onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                       className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none h-24"
                    />
                 </div>

                 <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
                       <input type="checkbox" checked={editingProduct.isNew || false} onChange={e => setEditingProduct({...editingProduct, isNew: e.target.checked})} className="rounded bg-black/50 border-white/10 text-cyan-500" />
                       New Badge
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
                       <input type="checkbox" checked={editingProduct.isBestSeller || false} onChange={e => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})} className="rounded bg-black/50 border-white/10 text-cyan-500" />
                       Best Seller
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer select-none">
                       <input type="checkbox" checked={editingProduct.isVisible} onChange={e => setEditingProduct({...editingProduct, isVisible: e.target.checked})} className="rounded bg-black/50 border-white/10 text-cyan-500" />
                       Visible
                    </label>
                 </div>

                 <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors">ยกเลิก</button>
                    <button type="submit" className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/20 font-bold flex items-center gap-2"><Save size={18} /> บันทึก</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

const TopupPage: React.FC = () => {
  const { user, navigateTo } = useAppContext();
  const [method, setMethod] = useState<'qr' | 'angpao'>('qr');

  if (!user) {
    return (
      <div className="text-center py-20">
         <h2 className="text-2xl font-bold text-white mb-4">กรุณาเข้าสู่ระบบก่อนใช้งาน</h2>
         <button onClick={() => navigateTo('login')} className="px-6 py-3 bg-cyan-600 rounded-lg text-white font-bold">เข้าสู่ระบบ</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">เติมเงินเข้าระบบ</h2>
          <p className="opacity-80">ระบบเติมเงินอัตโนมัติ 24 ชั่วโมง</p>
        </div>
        
        <div className="p-8">
           <div className="flex p-1 bg-black/40 rounded-xl mb-8 border border-white/5">
             <button 
                onClick={() => setMethod('qr')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${method === 'qr' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
             >
                QR Code
             </button>
             <button 
                onClick={() => setMethod('angpao')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${method === 'angpao' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
             >
                Truemoney Angpao
             </button>
           </div>

           {method === 'qr' ? (
             <div className="text-center space-y-6">
                <div className="w-64 h-64 bg-white mx-auto rounded-lg flex items-center justify-center border-4 border-white">
                   {/* QR Placeholder */}
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ExamplePayment`} alt="QR" />
                </div>
                <div className="text-sm text-gray-400">
                  <p>1. เปิดแอปธนาคารของท่าน</p>
                  <p>2. สแกน QR Code ด้านบน</p>
                  <p>3. เงินจะเข้ากระเป๋าทันที</p>
                </div>
             </div>
           ) : (
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold mb-2 text-white">ลิ้งก์ซองของขวัญ</label>
                   <input 
                      type="text" 
                      placeholder="https://gift.truemoney.com/campaign/..."
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all">
                  ยืนยันการเติมเงิน
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const MiniGamePage: React.FC = () => {
  const { user, navigateTo } = useAppContext();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="text-center py-20">
         <h2 className="text-2xl font-bold text-white mb-4">กรุณาเข้าสู่ระบบก่อนใช้งาน</h2>
         <button onClick={() => navigateTo('login')} className="px-6 py-3 bg-cyan-600 rounded-lg text-white font-bold">เข้าสู่ระบบ</button>
      </div>
    );
  }

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
       setSpinning(false);
       const rewards = ['เกลือ', '10 Points', '50 Credits', 'Jackpot!'];
       setResult(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
           Mini Games
        </h1>
        <p className="text-gray-400">ลุ้นรับรางวัลใหญ่กับกิจกรรมพิเศษ</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/5 flex flex-col items-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Wheel of Fortune</h3>
           <div className={`w-64 h-64 rounded-full border-8 border-purple-500/30 flex items-center justify-center relative transition-transform duration-[2000ms] ${spinning ? 'rotate-[720deg]' : ''}`}>
             <div className="absolute inset-0 rounded-full border-4 border-white/20 border-dashed animate-spin-slow"></div>
             <span className="font-bold text-xl text-purple-400">{spinning ? '...' : (result || 'SPIN')}</span>
           </div>
           <button 
             onClick={spinWheel}
             disabled={spinning}
             className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 relative z-10"
           >
             หมุนวงล้อ (10P)
           </button>
        </div>

        <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Mystery Box</h3>
           <Box size={120} className="text-blue-500 mb-6 animate-bounce relative z-10" />
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all relative z-10">
              เปิดกล่อง (50 Credits)
           </button>
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const { login } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    } else {
      setError('');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-[#0f172a] border border-white/5 p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
         {/* Background Effect */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full blur-[100px] opacity-20"></div>
         <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>

         <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold mb-2 text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-400 text-sm">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
               <label className="block text-sm font-medium mb-1 text-gray-400">อีเมล / ชื่อผู้ใช้ / เบอร์โทร</label>
               <input 
                 type="text" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:border-cyan-500 focus:outline-none transition-all"
                 placeholder="name@example.com หรือ admin"
               />
            </div>
            <div>
               <label className="block text-sm font-medium mb-1 text-gray-400">รหัสผ่าน</label>
               <input 
                 type="password" 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:border-cyan-500 focus:outline-none transition-all"
                 placeholder="••••••••"
               />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.02]">
               {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
            </button>
         </form>

         <div className="mt-6 flex items-center justify-between relative z-10">
            <hr className="w-full border-white/10" />
            <span className="px-2 text-gray-500 text-xs uppercase">Or</span>
            <hr className="w-full border-white/10" />
         </div>

         <div className="mt-6 relative z-10">
            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center">
              <Gamepad2 className="mr-2" size={20} /> Login with Discord
            </button>
         </div>

         <div className="mt-6 text-center text-sm relative z-10">
           <span className="text-gray-500">{isLogin ? 'ยังไม่มีบัญชี?' : 'มีบัญชีอยู่แล้ว?'}</span>
           <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 font-bold ml-1 hover:underline">
             {isLogin ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
           </button>
         </div>
         <p className="mt-4 text-xs text-gray-500 text-center relative z-10">
           สำหรับแอดมินใช้ชื่อผู้ใช้ <span className="text-cyan-400">admin</span> และรหัสผ่าน <span className="text-cyan-400">0895151168</span>
         </p>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { products, navigateTo } = useAppContext();

  // Helper to categorize products if needed, for now just showing lists
  const recommendedProducts = products.filter(p => p.isBestSeller || p.isPromo).slice(0, 4);
  const latestProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <BannerSlider />
      <StatsBar />
      <ShortcutGrid />

      {/* Recommended Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                 <div className="w-1.5 h-8 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                 สินค้าแนะนำ
              </h2>
              <p className="text-gray-400 text-sm mt-1 ml-4">รายการสินค้าขายดีและโปรโมชั่นพิเศษ</p>
           </div>
           <button onClick={() => navigateTo('shop')} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">ดูทั้งหมด &rarr;</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
           ))}
           {recommendedProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                 ไม่มีสินค้าแนะนำในขณะนี้
              </div>
           )}
        </div>
      </section>

      {/* Latest Products Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                 <div className="w-1.5 h-8 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                 สินค้ามาใหม่
              </h2>
              <p className="text-gray-400 text-sm mt-1 ml-4">อัพเดทล่าสุดประจำสัปดาห์</p>
           </div>
           <button onClick={() => navigateTo('shop')} className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">ดูทั้งหมด &rarr;</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
           ))}
           {latestProducts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                 ไม่มีสินค้ามาใหม่ในขณะนี้
              </div>
           )}
        </div>
      </section>
    </div>
  );
};

// --- Main Layout ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState('home');
  const [config, setConfig] = useState<AppConfig>({
    siteName: 'ZenithMart',
    primaryColor: '#0ea5e9',
    navbarColor: '',
    fontFamily: 'Prompt'
  });
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [cart, setCart] = useState<Product[]>([]);
  const [logs, setLogs] = useState<Log[]>(MOCK_LOGS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Force Dark Mode by default for this UI
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const login = (identifier: string, password: string) => {
    const trimmedIdentifier = identifier.trim();
    const isAdminIdentifier = trimmedIdentifier.toLowerCase() === 'admin' || trimmedIdentifier === '0895151168';
    const isAdminLogin = isAdminIdentifier && password === '0895151168';
    if (isAdminIdentifier && !isAdminLogin) {
      return false;
    }
    const displayName = trimmedIdentifier.includes('@')
      ? trimmedIdentifier.split('@')[0]
      : trimmedIdentifier || 'DemoUser';
    const newUser = isAdminLogin
      ? { ...ADMIN_USER }
      : { ...MOCK_USER, email: trimmedIdentifier, username: displayName };
    setUser(newUser);
    const newLog: Log = {
      id: Date.now().toString(),
      userId: newUser.id,
      action: 'Login',
      details: isAdminLogin ? 'Admin logged in successfully' : 'Logged in successfully',
      timestamp: new Date().toISOString(),
      type: 'AUTH'
    };
    setLogs([newLog, ...logs]);
    setCurrentPage('home');
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const toggleTheme = () => {
    // Locked to Dark for this design request
    setTheme('dark');
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product_detail');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'shop': return (
        <div className="space-y-6">
           <h2 className="text-3xl font-bold text-white mb-6">สินค้าทั้งหมด</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {products.map(p => <ProductCard key={p.id} product={p} />)}
           </div>
        </div>
      );
      case 'admin': return user?.role === 'ADMIN' ? <AdminPage /> : <HomePage />;
      case 'topup': return <TopupPage />;
      case 'minigame': return <MiniGamePage />;
      case 'login': return <LoginPage />;
      case 'product_detail': return <ProductDetailPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      theme, toggleTheme, 
      currentPage, navigateTo: setCurrentPage,
      products, updateProducts: setProducts,
      categories, updateCategories: setCategories,
      cart, addToCart,
      config, updateConfig: (newCfg) => setConfig({...config, ...newCfg}),
      logs,
      orders,
      selectedProduct,
      viewProduct
    }}>
      <div className={`min-h-screen flex flex-col font-${config.fontFamily} bg-[#020617] text-gray-100 selection:bg-cyan-500/30`}>
        {/* Background Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
          {renderPage()}
        </main>
        
        <footer className="bg-[#0f172a] border-t border-white/5 mt-12 relative z-10">
           <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
              <p>&copy; 2024 {config.siteName}. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                 <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
                 <a href="#" className="hover:text-cyan-400">Terms of Service</a>
              </div>
           </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
