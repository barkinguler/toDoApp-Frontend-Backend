import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-newdate',
  templateUrl: './newdate.component.html',
  styleUrls: ['./newdate.component.css'],
})
export class NewdateComponent implements OnInit {
  newdate: string;
  dateForm: FormGroup;
  constructor(private modelService: ModelServiceService) {}

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      datename: new FormControl(null, Validators.required),
    });
  }
  onAddDate() {
    this.modelService.onAddDate({ datename: this.newdate });

    this.modelService.newDateValue.next(this.newdate);
  }
}
