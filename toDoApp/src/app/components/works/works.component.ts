import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImodelDate, ImodelWork } from 'src/app/Imodel/Imodel';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent  {
  
  constructor(private modelService: ModelServiceService) { }
 /* subscription :Subscription;
  subscriptiondetail :Subscription;
  condition: boolean;
  text: string;
  node:ImodelDate;
  workForm: FormGroup;
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription=this.modelService.newDate.subscribe(
      (condition)=>{
        this.condition=condition;
      }
    )
    this.workForm=new FormGroup({
      'workname' : new FormControl(null,Validators.required)
    });
    this.subscriptiondetail=this.modelService.dateDetail.subscribe(
      (value)=>{
        this.modelService.getItems(value);
        this.node=value;
      }
    )
  }
  createInputs() {
    
    this.modelService.addItem({ workname: this.text, done: false, datee :this.node });

  }
  getundoneItems() {

    return this.modelService.getItemsUndone();
  }
  updateItem(item: ImodelWork) {
    this.modelService.updateItem(item);

  }
  getdoneItems() {

    return this.modelService.getItemsDone();
  }*/
}
