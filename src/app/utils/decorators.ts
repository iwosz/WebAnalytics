import {Type} from './type';

/**
 * Generic `ClassDecorator` type
 */
export type GenericClassDecorator<T> = (target: T) => void;

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Injectable = (): GenericClassDecorator<Type<object>> => {
    return (target: Type<object>) => {
        // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
    };
};