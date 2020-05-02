import * as algoliasearch from 'algoliasearch/lite';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCEuBRpqApOsFK6cb5Au5uwWkpmS24vjYU',
    authDomain: 'cosmetics-app-71d70.firebaseapp.com',
    databaseURL: 'https://cosmetics-app-71d70.firebaseio.com',
    projectId: 'cosmetics-app-71d70',
    storageBucket: 'cosmetics-app-71d70.appspot.com',
    messagingSenderId: '583149269946',
    appId: '1:583149269946:web:2b6bd8ed1a85f403a9a383',
    measurementId: 'G-QNXDHMKDVB'
  }
};

export const searchClient = algoliasearch(
  'QHQKMOPZAA',
  'ee88b7914f35c3589652b3af76530549'
);


