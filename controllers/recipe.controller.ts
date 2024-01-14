import Elysia from "elysia";
import { verifyToken } from "../services/auth.service";
import { createRecipe, getAllRecipes } from "../services/recipe.service";

export const recipeController = (app: Elysia) => {

    app.post('/create-recipe', async(context)=>{

        try {
            
            const authHeader = context.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            
            if(!token){
                throw new Error('Invalid token')
            }

            const verifiedToken = verifyToken(token as string)

            const data: any = context.body

            const newRecipe = createRecipe({
                title: data.title,
                body: data.body,
                userId: verifiedToken?.id,
            })

            return {
                recipe: newRecipe
            }

        } catch (error: any) {
            console.log("🚀 ~ app.post ~ error:", error)
            
            return{
                error: error.message
            }

        }
    })

    app.get("/recipes", async () => {
        
        try {
            const recipes = await getAllRecipes();

            return recipes;

        } catch (error: any) {

            return {
                error: error.message,
            };
        }
    });
}