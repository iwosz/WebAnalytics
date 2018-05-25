import {Plugin} from './plugin';

export class Device extends Plugin {

    constructor() {
        super();
    }

    getName(): string {
        let name = '';

        if(navigator.userAgent.match(/Android/i)) {
            name = 'Android';
        }
        if(navigator.userAgent.match(/BlackBerry/i)) {
            name = 'BlackBerry';
        }
        if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            name = 'iOS';
        }
        if(navigator.userAgent.match(/IEMobile/i)) {
            name = 'Windows';
        }

        if(!name.length) {
            let isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

            name = isMobile ? 'MobileDevice' : 'Desktop';
        }

        return name;
    }

    getScreenWidth(): number {
        let width: number = window.screen.width * window.devicePixelRatio;

        return width;
    }

    getScreenHeight(): number {
        let height: number = window.screen.height * window.devicePixelRatio;

        return height;
    }
}