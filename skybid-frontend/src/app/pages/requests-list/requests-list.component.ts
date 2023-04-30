import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

ngOnInit(): void {
  this.search()
  
}

constructor(
  private apiService : ApiService,

) { }

requests = []

private search () {
  this.apiService.requests()
  .subscribe(data => {
    this.requests = data
    console.log(this.requests)
  })
  
}

}
