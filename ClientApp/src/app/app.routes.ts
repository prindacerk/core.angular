import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { CounterComponent } from "./components/counter/counter.component";
import { FetchDataComponent } from "./components/fetch-data/fetch-data.component";
import { ModalComponent } from "./components/modal/modal.component";
import { LoaderComponent } from "./components/loader/loader.component";

const appRoutes: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "counter", component: CounterComponent },
	{ path: "fetch-data", component: FetchDataComponent },
	{ path: "modal", component: ModalComponent },
	{ path: "loader", component: LoaderComponent },
    {
        path: "**",
        redirectTo: ""
    },
];

export const routes = RouterModule.forRoot(appRoutes);