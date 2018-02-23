import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
})
export class HomeComponent {
	constructor(private toastr: ToastrService) {
		this.showSuccess();
	}

	showSuccess() {
		this.toastr.success("Hello world! This is Angular site running in .NET Core", "Toastr Test");
	}
}
