import userCtrl from "../controllers/user.controller.js";
import { userValidSchema } from "../validSchemas/userValid.js";

export const userRoutes = (fastify, opts, done) => {
    fastify.post("/register", {schema: userValidSchema} ,userCtrl.register);
    fastify.post("/login", userCtrl.login);

    done();
}