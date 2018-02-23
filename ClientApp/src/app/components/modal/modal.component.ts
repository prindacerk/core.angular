import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
	selector: "modal-component",
	templateUrl: "./modal.component.html",
})
export class ModalComponent {
		modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

	openModalWithComponent() {
		const initialState = {
			list: [
				"Open a modal with component",
				"Pass your data",
				"Do something else",
				"..."
			],
			title: "Modal with component"
		};
		this.modalRef = this.modalService.show(ModalContent, { initialState });
		this.modalRef.content.closeBtnName = "Close";
	}
}

@Component({
	selector: "modal-content",
	template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="modelRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="modelRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContent implements OnInit {
	title: string;
	closeBtnName: string;
	list: any[] = [];

	constructor(public modelRef: BsModalRef) { }

	ngOnInit() {
		this.list.push("PROFIT!!!");
	}
}
