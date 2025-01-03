import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor} from './authentication/service/authentication-interceptor-service';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AppInitializerService} from './app-initializer-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAppInitializer(() => inject(AppInitializerService).initializeApp()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
