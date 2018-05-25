import {Injectable} from './../utils/decorators';

@Injectable()
export class LoggerService {

    log(message: string, data?) {
        if(data) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }

    warn(message: string, data?) {
        if(data) {
            console.warn(message, data);
        } else {
            console.warn(message);
        }
    }

    error(message: string, data?) {
        if(data) {
            console.error(message, data);
        } else {
            console.error(message);
        }
    }
}