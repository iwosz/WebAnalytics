import {Injectable} from './../utils/decorators';
import {Plugin} from './plugin';
import {BrowserInfo, detect} from 'detect-browser';

@Injectable()
export class Browser extends Plugin {

    private browser?: BrowserInfo | null;

    constructor() {
        super();
        this.browser = detect();
    }

    getName(): string {
        let name: string = this.browser ? this.browser.name : '';

        return name;
    }

    getVersion(): string {
        let version: string = this.browser ? this.browser.version : '';

        return version;
    }

    getOS(): string {
        let os: string = this.browser ? this.browser.os : '';

        return os;
    }
}