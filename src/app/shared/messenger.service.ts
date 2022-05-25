import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();

  constructor() { }

  sendMsg(product: unknown) {
    console.log('Messenger service sending this product :::', product);
    this.subject.next(product); //Triggering an event
  }

  getMsg() {
    return this.subject.asObservable();
  }
}
