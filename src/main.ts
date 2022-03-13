import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableDebugTools } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
import 'hammerjs';
if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  function bootstrap() {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .then(m => {
        // enableDebugTools(AppComponent);
      })
      .catch(err => console.log(err));
  }


  if (document.readyState === 'complete') {
    bootstrap();
  } else {
    document.addEventListener('DOMContentLoaded', bootstrap);
  }

});
