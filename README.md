### Проектная работа "Бургерная"

В проектной работе реализуется сайт для создания заказов в бургерной, просмотра своих и общих прошлых заказов.

Стек технологий: React, Redux, TypeScript, WebSocket, DnD.
TS и React составляют основу приложения, Redux используется для хранения данных о заказе, ингредиентах, статусах подключения WS и состоянии авторизации пользователя. WS используется в реализации лент заказов, для обновления их в реальном времени. DnD используется для создания бургера.

### Структура

Сайт состоит из нескольких основных страниц: сборка заказа, регистрация и логин, профиль и общая лента заказов.

![Страница сборки заказа](README_static/constructor.PNG)

Страница сборки заказа

![Страница логина](README_static/login.PNG)

Страница логина

![Страница общей ленты заказов](README_static/feed.PNG)

Страница общей ленты заказов

На всех страницах есть общая шапка, с навигацией между профилем, сборкой и лентой заказов

### Страница сборка заказа

Страница сборки заказа состоит из двух частей: доступных ингредиентов слева и собираемого заказа справа.

Ингредиенты поделены на 3 группа: булки, соусы и начинки. Фичи и функционал, связаный с ингредиентами:
- Чтобы добавить ингредиент к заказу необходимо "перетянуть его" в правую часть.
- Чтобы удалить нужно нажать на иконку мусорного ведра справа от ингредиента в заказе.
- При клике по ингредиенту открывается окно с подробной информацией о нём.
- При добавлении ингредиента на его карточке слева появляется цифра, которая показывает количество порций ингридиента в заказе.
- Для булочек есть несколько ограничений: можно добавить только один тип булочки, их всегда добавляется две и они занимают крайние верхнюю и нижнюю позицию в заказе. Если добавить другую булочку в заказ, то она просто заменить старую. Ингредиент в заказе можно менять местами.

Для оформления заказа нужно нажать на кнопку "Оформить заказ". Появится окно с загрузкой и отправится запрос на сервер с информацией о заказе. При успешном ответе в этом же окне появится номер заказа и его информация.

![Окно информации ингредиента](README_static/ingredient.PNG)

Окно информации ингредиента

![Страница сборки с заказом](README_static/constructor-with-order.PNG)

Страница сборки с заказом

![Окно после офрмления заказа](README_static/created-order.PNG)

### Страницы логина, регистрации и восстановления пароля

Для регистрации нужны имя (тип: строка, без ограничений по длине), email (тип: email, уникальный),  пароль (тип: строка, без ограничений).

![Страница регистрации](README_static/registration.PNG)

Страница регистрации

Для логина нужны email и пароль. При регистрации и логине в куки выдается токена: один для проверки авторизации при переходе на страницу профиля и совершении заказа (сохраняется в куки), второй для обновления первого (сохраняется в хранилище redux). Первой токен имеет срок годности 20 минут, с невалидным токеном не получится совершить заказ и перейти на страницу профиля. В таком случае будет редирект на страницу лоигна. К тому же, при валидном токене нельзя зайти на страницы регистрации, логина и восстановления пароля, потому что пользователь уже очевидно авторизован.

![Страница логина](README_static/login.PNG)

Страница логина

Для восстановления пароля нужен email.

![Страница восстановления пароля](README_static/pass.PNG)

Страница восстановления пароля


### Страницы ленты заказов

Есть две ленты заказов: общая для всех пользователей и личная. Они реализованы с помощью WS, поэтому обновляются в реальном времени. 

![Страница общей ленты](README_static/feed.PNG)

Страница общей ленты

![Страница личной ленты](README_static/profile-feed.PNG)

Страница личной ленты

При клике по заказу появляется подробная информация о заказе.

![Окно информации о заказе](README_static/order.PNG)

### Страница профиля

Страница прфиля делится на две части: справа информация, слева кнопки смены информации и выхода из профиля. В блоке информации может быть страница с личными данными (именем, email и паролем) и страница с лентов личных заказов. Личные данные можно поменять после нажатия на иконку карандаша справа от данных. При вводе новой информации в инпуты появится кнопка "Подтвердить".

![Страница с личными данными](README_static/profile.PNG)

Страница с личными данными

![Страница с личной лентой](README_static/profile-feed.PNG)

Страница с личной лентой
