import i18next from 'i18next';
import locI18next from 'loc-i18next';
import englishFile from '../locales/en.json';
import russianFile from '../locales/ru.json';
import ukrFile from '../locales/ua.json';
import chineseFile from '../locales/ch.json';
import {getElement} from "./utils";

i18next
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: ['en', 'ua', 'ch'],
    debug: false,
    resources: {
      en: {
        translation: englishFile,
      },
      ru: {
        translation: russianFile,
      },
      ua: {
        translation: ukrFile,
      },
      ch: {
        translation: chineseFile,
      },
    },
  })
  .then(() => {
    updateContent();
  });

export function updateContent(): void {
  const localize = locI18next.init(i18next, {
    optionsAttr: 'data-i18n-options',
    useOptionsAttr: true,
  });
  localize('html');
}

export function changeLng(): void {
  const evt = event;
  const target = <HTMLSelectElement>event.target;
  const selectedLang = evt ? target.value : 'en';
  i18next.changeLanguage(selectedLang).then(() => {
    updateContent();
    localStorage.setItem('changeLanguage', target.value);
    checkLocalStorageLangValue('changeLanguage');
  });
}

export function checkLocalStorageLangValue(value: string): boolean {
  const storageElement = localStorage.getItem(`${value}`);
  const selectElement = getElement(`${value}`) as HTMLSelectElement;

  if (storageElement && selectElement.value !== storageElement) {
    selectElement.value = storageElement;
    i18next.changeLanguage(storageElement).then(() => {
      updateContent();
    });
    return true;
  }
  return false;
}
