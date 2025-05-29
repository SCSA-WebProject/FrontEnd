import Main from '../pages/main/index.jsx';
import LoginPage from '../pages/login/index.jsx';
import RegisterPage from '../pages/register/index.jsx';
import SignUpPage from '../pages/signup/index.jsx';
import PlaceListPage from '../pages/scchelin/PlaceList.jsx';
import PlaceDetailPage from '../pages/scchelin/PlaceDetail.jsx';
import PlaceMapPage from '../pages/scchelin/PlaceMap.jsx';
import MyPage from '../pages/mypage/index.jsx';

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
        path: '/place/:id',
        element: <PlaceDetailPage />,
    },
    PlaceMapPage: {
        path: '/placemap',
        element: <PlaceMapPage />,
    },
    MyPage: {
        path: '/mypage',
        element: <MyPage />,
    }
};

export const AppRouteDef = {
    ...MainScreens,
};