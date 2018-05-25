import 'reflect-metadata';
import {Type} from "./type";

/**
 * The Injector stores injectable classes and resolves requested instances.
 */
export const Injector = new class {
    resolve<T>(target: Type<any>): T {
        // tokens are required dependencies, while injections are resolved tokens from the Injector
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
            injections = tokens.map(token => Injector.resolve<any>(token));

        return new target(...injections);
    }
};