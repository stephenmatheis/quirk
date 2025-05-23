import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/header';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';
import '@/styles/app.scss';
import '@fontsource-variable/nunito';

function App() {
    const Router = BrowserRouter;

    return (
        <Router>
            <Header />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
