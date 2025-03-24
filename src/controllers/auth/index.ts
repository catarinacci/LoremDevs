import { Request, Response, NextFunction } from 'express';
import user,{ IUser } from '../../models/user';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import { validateBody } from '../../helpers/validateBody';
import cloudinary from '../../helpers/cloudinary';
import  jwt  from 'jsonwebtoken';
import { generateJWT, generateRefreshJWT } from '../../helpers/generateJWT';

export const register = {
  check: (req: Request, res: Response, next: NextFunction) => {

    const schema = Joi.object<IUser>({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      lastname: Joi.string().required(),
      password:Joi.string().min(8).required(),
    });

    validateBody(req,next,res,schema)
  },
  do: async (req: Request, res: Response, next: NextFunction) => {

    const { files, body } = req;
    const file = JSON.parse(JSON.stringify(files))
    const { name, lastname, password, email } = body;

    try {

    // compruebo si el email ya está registrado 
    const targetUser = await user.find({ email: email });

    if (targetUser.length > 0) {
        res.status(400).json({
        success: false,
        messaje: "Usuario ya registrado",
        ref: "email",
      });
      return
    }
    //creo al usuario
    const newUser: IUser = new user({name,lastname,email})

    //encriptar password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    //cargo la imagen al ususario
    if (files && files.image) {
        const imageUrl = await cloudinary.uploader.upload(
          file.image.tempFilePath,
          { folder: "users" }
        );
        newUser.image = imageUrl.secure_url;
    } else {
      newUser.image = "https://res.cloudinary.com/dxslpx4nf/image/upload/v1741468598/users/gyo1j8f7aa62qthp44sh.jpg";
    }

    //guardo en la base de datos el nuevo usuario
    await newUser.save();

    //genero los tokens
    const token: string = jwt.sign({_id:newUser._id}, process.env.SECRETORPRIVATEKEY as string,{expiresIn: "24h"})
    const refreshToken: string = jwt.sign({_id:newUser._id}, process.env.SECRETORPRIVATEKEY as string,{expiresIn: "7d"}) 

       res.status(200).json({
        success: true,
        message: "Usuario creado",
        user:newUser,
        token: token,
        refreshToken:refreshToken
      });

    } catch (error) {
       res.status(400).json({
        success: false,
        message: "Error al identificar al usuario",
        ref: "email",
      });
      return
    }
  },
};

export const login = {
  check: (req:Request, res:Response, next:NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    validateBody(req,next,res,schema);
  },
  do: async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const targetUser = await user.findOne({ email });
    if (!targetUser) {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
      return
    }
    if (!bcrypt.compareSync(password, targetUser.password)) {
      res.status(404).json({
        success: false,
        message: "Contraseña incorrecta",
      });
      return
    }
    const id: string = targetUser._id as string
    //const id: string | null = null
    //console.log(id)
    //const token: string = jwt.sign({_id:targetUser._id}, process.env.SECRETORPRIVATEKEY as string,{expiresIn: "24h"})
    const token: string = await generateJWT(id)
    const refreshToken: string = await generateRefreshJWT(id)
    //const refreshToken: string = jwt.sign({_id:targetUser._id}, process.env.SECRETORPRIVATEKEY as string,{expiresIn: "7d"})  

    res.status(200).json({
      success: true,
      user:targetUser,
      token: token,
      refreshToken: refreshToken,
    });
  },
};

export const profile = {
  do: async (req:Request, res:Response, next:NextFunction) => {
    //console.log (req.userId)
    const targetUser = await user.findById(req.userId);
    
    if(!targetUser){
      res.status(404).json({
        success: false,
        message: "El usuario no existe",
      });
      return
    }res.status(200).json({
      success: true,
      user:targetUser,
    });
  },
};

export const showUsers = async (req:Request, res:Response, next:NextFunction)=>{

  const users = await user.find()
  console.log("Usuarios")
  if(!users){
    res.status(404).json({
      success: false,
      message: "No hay usuarios",
    });
    return
  }res.status(200).json({
    success: true,
    user:users
  });
}