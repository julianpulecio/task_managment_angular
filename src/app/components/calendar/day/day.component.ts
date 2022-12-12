import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import * as dateMath from 'date-arithmetic'
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
})
export class DayComponent implements OnInit {

  @Input('day')day!:number
  @Input('tasks')tasks:Array<any> = []
  date!:Date

  constructor(private calendarService:CalendarService, private taskService:TaskService) { }

  ngOnInit(): void {
    this.date = this.calendarService.date
    if(dateMath.lt(this.date, new Date(this.date.getFullYear(), 11, 31) ) ){
      this.calendarService.date = dateMath.add(this.calendarService.date, 1, 'day')
    }
  }

  validate_date(){
    return this.date.getDate() == this.day
  }

  validate_task(task:any){
    return this.date >= new Date(task.start_date) && this.date <= new Date(task.end_date) 
  }

  is_today(){
    let today = new Date()
    return this.date.toDateString() == today.toDateString()
  }


}