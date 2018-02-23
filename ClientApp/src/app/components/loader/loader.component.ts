import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "loader-component",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent {
	startedClass = false;
	completedClass = false;
	preventAbuse = false;

	constructor(private http: HttpClient) {

	}

	onStarted() {
		this.startedClass = true;
		setTimeout(() => {
			this.startedClass = false;
		}, 800);
	}

	onCompleted() {
		this.completedClass = true;
		setTimeout(() => {
			this.completedClass = false;
		}, 800);
	}

	testHttp() {
		this.preventAbuse = true;
		this.http.get("https://jsonplaceholder.typicode.com/posts/1").subscribe(res => {
			console.log(res);

			setTimeout(() => {
				this.preventAbuse = false;
			}, 800);
		});
	}
}