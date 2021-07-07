import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-modal-passwordchange',
  templateUrl: './modal-passwordchange.component.html',
  styleUrls: ['./modal-passwordchange.component.css'],
  providers: [ModalServiceService],
})
export class ModalPasswordchangeComponent implements OnInit {
  @ViewChild('modal') elementRef: ElementRef;
  @Input() isAuthenticated: boolean;
  error: string = null;
  text: string;
  password: string;
  context: any;
  successStatus: boolean = false;
  constructor(
    public modalService: ModalServiceService,
    public modelService: ModelServiceService
  ) {}
  ngAfterViewInit(): void {
    this.modalService.setup({
      context: this.context,
      elementReferance: this.elementRef,
    });
  }

  open() {
    this.error = null;
    this.successStatus = false;
    this.modalService.open();
  }
  close() {
    this.modalService.close();
  }
  ngOnInit(): void {
    this.context = this;
  }

  update(form: NgForm) {
    const password = form.value.password;
    this.modelService
      .updatePassword({
        username: localStorage.getItem('username'),
        password: password,
      })
      .subscribe(
        (resData) => {
          this.successStatus = true;
          this.error = null;
          localStorage.setItem('password', password);
        },
        (errorMessage) => {
          this.successStatus = false;
          this.error = errorMessage;
        }
      );

    form.reset();
  }
}
