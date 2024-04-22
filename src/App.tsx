import { Routes, Route} from 'react-router-dom';
import { lazy, Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { saveUser, deleteUser, saveToken } from './redux/reducer/user-slice';
import { getSingleUser } from './redux/api/userApi';
import Loader from './components/ui/Loader';
import { RootState } from './redux/store';


import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/Admin/AdminLayout';
import RequireAuth from './components/RequireAuth';
import toast from 'react-hot-toast';
import { TAccessToken } from './Types/apiTypes';

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








const App = () => {

  const dispatch = useDispatch();

  const { loading: userLoaidng, token} = useSelector((state: RootState) => state.userSlice);




  const fetchSaveSingleUser = useCallback(async (token: TAccessToken) => {
    try{
      const data = await getSingleUser(token?.userId, token?.access_token);

      if('error' in data) throw new Error('User not found');
      const {status, data: {user: mongoUser}} = data;

      if(status !== 'success'){
        throw new Error('User not found');
      }
      dispatch(saveToken(token));
      dispatch(saveUser(mongoUser));
    }
    catch(err){
      if((err as Error).message === 'Unauthorized'){
        //_ Redirect to unauthroized page 
        toast.error((err as Error).message);
      }
      dispatch(deleteUser());
    }
  },[dispatch]);




  useEffect(() => {
    const local = localStorage.getItem('user');
    const token = local ? JSON.parse(local) : null;

    if (!token) {
      dispatch(deleteUser());
      return;
    }

    fetchSaveSingleUser(token);

  }, [dispatch, fetchSaveSingleUser])



  useEffect(() => {
    if (!token) {
      return;
    }

    const expiry = token.expiry;
    const remainingTime = new Date(expiry).getTime() - new Date().getTime();


    const logoutTimer = setTimeout(() => {
      localStorage.removeItem('user');
      dispatch(deleteUser());
    }, remainingTime); 

    return () => clearTimeout(logoutTimer);
  }, [dispatch, token]);





  if (userLoaidng)
    return <div className='h-screen w-screen title grid place-items-center'>Loading user...</div>;

  return (
    <Routes>

      {/* <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to='/'  />} /> */}
      {/* <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/' />} /> */}
      <Route path="/login" element={<Login /> } />
      <Route path="/signup" element={ <Signup /> } />


      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        
        <Route element={<RequireAuth />} >
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={ <Shipping />  } />
          <Route path="/orders" element={<Orders /> } />
          <Route path="/order/:orderId" element={ <OrderDetail />} />
          <Route path="/checkout" element={ <Checkout /> } />
        </Route>
      </Route>


      <Route element={<AdminLayout />}>

        <Route element={<RequireAuth />} >
          {/* Admin Pages */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/customer" element={<Customer />} />


          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Bar />} />
          <Route path="/admin/chart/pie" element={<Pie />} />
          <Route path="/admin/chart/line" element={<Line />} />

          {/* Apps */}
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/toss" element={<Toss />} />

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:productId" element={<ManageProduct />} />
          <Route path="/admin/transaction/:orderId" element={<ManageTransaction />} />

        </Route>
        
      </Route>
      <Route path="*" element={<Suspense fallback={<Loader />}><NotFound /></Suspense>} />
    </Routes>
  )
}



export default App