
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

function App(): JSX.Element {

    useEffect(() => {
        console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
        console.log('%c Copyright (C) 2020-2022 Nguyễn Thái Đức rights reserved.', 'color: gray; font-size: 8px; font-weight: bold;');
    },[])

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        
                        return (
                            // <>
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            // </>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
