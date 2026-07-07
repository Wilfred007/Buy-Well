import { bcrypt} from 'bcrypt'


export const generateHashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(salt, password)
}


export const comparePassword = async (
    password: string,
    hashedPassword: string,
) => {
    return await bcrypt.compare(password, hashedPassword)
}