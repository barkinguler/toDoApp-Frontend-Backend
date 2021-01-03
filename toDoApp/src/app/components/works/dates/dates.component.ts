import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImodelDate } from 'src/app/Imodel/Imodel';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit,OnDestroy {
context:any;  
subscription :Subscription;
deger:number;
id :number;
item:any;
condition:boolean=false;
  constructor(private modelService: ModelServiceService,private router:Router,
    private route: ActivatedRoute,private modalService:ModalServiceService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.context=this;
    this.modelService.getDates();
    
this.subscription=this.modelService.newDateValue.subscribe(
  value=>{
    
    this.modelService.getDates();
  }
)
  }
onNewDateSelected(){
  this.router.navigate(['new'],{relativeTo:this.route});

}
getDates(){
  
  return this.modelService.getDateValue();
}

showWorks(value :ImodelDate,deger :number){

this.item=value;
this.deger=deger;
this.id=value.id;
this.modelService.dateDetail.next(value);
this.condition=true;

}

deleteDate(){
  this.modelService.deleteDate(this.id);
 // this.router.navigate(['deleted'],{relativeTo:this.route});
 this.router.navigate(['/works']);
}

}
