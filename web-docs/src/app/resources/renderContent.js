import { social, newsletter, home, docs, work, person } from './content';
import { createI18nContent } from './content-i18n';
import { i18n } from './config';

const renderContent = (t) => {
    if (i18n) {
        return createI18nContent(t);
    } else {
        return {
            social, newsletter, home, docs, work, person
        }
    }
};

export { renderContent };