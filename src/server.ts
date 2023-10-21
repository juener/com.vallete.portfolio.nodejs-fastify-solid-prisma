import { app } from './app'
import { env } from './env'

app.listen({
    host: '0.0.0.0',
    port: env.APP_PORT
}).then(() => {
    console.log(`The server is running at the port ${env.APP_PORT}`)
})