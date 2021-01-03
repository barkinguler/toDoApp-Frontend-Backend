import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { WorksListComponent } from '../works-list/works-list.component';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';
import { ImodelWork } from 'src/app/Imodel/Imodel';
import { DatesComponent } from '../dates/dates.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modal-works',
  templateUrl: './modal-works.component.html',
  styleUrls: ['./modal-works.component.css'],
  providers: [ModalServiceService]
})
export class ModalWorksComponent   implements OnInit,AfterViewInit {
  @Input() context: any;
  @Input() node:any;
  
  @ViewChild('modal')elementRef :ElementRef
  text:string;
  subscriptionContex:Subscription;
  constructor(public modalService:  ModalServiceService) { }
  ngAfterViewInit(): void {
    
    this.modalService.setup({context:this.context,elementReferance:this.elementRef})
  }
  
  open(){
    this.modalService.open();
  }
  close(){
    this.modalService.close();
  }
  ngOnInit(): void {
   
  }
  update(){
  
  this.context.updateName(this.node,this.text);
  }

}
