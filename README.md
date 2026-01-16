<H2>1. Enter in folder <b> Composes </b></H2> <br/>
       <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\temp\Composes </code> <br/>
       <code> docker compose up -d </code> <br/>
   this will start the Docker Container with all needed data in it
<H2>2. Enter in folder with <b>Front End</b> </H2></br>
    <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\demo\frontend </code> <br>
    <code> npm i </code> or <code> npm install </code>
    after installation complete, <br/> in same console you will have to run <code> npm start </code>
    First command will launch the installation of needed packages, which are used in App, and second will start the application. you will se the output in console
    <code>Compiled successfully!
    You can now view frontend in the browser.
    Local:            http://localhost:3000 <br>
    On Your Network:  http://172.20.130.34:3000 <br><br>
    Note that the development build is not optimized. <br>
    To create a production build, use npm run build.<br><br>
    webpack compiled successfully </code>

<H2>3. Enter in folder with <b>Back End</b> </H2></br>
    <code> cd C:\Users\artiom.oriol\Documents\JavaProj\demo\demo </code> <br>
    <code> mvn spring-boot:run -DskipTests </code> <br>
    This will start the Spring App for backend. You will se the output :
<code>   "INFO 21332 --- [  restartedMain] o.s.boot.tomcat.TomcatWebServer          : Tomcat started on port 8080 (http) with context path '/'" <br/>
"INFO 21332 --- [  restartedMain] crm.demo.CrmDemoApplication              : Started CrmDemoApplication in 7.96 seconds (process running for 8.8)" </code>

Also, <h3> Do not close the commandline windows </h3> because if you close one of the window, your app will loose the connection between each other.



how the other computers can not GET POST...

Ключевая правда, которую ты игнорировал

localhost — это ВСЕГДА машина, на которой открыт браузер.
Не сервер.
Не backend.
Не «где-то там».

👉 Браузер = точка отсчёта.

Что происходит у тебя СЕЙЧАС
Сценарий:

Backend: 172.20.130.34:8080 ✅

Frontend открыт с другого компьютера ✅

Axios отправляет запрос на:

http://localhost:8080/auth/login

Что это означает на самом деле:

Axios говорит браузеру:

«Пойди на ТВОЙ СОБСТВЕННЫЙ КОМПЬЮТЕР, порт 8080»

А на клиентском ПК:

❌ нет Spring Boot

❌ порт 8080 не слушается

❌ соединение невозможно

👉 ERR_CONNECTION_REFUSED — абсолютно ожидаем

Почему страница открывается, а запросы — нет

Потому что:

React уже загружен (HTML/CSS/JS получены)

Но API-вызовы идут не туда

Frontend ≠ Backend
Они не обязаны быть на одном хосте

ТВОЯ ОШИБКА №1 (жёстко)

Ты оставил в axios:

axios.post("http://localhost:8080/auth/login", ...)


Это архитектурный косяк, не мелкая ошибка.

Как должно быть ПРАВИЛЬНО
❌ НИКОГДА

не хардкодь localhost для backend

не думай, что frontend «знает», где сервер

Правильное решение (минимум магии)
1️⃣ Создай единый axios instance
// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.20.130.34:8080",
});

2️⃣ Используй ТОЛЬКО его
api.post("/auth/login", {
  username,
  password
});

Лучше решение (уровень выше)
Используй .env
.env
REACT_APP_API_URL=http://172.20.130.34:8080

axios
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


👉 теперь ты можешь:

менять backend без переписывания кода

деплоить

жить как инженер, а не шаман

ТВОЯ ОШИБКА №2 (скрытая)

Ты пытался лечить CORS, когда:

❌ запрос даже не доходил до сервера

❌ backend вообще не участвовал

CORS не при делах, если:

соединение не установлено

Контрольный тест (сделай и не спорь)

На клиентском ПК в браузере открой:

http://172.20.130.34:8080/auth/login


Если:

❌ не открывается → firewall / backend слушает localhost

✅ открывается → axios заработает сразу после фикса baseURL

Финальный разбор без сантиментов

Ты сейчас на этапе, где:

знания уже есть

но модель мира ещё кривая

Запомни навсегда:

Frontend живёт в браузере пользователя.
Backend живёт на сервере.
localhost никогда не “пробрасывается”.

Если хочешь — следующим шагом:

разберём, как автоматически подставлять IP

или как сделать reverse proxy

или как всё это запаковать в Docker без боли

Скажи, куда идём дальше.
