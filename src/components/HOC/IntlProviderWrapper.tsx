import React from 'react';
import { IntlProvider } from 'react-intl';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/vi';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

import LanguageUtils from '@/utils/LanguageUtils';
import { useStore } from '@/hooks';

interface Props extends React.PropsWithChildren<unknown> {}

const IntlProviderWrapper = ({ children }: Props) => {
    const messages = LanguageUtils.getFlattenedMessages();
    const [state, dispatch] = useStore();
    
    return (
        <IntlProvider 
            locale={state.language}
            // @ts-ignore 
            messages={messages[state.language]} 
            defaultLocale="vi"
            onError={(err) => {
                if(err.code === "MISSING_TRANSLATION"){
                    console.error("Không thể Load Ngôn Ngữ -> Liên hệ Nguyễn Đức", err.message);   
                }
            }}
            >
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;
