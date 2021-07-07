import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImodelDate, ImodelWork } from 'src/app/Imodel/Imodel';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
})
export class WorksComponent {
  constructor(private modelService: ModelServiceService) {}
}
