import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import mongodb from 'mongodb';
const ObjectID = mongodb.ObjectID;
export class UserController {

    async index(req: Request, res: Response) {
        const resource = await User.find()
        res.status(200).send(resource)
    }

    async create(req: Request, res: Response) {
        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(404).send('User is already created.')
        const resource = await new User({
            name: req.body.name,
            email: req.body.email
        })
        await resource.save()
        res.send(resource)
    }

    async show(req: Request, res: Response) {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(404).send('The user with given id was not found.')
        res.send(user)
    }

    async edit(req: Request, res: Response) {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(404).send('The user with given id was not found.')
    }

    async delete(req: Request, res: Response) {
        const user = await User.findByIdAndDelete({ _id: req.params.id })
        if (!user) return res.status(404).send('The user with given id was not found.')
        res.send(user)
    }
}