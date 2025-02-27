import { Router } from "express";

const router = Router();

export default () => {
    router.get("/healt", (req, res) => {
        res.send("Api is Healthy!!!");
    });

    return router;
};