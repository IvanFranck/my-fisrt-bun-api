import {prisma} from './prisma.service'

export const createRecipe = async(
    data: {
        title: string,
        body: string,
        userId: number;
    }
) => {
    try{
        const { title, body,userId } = data

        const recipe =  await prisma.recipe.create({
            data: {
                body,
                title,
                userId
            }
        })

        return recipe

    }catch(error){
        throw error
    }
}

export const getAllRecipes = async () => {
    try {
        
        const recipes = await prisma.recipe.findMany({
          include: {
            user: true,
            comments: true,
          },
        });

        return recipes;

    } catch (error) {
        throw error
    }
  
};

export const getRecipeById = async (id: number) => {

    try {
        
        const recipe = await prisma.recipe.findUnique({
          where: {
            id,
          },
          include: {
            user: true,
          },
        });
      
        return recipe;

    } catch (error) {
        throw error
    }
};