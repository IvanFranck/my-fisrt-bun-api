import  Elysia from "elysia";
import { createUser, login } from "../services/user.service";

export const userController = (app: Elysia) => {
    app.post('/signup', async(context)=>{
        try {
            const userData: any = context.body

            const newUser = await createUser({
                email: userData.email,
                name: userData.name,
                password: userData.password
            })

            return {
                user: newUser
            }
        } catch (error: any) {
            console.log("🚀 ~ app.post ~ error:", error)
            return {
                error: error.message
            }
        }
    })

    app.post('/login', async(context)=>{

        try {
            
            const userData: any = context.body
    
            const loggedInUser = await login({
                email: userData.email,
                password: userData.password
            })
    
            return loggedInUser

        } catch (error: any) {
            console.log("🚀 ~ app.post ~ error:", error)
            return {
                error: error.message
            }
        }
    })
}