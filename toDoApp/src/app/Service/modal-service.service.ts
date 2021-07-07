import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Imodal } from '../Imodel/Imodal';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  modalRef: ElementRef;
  context: any;
  private renderer: Renderer2;
  constructor(public rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setup(value: Imodal) {
    this.modalRef = value.elementReferance;
    this.context = value.context;
  }
  open() {
    this.renderer.addClass(this.modalRef.nativeElement, 'backdrop');
    this.renderer.addClass(this.modalRef.nativeElement, 'show');
  }
  close() {
    this.renderer.removeClass(this.modalRef.nativeElement, 'show');
  }
  save() {}
}
