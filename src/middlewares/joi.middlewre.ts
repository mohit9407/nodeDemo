import { Request, Response, NextFunction } from 'express';
import Joi from 'joi'
export function JoiMiddleware(schema, property) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.validate(req[property], schema)
        const valid = error == null
        if (valid) {
            next()
        } else {
            const { details } = error
            const message = details.map(i => i.message).join(',')
            console.log('joi error', message)
            res.status(422).json({ error: message })
        }
    }
}

export const userJoiSchema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().min(10).email().required()
}