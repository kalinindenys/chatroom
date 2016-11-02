import {Injectable} from 'angular2/core';

@Injectable()
export class ConfirmDialogService {

    confirm(message?:string) {
        return new Promise<boolean>((resolve, reject) =>
            resolve(window.confirm(message || 'Okey?')));
    };

}