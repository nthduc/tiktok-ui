import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import { StoreProvider } from '@/store';
import IntlProviderWrapper from '@/components/HOC';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyles>
            <StoreProvider>
                <IntlProviderWrapper>
                    <App />
                </IntlProviderWrapper>
            </StoreProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
