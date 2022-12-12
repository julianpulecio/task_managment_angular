import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  date:Date = new Date(2022,0,1)
  today = new Date()

  constructor() { }
}
