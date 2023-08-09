# VAT DataManager - Frontend

## Build

`docker build -t angular-frontend .`

## Run

`docker run -p 4200:4200 angular-frontend`

## Test

Both Backend and Frontend must be running before you run the tests:

`npm run cypress:run`

## Translations

Change language programatically by changing the `lang` variable in `/src/app/services/translate.service.ts`

The language will not change unless you comment out line 36 (this line detects the browser language and sets it automatically if it exists)
