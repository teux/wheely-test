wheely-test
===========

Сборка и запуск

Требуется предустановленные `node` и `grunt`. Затем:

```
github clone git@github.com:teux/wheely-test.git
cd wheely-test
npm install
grunt build
node server
```

После сборки открыть http://localhost:3000.

Применяемые технологии:
  * express - фреймворк на node 
    * locomotive - серверный mvc
    * csurf - защита от CSRF
    * request - для проксирования запросов
    * express-bh - использования шаблонизатора bh в express
  * bem - методология построения приложений из блоков, от Yandex
  * bemjson - декларативные шаблоны на json (эксперимент bemjson->handlebars)
  * bh - шаблонизатор bemjson -> HTML, от Yandex
  * ember-template-compiler - копиляция шаблонов Handlebars на сервере
  * jQuery
  * bower - менеджер пакетов на сервере 
    * semantic - фреймворк визуальных компонентов (css, js)
    * websockets - полифил для веб-сокетов (flash)
    * handlebars - императивные шаблоны на HTML
    * ember - клиентский mvc
  * ender - менеджер пакетов на клиенте
    * scriptjs - загрузчик скриптов
    * jar - работа с куки на клиенте
    * q - промисы
    * ym - модульная система в стиле AMD, от Yandex (клиент/сервер)
  * grunt - универсальный сборщик
  * enb - сборщик bem-проектов, от Yandex
    * hbs.js - технология для сборки шаблонов Handlebars из BEMJSON
    * borschik - минификатор js и css для enb на основе uglify
