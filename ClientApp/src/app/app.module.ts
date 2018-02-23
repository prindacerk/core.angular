import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { NgProgressRouterModule } from "@ngx-progressbar/router";
import { AlertModule, ButtonsModule, CollapseModule, BsDatepickerModule, BsDropdownModule, ModalModule, PaginationModule, PopoverModule, ProgressbarModule, RatingModule, TabsModule, TooltipModule, TypeaheadModule } from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";

import { HttpInterceptorClass } from "./http.interceptor";
import { AppComponent } from "./components/app.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { routes as Routing } from "./app.routes";

import { HomeComponent } from "./components/home/home.component";
import { CounterComponent } from "./components/counter/counter.component";
import { FetchDataComponent } from "./components/fetch-data/fetch-data.component";
import { ModalComponent, ModalContent } from "./components/modal/modal.component";
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule({
	declarations: [
		AppComponent,
		NavMenuComponent,
		HomeComponent,
		CounterComponent,
		FetchDataComponent,
		ModalComponent, ModalContent,
		LoaderComponent,
	],
	imports: [
		// basic
		CommonModule,
		BrowserAnimationsModule, // required animations module
		BrowserModule.withServerTransition({ appId: "core-angular" }),
		HttpClientModule,
		FormsModule,
		Routing,
		// progress bar
		NgProgressModule.forRoot({
			ease: "linear",
			spinner: true,
			spinnerPosition: "right",
			color: "blue",
			thick: true
		}),
		NgProgressHttpModule,
		NgProgressRouterModule,
		// bootstrap
		AlertModule.forRoot(),
		ButtonsModule.forRoot(),
		CollapseModule.forRoot(),
		BsDatepickerModule.forRoot(),
		BsDropdownModule.forRoot(),
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		PopoverModule.forRoot(),
		ProgressbarModule.forRoot(),
		RatingModule.forRoot(),
		TabsModule.forRoot(),
		TooltipModule.forRoot(),
		TypeaheadModule.forRoot(),
		// toastr
		ToastrModule.forRoot({
			autoDismiss: true,
			maxOpened: 0,
			newestOnTop: true,
			timeOut: 10000,
			positionClass: "toast-top-full-width",
			preventDuplicates: false,
			tapToDismiss: true,

		}),
	],
	providers: [
		[{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorClass, multi: true }]
	],
	entryComponents: [
		ModalContent,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
