
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Employee} from "./employee";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {//this http helps us to sent requests
  }

  public getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    //telling the http client where to make the request
  }

  public addEmployees(employee: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployees(employee: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployees(employeeId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
