import express, { Router } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { ErrorMiddleware } from './middlewares/error.middleware'
export class App {
    private app: express.Application = express()
    constructor() {
        this.inItMiddleware()
        this.inItGlobalErrorHandler()
        this.inItDB()
    }

    listen(port: number) {
        this.app.listen(port, () => {
            console.log(`The server is listening on port ${port}...`)
        })
    }

    routes(path: string, router: Router) {
        this.app.use(path, router)
        this.app.use(ErrorMiddleware)
    }

    private inItMiddleware() {
        if (this.app.get('env') == 'development') {
            this.app.use(morgan('tiny'))
        }
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    private inItGlobalErrorHandler() {
        process.on('uncaughtException', (e) => {
            console.log('App UNCAUGHT ERROR EXCEPTION:', e.message)
            process.exit(1)
        })

        process.on('unhandledRejection', (e) => {
            console.log('App UNHANDLED REJECTION ERROR:', e)
            process.exit(1)
        })
    }

    private async inItDB() {
        await mongoose.connect('mongodb://localhost/testing', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('MongoDB is connected.')
    }
}