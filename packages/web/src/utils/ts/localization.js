"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLng = exports.updateContent = void 0;
const i18next_1 = __importDefault(require("i18next"));
const loc_i18next_1 = __importDefault(require("loc-i18next"));
const en_json_1 = __importDefault(require("../locales/en.json"));
const ru_json_1 = __importDefault(require("../locales/ru.json"));
i18next_1.default
    .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
        en: {
            translation: en_json_1.default,
        },
        ru: {
            translation: ru_json_1.default,
        },
    },
})
    .then(() => {
    updateContent();
});
function updateContent() {
    const localize = loc_i18next_1.default.init(i18next_1.default, {
        optionsAttr: 'data-i18n-options',
        useOptionsAttr: true,
    });
    localize('html');
}
exports.updateContent = updateContent;
function changeLng(evt) {
    const selectedLang = evt ? evt.target.value : 'en';
    i18next_1.default.changeLanguage(selectedLang).then(() => {
        updateContent();
    });
}
exports.changeLng = changeLng;
//# sourceMappingURL=localization.js.map