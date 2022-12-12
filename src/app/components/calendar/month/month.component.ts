import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import * as dateMath from 'date-arithmetic'
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
})
export class MonthComponent implements OnInit {

  days:Array<number> = Array(31).fill(1).map((x, i) => i + 1)
  prev_days:Array<Date> = []
  tasks:Array<any> = []
  month_labels = Array("JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP","OCT", "NOV", "DEC"); 
  month!:number

  constructor(public calendarService:CalendarService, public taskService:TaskService) { }

  ngOnInit(): void {
    this.calendarService.date = dateMath.subtract(this.calendarService.date,this.calendarService.date.getDate()-1,'day')
    this.month = this.calendarService.date.getMonth()
    this.initialize_prev_dates()
    this.initialize_tasks()
  }

  initialize_prev_dates(){
    let prev_day = dateMath.subtract(this.calendarService.date,this.calendarService.date.getDay(),'day') 
    while(prev_day.getMonth() != this.month){
      this.prev_days.push(prev_day)
      prev_day = dateMath.add(prev_day, 1, 'day')
    }
  }

  initialize_tasks(){
    this.taskService.updatedTasks()
    this.taskService.currentTasks.subscribe((tasks)=>{
      this.tasks = tasks
    })
  }
}