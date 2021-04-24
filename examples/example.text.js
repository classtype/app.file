/*--------------------------------------------------------------------------------------------------
|
| -> Формат файлов по умолчанию всегда равен "text", то есть текстовый файл.
|
|    Эти строки будут работать одинаково:
|    new File('./storage')
|    new File('./storage', 'text')
|
|-------------------------------------------------------------------------------------------------*/

const File = require('../src/app.file');
const Storage = new File('./storage');

/*--------------------------------------------------------------------------------------------------
|
| -> Storage.add — Создание файла
|
|-------------------------------------------------------------------------------------------------*/

Storage.add('file1.txt', 'Текст 123', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Файл успешно создан!');
});
//=> Файл успешно создан!

/*--------------------------------------------------------------------------------------------------
|
| -> Storage.set — Запись в файл
|
|-------------------------------------------------------------------------------------------------*/

Storage.set('file1.txt', 'Новый текст 789', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Данные успешно записаны!');
});
//=> Данные успешно записаны!

/*--------------------------------------------------------------------------------------------------
|
| -> Storage.get — Чтение из файла
|
|-------------------------------------------------------------------------------------------------*/

Storage.get('file1.txt', (res, content) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log(content);
});
//=> Новый текст 789

/*--------------------------------------------------------------------------------------------------
|
| -> Storage.del — Удаление файла
|
|-------------------------------------------------------------------------------------------------*/

Storage.del('file1.txt', (res) => {
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    console.log('Файл успешно удален!');
});
//=> Файл успешно удален!

//--------------------------------------------------------------------------------------------------