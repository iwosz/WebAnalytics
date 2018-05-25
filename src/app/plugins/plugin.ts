import {Injectable} from './../utils/decorators';
import {LoggerService} from './../services/logger';

@Injectable()
export class Plugin {

    protected logger: LoggerService;

    constructor() {
        this.logger = new LoggerService();
    }
}