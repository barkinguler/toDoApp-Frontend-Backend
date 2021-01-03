import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImodelDate, ImodelWork } from 'src/app/Imodel/Imodel';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.css']
})
export class WorksListComponent implements OnInit {
  
  context :any;
  constructor(private modelService: ModelServiceService, private route: ActivatedRoute, private router: Router,private modalService:ModalServiceService) { }
  subscription: Subscription;
  subscriptiondetail: Subscription;
  text: string;
  node: ImodelDate;
  workForm: FormGroup;
  id: number;

  ngOnDestroy() {
    this.subscriptiondetail.unsubscribe();
  }
  ngOnInit(): void {
    this.context=this;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];

          this.node = this.modelService.getWorks(this.id);
          this.modelService.getItems(this.node);

        }
      );


    this.subscriptiondetail = this.modelService.dateDetail.subscribe(
      (value) => {

        this.modelService.getItems(value);

      }
    )
    this.workForm = new FormGroup({
      'workname': new FormControl(null, Validators.required)
    });
    
  }
  createInputs() {


    this.modelService.addItem({ workname: this.text, done: false, datee: this.node });
    this.workForm.reset();
  }
  getundoneItems() {

    return this.modelService.getItemsUndone();
  }
  updateItem(item: ImodelWork) {

    this.modelService.updateItem(item);

  }
  getdoneItems() {

    return this.modelService.getItemsDone();
  }
  deleteItem(value: ImodelWork){
    
   // this.modelService.getDates(this.id);
   this.modelService.deleteWork(value, this.modelService.getWorks(this.id));
  }
  updateName(node: any,value:string){
    
    this.context=this;
    node.workname=value;
this.modelService.updateName(node);
  }
  getItemManupelated(value:ImodelWork){
    const model :ImodelDate ={id:0,datename:null};
    value.datee=model;
    return value;
  }

}
