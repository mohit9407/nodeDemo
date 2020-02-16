
import { UserController } from './../controllers/user.controller';
import { Router } from "express";
import { JoiMiddleware, userJoiSchema } from '../middlewares/joi.middlewre';
import { asyncMilddeware } from '../middlewares/async.middleware';

export class UserRouter {
    userRouter: Router = Router()
    private user = new UserController()
    constructor() {
        this.routes()

    }
    private routes() {
        this.userRouter.get('/', asyncMilddeware(this.user.index))
        this.userRouter.get('/:id', asyncMilddeware(this.user.show))
        this.userRouter.get('/:id', asyncMilddeware(new UserController().delete))
        this.userRouter.put('/:id', JoiMiddleware(userJoiSchema, 'body'), asyncMilddeware(new UserController().edit))
        this.userRouter.post('/', JoiMiddleware(userJoiSchema, 'body'), asyncMilddeware(new UserController().create))
    }
}