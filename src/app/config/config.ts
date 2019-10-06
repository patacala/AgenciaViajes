import { isDevMode } from '@angular/core';

export const URL_SERVICES = isDevMode() ? 'http://35.160.6.198:3200/api' : 'http://35.160.6.198:3200/api/hoteles';
