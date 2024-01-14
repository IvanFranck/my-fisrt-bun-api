import jwt from "jsonwebtoken"

export const verifyToken = (token: string) => {
    let payload: any;

    jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded)=>{
        if (error){
            throw new Error('Invalid token')
        }

        payload = decoded
    })

    return payload
}

export const signUserToken = (data: {userId: number, email: string}) => {

    const token = jwt.sign(
        {
            id: data.userId,
            email: data.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    )

    return token
}