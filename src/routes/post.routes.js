import postCtrl from "../controllers/post.controller.js";
import { authClient } from "../middleware/auth.js";
import { upload } from "../middleware/imgUpload.js";
import { postValidSchema } from "../validSchemas/postValid.js";

// Corregir el error de middleware
const middleware = (req, reply, done) => {
    authClient(req, reply, done);
}

export const postRoutes = (fastify, opts, done) => {
    fastify.get("/", {preHandler: [middleware]},postCtrl.list);
    fastify.get("/user", {preHandler: [middleware]},postCtrl.listWithLogin);
    fastify.get("/:id",{preHandler: [middleware]}, postCtrl.listOne);
    fastify.delete("/:id",{preHandler: [middleware]}, postCtrl.delete);
    fastify.put("/:id",{schema: postValidSchema, preValidation: [middleware, upload.single("img")]}, postCtrl.update);
    fastify.post("/",{schema: postValidSchema, preValidation: [middleware, upload.single("img")]}, postCtrl.add);

    done();
}

