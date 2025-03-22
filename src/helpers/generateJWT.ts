import jwt from "jsonwebtoken";

export const generateJWT = async (uid: string ): Promise<string> => {
    return new Promise((resolve, reject) => {
      // const payload: { uid: string } = { uid };
      // console.log("uid",uid)
      // console.log(payload)
      //jwt.sign({_id:}, process.env.SECRETORPRIVATEKEY as string,{expiresIn: "7d"}) 
      jwt.sign(
        {_id:uid},
        process.env.SECRETORPRIVATEKEY as string,
        {
          expiresIn: "24h",
        },
        (err: Error | null, token: string | undefined) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el token");
          } else {
            resolve(token as string);
          }
        }
      );
    });
};
export const generateRefreshJWT = async (uid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // const payload: { uid: string} = { uid };
      // console.log("uid",uid)
      // console.log(payload)
      jwt.sign(
        {_id:uid},
        process.env.SECRETORPRIVATEKEY as string,
        {
          expiresIn: "7d",
        },
        (err: Error | null, token: string | undefined) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el token");
          } else {
            resolve(token as string);
          }
        }
      );
    });
};