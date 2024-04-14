import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';


import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/Admin/AdminLayout';



const NotFound = lazy(() => import('./pages/notfound'));

const Home = lazy(() => import('./pages/shop/home'));
const Search = lazy(() => import('./pages/shop/search'));
const Cart = lazy(() => import('./pages/shop/cart'));
const Shipping = lazy(() => import('./pages/shop/shipping'));
const Orders = lazy(() => import('./pages/shop/orders'));
const OrderDetail = lazy(() => import('./pages/shop/order_detail'));
const Checkout = lazy(() => import('./pages/shop/checkout'));


const Dashboard = lazy(() => import('./pages/admin/main/dashboard'));
const Customer = lazy(() => import('./pages/admin/main/customer/customer'));
const Product = lazy(() => import('./pages/admin/main/product/product'));
const Transaction = lazy(() => import('./pages/admin/main/transaction/transaction'));

const Bar = lazy(() => import('./pages/admin/Chart/barCharts'));
const Pie = lazy(() => import('./pages/admin/Chart/pieCharts'));
const Line = lazy(() => import('./pages/admin/Chart/lineCharts'));

const Stopwatch = lazy(() => import('./pages/admin/Apps/stopwatch'));
const Coupon = lazy(() => import('./pages/admin/Apps/coupon'));
const Toss = lazy(() => import('./pages/admin/Apps/toss'));


const NewProduct = lazy(() => import('./pages/admin/main/product/newProduct'));
const ManageProduct = lazy(() => import('./pages/admin/main/product/manageProduct'));
const ManageTransaction = lazy(() => import('./pages/admin/main/transaction/manageTransaction'));


import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser, logoutUser } from './redux/reducer/user-slice';
import { getSingleUser } from './redux/api/userApi';
import toast from 'react-hot-toast';
import Loader from './components/ui/Loader';
import { RootState } from './redux/store';






const App = () => {

  const dispatch = useDispatch();

  const { loading: userLoaidng, user } = useSelector((state: RootState) => state.userSlice);
  const {cartItems} = useSelector((state: RootState) => state.cartSlice);

  useEffect(() => {
    const auth = getAuth();


    onAuthStateChanged(auth, async (firebaseUser) => {

      if (!firebaseUser) {
        dispatch(logoutUser());
        return;
      }

      try {
        const data = await getSingleUser(firebaseUser?.uid);

        if ('error' in data) throw new Error('User not found');
        const { status, data: { user: mongoUser } } = data;

        if (status !== 'success') throw new Error('User not found');

        dispatch(loginUser(mongoUser));
      }
      catch (err) {
        dispatch(logoutUser());
        toast.error('User not found in mongodb, Please clear cache and try again');
      }
    })

  }, [dispatch])


  const isLoggedIn = user ? true : false;
  const adminOnly = isLoggedIn && user?.role === 'admin';
  const isCartEmpty = cartItems.length === 0;


  if (userLoaidng)
    return <div className='h-screen w-screen title grid place-items-center'>Loading user...</div>;

  return (
    <Routes>

      <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to='/'  />} />
      <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/' />} />


      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={!isCartEmpty ? <Shipping /> : <Navigate to='/cart' />} />
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to='/login' />} />
        <Route path="/order/:orderId" element={isLoggedIn ? <OrderDetail /> : <Navigate to='/login' />} />
        <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to='/login' />} />
      </Route>


      <Route element={<AdminLayout />}>

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={adminOnly ? <Dashboard /> : <Navigate to='/' />} />
        <Route path="/admin/product" element={adminOnly ? <Product /> : <Navigate to='/' />} />
        <Route path="/admin/transaction" element={adminOnly ? <Transaction /> : <Navigate to='/' />} />
        <Route path="/admin/customer" element={adminOnly ? <Customer /> : <Navigate to='/' />} />


        {/* Charts */}
        <Route path="/admin/chart/bar" element={adminOnly ? <Bar /> : <Navigate to='/' />} />
        <Route path="/admin/chart/pie" element={adminOnly ? <Pie /> : <Navigate to='/' />} />
        <Route path="/admin/chart/line" element={adminOnly ? <Line /> : <Navigate to='/' />} />

        {/* Apps */}
        <Route path="/admin/app/stopwatch" element={adminOnly ? <Stopwatch /> : <Navigate to='/' />} />
        <Route path="/admin/app/coupon" element={adminOnly ? <Coupon /> : <Navigate to='/' />} />
        <Route path="/admin/app/toss" element={adminOnly ? <Toss /> : <Navigate to='/' />} />

        {/* Management */}
        <Route path="/admin/product/new" element={adminOnly ? <NewProduct /> : <Navigate to='/' />} />
        <Route path="/admin/product/:productId" element={adminOnly ? <ManageProduct /> : <Navigate to='/' />} />
        <Route path="/admin/transaction/:orderId" element={adminOnly ? <ManageTransaction /> : <Navigate to='/' />} />

        
      </Route>
      <Route path="*" element={<Suspense fallback={<Loader />}><NotFound /></Suspense>} />
    </Routes>
  )
}



export default App