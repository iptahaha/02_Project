# Project_2 via CRUD

- Data: Persons (class Person). Class Person, fields: id, fname, lname, age, city, phoneNumber, email, companyName.
- Databases:
1. SQL (PostgreSQL, H2, MySQL)
2. NoSQL (MongoDB, Redis, Cassandra, GraphDB)

##Start project
-Для страрта пропишите в терминале следущие команды:
1. yarn install
2. yarn build
3. yarn start

## Pages
- Main page:
1. Дропдаун выбора базы данных, по умолчанию - MySQL;
2. Поисковая строка для поиска необходимой записи по fname;
3. Поисковая строка для поиска необходимой записи по lname;
4. Дропдаун для выбора сортировки данных по каждому полю;
5. Контрольная панель с кнопками: Create, Update, Delete, ClearAll;
6. Панель ввода данных (label + input, где label - имя поля персоны);
7. Дропдаун с локализацией (en, ru), по умолчанию en;
8. Дропдаун со сменой темы (light, black), по умолчанию light;
9. Кнопка logout -> переход на страницу авторизации;
10. Кнопка settings -> настройки пользователя: можно изменить свой логин и/или пароль.
- Auth page:
1. Форма с логином и паролем + кнопка Login, а также ссылка на форму регистрации SignUp;
- Reg page:
1. Форма с логином, паролем, подтверждением пароля. Логин уникален. Все поля обязательны для ввода.

## Main requirements
- [x] Учесть валидацию полей как на фронте так и на бекенде, (как конкретно валидировать - включить здравый смысл и решить на уровне команды).
- [x] Серверная часть пишется в стиле ООП.
- [x] Обязательное наличие юнит тестов на проекте (бизнесс логика).
- [x] Применить фреймворк Express.js на бекенде.
- [x] Применить ES6 при написании логики в приложении.
- [x] Применить Webpack для сборки проекта.
- [x] Хостинг на сервере Amazone или GoogleCloud или где-нибудь ещё на ваше усмотрение (можно использовать heroku).
- [x] UI доработать на усмотрение команды. Мокапы согласовать

### Students of DevEducation, Kharkiv.
Demo of the project you could find here [https://frogers-db.herokuapp.com/login]
