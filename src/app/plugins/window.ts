import {Injectable} from './../utils/decorators';
import {Plugin} from './plugin';

@Injectable()
export class Window extends Plugin {

    constructor() {
        super();
    }

    onEvent(eventType: string, handler: any) {
        return window.addEventListener(eventType, handler, false);
    }
}