import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"tour-of-heroes-marcalex","appId":"1:744243856677:web:22a2f7cbc255e50bd706cc","storageBucket":"tour-of-heroes-marcalex.appspot.com","apiKey":"AIzaSyAd2tOcNtQUsG_us3puO68WWgZdRGruXK0","authDomain":"tour-of-heroes-marcalex.firebaseapp.com","messagingSenderId":"744243856677"})), provideFirestore(() => getFirestore())]
};
