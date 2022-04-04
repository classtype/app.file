/*▄──────────────────────────────────────────────────────────────────────────────────────────────▄
  █                                                                                              █
  █  В данном примере продемонстрировано как получить содержимое каталога                        █
  █                                                                                              █
  ▀──────────────────────────────────────────────────────────────────────────────────────────────▀*/
const File = require('../src/app.file');
const Storage = new File('./storage');

/*┌─────────────────┐
  │ Чтение каталога │
  └─────────────────┘*/
Storage.readdir('..', (res, files) => {
// Ошибка 
    if (res.status == 'error') {
        console.log('Ошибка! '+res.error_msg);
        return;
    }
    
// Содержимое каталога
    files.forEach(file => {
    // Символичиская ссылка
        if (file.isSymbolicLink()) {
            console.log('Ссылка | '+ file.name);
        }
        
    // Каталог
        if (file.isDirectory()) {
            console.log('Каталог | '+ file.name);
        }
        
    // Файл
        if (file.isFile()) {
            console.log('Файл | '+ file.name);
        }
    });
    //=> Файл | example.js
    //=> Файл | example.json.js            
    //=> Файл | example.readdir.js         
    //=> Файл | example.text.js            
    //=> Каталог | storage
});

/*────────────────────────────────────────────────────────────────────────────────────────────────*/