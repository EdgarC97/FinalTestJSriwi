import { DashboardScene } from "./scenes/dashboard/dashboard.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { RegisterScene } from "./scenes/register/register.scene";

export const routes = {
  public: [
    { path: "/login", scene: LoginScene },
    { path: "/not-found", scene: NotFoundScene },
    { path: "/register", scene: RegisterScene }
  ],
  private: [{ path: "/dashboard", scene: DashboardScene }],
};
