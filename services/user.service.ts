import { signUserToken } from './auth.service';
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


export const login = async(data: {email: string, password: string}) => {
    try{
        const {email, password} = data

        // find user with given email
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!user){
            throw new Error('user not found')
        }

        const isPasswordMatch = Bun.password.verify(password, user.password)

        if (!isPasswordMatch) {
            throw new Error('Invalid credentials')
        }


        // sign the token 
        const token = signUserToken({email, userId: user.id})

        return {
            messsage: 'user signed in successfully',
            token
        }
    }catch(error){
        throw error;
    }
}

