import Main from '../pages/main/index.jsx';
import LoginPage from '../pages/login/index.jsx';
import RegisterPage from '../pages/register/index.jsx';
import SignUpPage from '../pages/signup/index.jsx';
import PlaceListPage from '../pages/scchelin/PlaceList.jsx';
import PlaceDetailPage from '../pages/scchelin/PlaceDetail.jsx';

const MainScreens = {
    LoginPage: {
        path: '/',
        element: <LoginPage />,
    },
    Main: {
        path: '/main',
        element: <Main />,
    },
    SignUpPage: {
        path: '/signup',
        element: <SignUpPage />,
    },
    RegisterPage: {
        path: '/register',
        element: <RegisterPage />,
    },
    PlaceListPage: {
        path: '/placelist',
        element: <PlaceListPage />,
    },
    PlaceDetailPage: {
        path: '/place/:placeId',
        element: <PlaceDetailPage />,
    },
};

export const AppRouteDef = {
    ...MainScreens,
};