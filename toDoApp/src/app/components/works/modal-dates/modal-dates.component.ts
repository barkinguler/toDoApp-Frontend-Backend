import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImodelDate, ImodelWork } from 'src/app/Imodel/Imodel';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-modal-dates',
  templateUrl: './modal-dates.component.html',
  styleUrls: ['./modal-dates.component.css'],
  providers: [ModalServiceService],
})
export class ModalDatesComponent implements OnInit {
  @Input() nodeWork: ImodelWork;
  @Input() context: any;

  condition: boolean;
  @ViewChild('modal') elementRef: ElementRef;
  text: string;

  constructor(
    private modalService: ModalServiceService,
    private modelService: ModelServiceService
  ) {}
  ngAfterViewInit(): void {
    this.modalService.setup({
      context: this.context,
      elementReferance: this.elementRef,
    });
  }

  open() {
    this.modalService.open();
  }
  close() {
    this.modalService.close();
  }
  ngOnInit(): void {
    this.condition = true;
  }
  update() {
    this.modelService.updateDateName(this.nodeWork, this.context.node);
  }
  getDates() {
    return this.modelService.getDateValue();
  }
  showWorks(value: ImodelDate, deger: number, event: any) {
    this.nodeWork.datee = { id: value.id, datename: value.datename };
    this.condition = false;
  }
}
