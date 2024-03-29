import Elysia from "elysia";
import { userController } from "./controllers/user.controller";
import { recipeController } from "./controllers/recipe.controller";
import { commentController } from "./controllers/comment.controller";

const app = new Elysia()

// use controlelr ass midllewares
app.use(userController as any)
app.use(recipeController as any)
app.use(commentController as any)


// run server on port 4040 and listen the traffic
app.listen(4040, ()=>{
    console.log("Server is running on port 4040");
})


export { app }