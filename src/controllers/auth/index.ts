import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../models/user';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt';
//import { Schemas} from '../../utils/validations';
//import validation from '../../utils/validateBody';
import { validateBody } from '../../utils/validateBody';
//import { validateUserData } from '../../utils/validations';



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
    const { name, lastName, password, email } = body;

    try {
    //console.log(body)
    //console.log(file)
    res.send('register')

    } catch (error) {
      // res.status(400).json({
      //   ok: false,
      //   error: "Error al identificar al usuario",
      //   ref: "email",
      // });
    }

    // try {
    //   const salt = bcrypt.genSaltSync();
    //   const newUser = new User({
    //     name,
    //     lastName,
    //     email,
    //   });
    //   if (files && files.image) {
    //     try {
    //       const imageUrl = await cloudinary.uploader.upload(
    //         files.image.tempFilePath,
    //         { folder: "users" }
    //       );
    //       newUser.image = imageUrl.secure_url;
    //     } catch {}
    //   } else {
    //     newUser.image = null;
    //   }
    //   newUser.password = bcrypt.hashSync(password, salt);
    //   await newUser.save();
    //   res.json({
    //     ok: true,
    //   });
    // } catch (error) {
    //   console.log("error", error);
    //   res.status(400).json({
    //     ok: false,
    //     error: "Error en la creación del usuario",
    //     ref: "email",
    //   });
    // }
  },
};