# mandiri-scraper

Plugin untuk membantu anda mendapatkan informasi saldo terakhir rekening MANDIRI anda serta mutasi rekening MANDIRI anda pada hari itu melalui Mandiri Online.

## Cara Install

```bash
npm install --save mandiri-scraper
```

atau

```bash
yarn add mandiri-scraper
```

## Penggunaan

```javascript
const mandiri = require('mandiri-scraper');
```

### Cek Saldo Terakhir

```javascript
mandiri
  .getSaldo(USERNAME, PASSWORD)
  .then(res => {
    console.log('saldo ', res);
  })
  .catch(err => {
    console.log('error ', err);
  });
```

### Cek Mutasi Pada Hari Itu

```javascript
bca
  .getMutasi(USERNAME, PASSWORD)
  .then(res => {
    console.log('mutasi ', res);
  })
  .catch(err => {
    console.log('error ', err);
  });
```

# License

[MIT](https://github.com/karnadixyz/mandiri-scraper/blob/master/LICENSE)

# Author

[Karnadi](mailto:karnadixyz@gmail.com)
