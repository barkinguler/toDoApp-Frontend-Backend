
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelServiceService } from './Service/model-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'toDoApp';
  
  constructor(private modelService: ModelServiceService) {

  }
  


  




}
