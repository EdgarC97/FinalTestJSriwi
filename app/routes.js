import { CreateNewFLightScene } from "./scenes/home/create-flight.scene";
import { FlightEditScene } from "./scenes/home/edit-flight.scene";
import { DashboardScene } from "./scenes/home/dashboard.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { RegisterScene } from "./scenes/register/register.scene";

export const routes = {
  public: [
    { path: "/login", scene: LoginScene },
    { path: "/not-found", scene: NotFoundScene },
    { path: "/register", scene: RegisterScene },
  ],
  private: [
    { path: "/dashboard", scene: DashboardScene },
    { path: "/dashboard/edit", scene: FlightEditScene },
    { path: "/dashboard/create", scene: CreateNewFLightScene },
  ],
};
