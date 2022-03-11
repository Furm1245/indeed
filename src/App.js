import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './components/StartingPage/StartingPageContent';
import AuthPage from './pages/AuthPage';
import DetailPage from './pages/DetailPage';
import NewJobPage from './pages/NewJobPage';
import EditPage from './pages/EditPage';
import Footer from './components/Wrapper/footer';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';



function App() {
  const { token, login, logout, userId } = useAuth();


  let routes;
  if (token) {
    routes = (
      <Wrapper>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/new" element={<NewJobPage />} />
          <Route path="/details/edit/:id" element={<EditPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Wrapper>

    );
  } else {
    routes = (
      <Wrapper>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/details/edit/:id" element={<EditPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/:id" element={<HomePage />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Wrapper>
    );
  }



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
      <BrowserRouter>
        <Fragment>
          {routes}
        </Fragment>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
