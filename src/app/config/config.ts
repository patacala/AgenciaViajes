import { isDevMode } from '@angular/core';

export const URL_SERVICES = isDevMode() ? 'http://35.160.6.198:3200/api' : 'http://35.160.6.198:3200/api/hoteles';
export const SPINNER_DATA = {
    type: 'line-scale-party',
    size: 'large',
    bdColor: 'rgba(100,149,237, .8)',
    color: 'white'
  };

