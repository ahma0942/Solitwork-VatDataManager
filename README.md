# VAT DataManager - Frontend

## Build

`docker build -t angular-frontend .`

## Run

`docker run -p 4200:4200 angular-frontend`

## Translations

To create a translation file, run the following command:

`ng extract-i18n --output-path src/locale`

Replace locale with the locale for your translation. Rename the file and change the translations accordingly.
