## Что это?

**App.file** — это [npm-пакет](https://www.npmjs.com/package/app.file)
с помощью которого вы можете быстро начать работу с файлами.

## Установка

```
$ npm i app.file
```

## Подключение

```js
const File = require('app.file');
const Storage = new File('./storage');
```

Как пример в качестве хранилищя мы будем использовать директорию `./storage`

## Использование как Promise

```js
let res = await Storage.add('file1.txt', 'Текст 123');
console.log(res);
```

В директории `./storage` будет создан файл `file1.txt` с содержимым `Текст 123`

## Использование как Callback

```js
Storage.add('file1.txt', 'Текст 123', (res) => {
    console.log(res);
});
```

#### Пример ответа

```js
{
    status: 'good',
    path: '/home/storage/file1.txt'
}
```

В ответе будет передано состояние операции — `status` и полный путь — `path`

#### Пример ошибки

```js
{
    status: 'error',
    error_code: 103,
    error_msg: 'Файл с таким именем уже существует!',
    path: '/home/storage/file1.txt'
}
```

В случае успеха `status` будет равен `good`, в случае ошибки `error`

## Список ошибок

| error_code | error_msg                              |
| ---------- | -------------------------------------- |
| 100        | Неизвестная ошибка!                    |
| 101        | Каталог не найден!                     |
| 102        | Файл не найден!                        |
| 103        | Файл с таким именем уже существует!    |
| 104        | Каталог с таким именем уже существует! |
| 105        | Файл содержит не правильный JSON!      |

## Storage.add — Создание файла

```js
let res = await Storage.add('file1.txt', 'Текст 123');
```

Создание произойдет только если файл не существует.

#### Пример #1

```js
const File = require('app.file');
const Storage = new File('./storage');

Storage.add('file1.txt', 'Текст 123', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Файл успешно создан!');
});
//=> Файл успешно создан!
```

## Storage.set — Запись в файл

```js
let res = await Storage.set('file1.txt', 'Новый текст 789');
```

Запись произойдет только если файл существует.

#### Пример #2

```js
const File = require('app.file');
const Storage = new File('./storage');

Storage.set('file1.txt', 'Новый текст 789', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Данные успешно записаны!');
});
//=> Данные успешно записаны!
```

## Storage.get — Чтение из файла

```js
let res = await Storage.get('file1.txt');
```

Чтение произойдет только если файл существует.

#### Пример #3

```js
const File = require('app.file');
const Storage = new File('./storage');

Storage.add('file1.txt', 'Текст 123');
Storage.get('file1.txt', (res, content) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log(content);
});
//=> Текст 123
```

## Storage.del — Удаление файла

```js
let res = await Storage.del('file1.txt');
```

Удаление произойдет только если файл существует.

#### Пример #4

```js
const File = require('app.file');
const Storage = new File('./storage');

Storage.del('file1.txt', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Файл успешно удален!');
});
//=> Файл успешно удален!
```

## Формат — JSON

Формат файлов по умолчанию всегда равен `text`, то есть текстовый файл.

Эти строки будут работать одинаково:

```js
const Storage = new File('./storage');
const Storage = new File('./storage', 'text');
```

Вы также можете задать в качестве формата `json`

```js
const Storage = new File('./storage', 'json');
```

#### Пример #5

```js
const File = require('app.file');
const Storage = new File('./storage', 'json');

Storage.add('file1.json', {name:'Mick', level:5});
Storage.get('file1.json', (res, json) => {
    console.log(json);
});
//=> { name: 'Mick', level: 5 }

Storage.set('file1.json', {name:'Jonni', level:6});
Storage.get('file1.json', (res, json) => {
    console.log(json);
});
//=> { name: 'Jonni', level: 6 }
```

Как мы видем данные автоматически конвертируются в `json`