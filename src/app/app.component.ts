import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./employee.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // @ts-ignore
  public employees: Employee[];
  // @ts-ignore
  public editEmployee: Employee;
  // @ts-ignore
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {
    //now i have acces to employeeService because I injected it in this component
  }

  ngOnInit(): void {//this is always called when this component is initialized
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{ //if we get a response with Employee[] we execute the following code
          this.employees = response;
      },//else
      (error: HttpErrorResponse) => { //if the response is an error
          alert(error.message);
      }
    );
    //with .subscribe we are notified when some date comes from the server
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    );
    //the value of the form will be a json representation of the employee
  }

  public onUpdateEmployee(employee: Employee): void {
    // @ts-ignore

    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) =>{
        console.log(response);
        this.getEmployees();

      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    //the value of the form will be a json representation of the employee
  }

  public onDeleteEmployee(employeeId: any): void {
    // @ts-ignore

    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    //the value of the form will be a json representation of the employee
  }

  public searchEmployees(key: string): void{
    const results: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void{
    const container =document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';//changed the type from submit which is default to button
    button.style.display = 'none';//hide the button
    button.setAttribute('data-toggle', 'modal');//set the attribute 'data-toggle' to 'modal'
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal')//# sign because it is referencing and ID
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal')
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal')
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();//so it will open the apropiete modal
  }
}
