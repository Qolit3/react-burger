import { useEffect} from 'react';
import Header from '../header/header';
import styles from './app.module.css'
import { useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/actions/allIngredientsAction';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getAllIngredients());
    if(getCookie('refreshToken')) {
      dispatch(loginUpdate(getCookie('refreshToken')))
    }
  }, []) 
  
  
  const background = location.state?.background
  
  console.log(location);
  console.log(background);
  return (
    <div className={styles.app}>      
      <Header />
        <Routes location={background || location}>
          <Route path='/'  element={<Constructor />} />
          <Route path='/ingredients/:id'  element={<PageView />} />
          <Route element={<ProtectedRoute path='/' isAuth={false}/>}>
            <Route path='/login'  element={<LoginPage/>} />
            <Route path='/register'  element={<Register/>} />
            <Route path='/forgot-password'  element={<ForgotPass/>}/>
            <Route path='/reset-password'  element={<ResetPass/>}/>
          </Route>          
          <Route element={<ProtectedRoute path='/login' isAuth={true}/>}>
            <Route path='/profile'  element={<Profile />}>
              <Route path='/profile'  element={<ProfileChange/>} />
              <Route path='/profile/orders'  element={<div/>} />
            </Route>
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path='/ingredients/:id'  element={<ModalView id={1} />}/>
          </Routes>
        )}
    </div>
  );
}

export default App;