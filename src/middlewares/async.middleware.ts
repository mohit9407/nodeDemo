import { Request, Response, NextFunction } from "express";

export function asyncMilddeware(routeHandlerFctn) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await routeHandlerFctn(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}