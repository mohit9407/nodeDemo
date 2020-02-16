import { App } from "./app";
import { UserRouter } from "./routers/user.router";
import { UserController } from "./controllers/user.controller";

const app = new App
app.listen(7000 || +process.env.PORT)
app.routes('/api/user', new UserRouter().userRouter)