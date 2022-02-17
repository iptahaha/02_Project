import i18next from 'i18next';
import locI18next from 'loc-i18next';
import englishFile from '../locales/en.json';
import russianFile from '../locales/ru.json';

i18next
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: englishFile,
      },
      ru: {
        translation: russianFile,
      },
    },
  })
  .then(() => {
    updateContent();
  });

export function updateContent() {
  const localize = locI18next.init(i18next, {
    optionsAttr: 'data-i18n-options',
    useOptionsAttr: true,
  });
  localize('html');
}

export function changeLng(evt) {
  const selectedLang = evt ? evt.target.value : 'en';
  i18next.changeLanguage(selectedLang).then(() => {
    updateContent();
    localStorage.setItem('changeLanguage', evt.target.value);
    checkLocalStorageLangValue('changeLanguage');
  });
}

export function checkLocalStorageLangValue(value) {
  const storageElement = localStorage.getItem(`${value}`);
  const selectElement = document.getElementById(`${value}`) as HTMLSelectElement;

  if (storageElement && selectElement.value !== storageElement) {
    selectElement.value = storageElement;
    i18next.changeLanguage(storageElement).then(() => {
      updateContent();
    });
    return true;
  }
}
