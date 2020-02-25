import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileForm = new FormGroup({
  id: new FormControl(''),  
  firstName: new FormControl(''),
  lastName: new FormControl('')});
  
  saved = "";

  onSubmit() {

    const headers = { 'Content-Type': 'application/json' };
    const body = this.profileForm.value;
    // const json = { id : , firstName : this.firstName, lastName : this.profileForm.lastName };
    console.log(this.profileForm.value);

    this.http.post<any>('http://localhost:5555/json', body, { headers }).subscribe(data => {
      
      this.saved = "Result Saved";
      this.fetchData();
      this.profileForm.patchValue({ id : "", firstName : "", lastName : ""}); 
    });

    //this.http.post("http://localhost:5555/json").
  }

  constructor( private http: HttpClient ) { }

  result = [];
  fetchData = function() {
    this.http.get("http://localhost:5555/JSON").toPromise().then((data) => {
        this.result = data;
        console.log(data);
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

}
