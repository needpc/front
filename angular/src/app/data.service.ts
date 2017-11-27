import { Injectable } from '@angular/core';

@Injectable()
export class myService {
  public sharedData:Object[];

  constructor() {
    this.sharedData = [];
  }

  setData (data) {
    this.sharedData = data;
  }

  getData () {
    return this.sharedData;
  }
}
