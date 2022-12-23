import { useEffect} from 'react';
import Header from '../header/header';
import styles from './app.module.css'
import { useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/actions/allIngredientsAction';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login/Login.jsx'
import { Register } from '../../pages/register/register';
import { Constructor } from '../../pages/constructor/constructor';
import { ForgotPass } from '../../pages/forgotPass/forgotPass';
import { loginUpdate } from '../../services/actions/updateLoginAction';
import { getCookie } from '../../util/functions';
import { Profile } from '../../pages/profile/Profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ResetPass } from '../../pages/resetPass/resetPass';
import { ProfileChange } from '../profile-change/profile-change';
import { ModalView } from '../modal-view/modal-view';
import { PageView } from '../page-view/page-view';
import { Feed } from '../../pages/feed/feed';
import { OrderPage } from '../../pages/orderPage/orderPage';
import { ProfileOrders } from '../../pages/profileOrders/profileOrders';
import { FEED_CONNECT, FEED_DISCONNECT } from '../../services/actions/feedActions';
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from '../../services/actions/ordersActions';

function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getAllIngredients());
    if(getCookie('refreshToken')) {
      dispatch(loginUpdate(getCookie('refreshToken')))
    }
  }, [])
  
  useEffect(() => {
    dispatch({type: FEED_CONNECT})
    dispatch({ type: ORDERS_CONNECT })
    return () => {
      dispatch({type: FEED_DISCONNECT})
      dispatch({type: ORDERS_DISCONNECT})
    }
  }, [])
  
  const background = location.state?.background
  
  return (
    <div className={styles.app}>      
      <Header />
        <Routes location={background || location}>
          <Route path='/'  element={<Constructor />} />
          <Route path='/ingredients/:id'  element={<PageView />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:id' element={<OrderPage /> } />
          <Route element={<ProtectedRoute path='/' isAuth={false}/>}>
            <Route path='/login'  element={<LoginPage/>} />
            <Route path='/register'  element={<Register/>} />
            <Route path='/forgot-password'  element={<ForgotPass/>}/>
            <Route path='/reset-password'  element={<ResetPass/>}/>
          </Route>          
          <Route element={<ProtectedRoute path='/login' isAuth={true}/>}>
            <Route path='/profile'  element={<Profile />}>
              <Route path='/profile'  element={<ProfileChange/>} />
              <Route path='/profile/orders'  element={<ProfileOrders/>} />
            </Route>
            <Route path='/profile/orders/:id' element={<OrderPage place={true} />} />
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path='/ingredients/:id'  element={<ModalView id={1} />}/>
            <Route path='/feed/:id' element={<OrderPage modal={true} />} />
            <Route element={<ProtectedRoute path='/login' isAuth={true}/>}>
              <Route path='/profile/orders/:id' element={<OrderPage modal={true} place={true} />} />
            </Route>
          </Routes>
        )}
    </div>
  );
}

export default App;