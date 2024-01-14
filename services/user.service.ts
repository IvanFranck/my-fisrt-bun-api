import {prisma} from './prisma.service'

export const createUser = async(
    data: {
        name: string;
        email: string;
        password: string;
    }
 ) => {
    try{
        const {name, email, password} = data

        const hashedPassword = await Bun.password.hash(password, {
            algorithm: 'bcrypt'
        })

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        const { password: userStoredPassword , ...result} = user

        return result
    }catch(error) {
        throw error
    }
}

