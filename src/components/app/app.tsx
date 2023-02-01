import { useEffect} from 'react';
import Header from '../header/header';
import styles from './app.module.css'
import { getAllIngredients } from '../../services/actions/all-ingredients-action';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Register } from '../../pages/register/register';
import { Constructor } from '../../pages/constructor/constructor';
import { ForgotPass } from '../../pages/forgot-pass/forgot-pass';
import { loginUpdate } from '../../services/actions/update-login-action';
import { getCookie } from '../../util/functions';
import { Profile } from '../../pages/profile/Profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ResetPass } from '../../pages/reset-pass/reset-pass';
import { ProfileChange } from '../profile-change/profile-change';
import { ModalView } from '../modal-view/modal-view';
import { PageView } from '../page-view/page-view';
import { Feed } from '../../pages/feed/feed';
import { OrderPage } from '../../pages/order-page/order-page';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';
import { useAppDispatch } from '../..';
import { LoginPage } from '../../pages/login/Login';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllIngredients());
    if(getCookie('refreshToken')) {
      dispatch(loginUpdate(getCookie('refreshToken')))
    }
  }, [])
  console.log(document.cookie);
  
  
  
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
            <Route path='/ingredients/:id'  element={<ModalView id={'1'} />}/>
            <Route path='/profile/orders/:id' element={<OrderPage modal={true} place={true} />} />
            <Route path='/feed/:id' element={<OrderPage modal={true} />} />
          </Routes>
        )}
    </div>
  );
}

export default App;