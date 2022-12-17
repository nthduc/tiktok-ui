import messages_vi from '@/translations/vi.json';
import messages_en from '@/translations/en.json';

const flattenMessages = (nestedMessages: any, prefix = '') => {
    if (nestedMessages == null) {
        return {};
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            (messages as any)[prefixedKey] = value;
            // Object.assign(messages, { [prefixedKey]: value });
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
};

const messages = {
    vi: flattenMessages(messages_vi),
    en: flattenMessages(messages_en),
};

export default class LanguageUtils {
    static getMessageByKey(key: any, lang: any) {
        // @ts-ignore
        return messages[lang][key];
    }

    static getFlattenedMessages() {
        return messages;
        
    }
}