import {Injector} from './app/utils/injector';
import {App} from './app/app';

let app = Injector.resolve<App>(App);

app.start();