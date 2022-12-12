import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './components/calendar/month/month.component';
import { DayComponent } from './components/calendar/day/day.component';
import { YearComponent } from './components/calendar/year/year.component';
import { TaskNewComponent } from './components/task/task-new/task-new.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/task/task-table/task-table.component';
import { ProjectTableComponent } from './components/project/project-table/project-table.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ProjectNewComponent } from './components/project/project-new/project-new.component';
import { EmployeeTableComponent } from './components/employee/employee-table/employee-table.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeNewComponent } from './components/employee/employee-new/employee-new.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    DayComponent,
    YearComponent,
    TaskNewComponent,
    TaskEditComponent,
    TaskTableComponent,
    ProjectTableComponent,
    ProjectEditComponent,
    ProjectNewComponent,
    EmployeeTableComponent,
    EmployeeEditComponent,
    EmployeeNewComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
