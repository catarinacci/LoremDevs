import { Request, Response, NextFunction } from 'express';
import user,{ IUser } from '../../models/user';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
import { validateBody } from '../../utils/validateBody';
import cloudinary from '../../utils/cloudinary';

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
      return;
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

      res.status(200).json({
        success: true,
        message: "Usuario creado"
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al identificar al usuario",
        ref: "email",
      });
    }
  },
};