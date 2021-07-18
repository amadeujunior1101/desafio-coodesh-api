import { Router } from "express";
import UserController from "./Controllers/Http/User/UserController";

var routes = Router();

routes.get("/", UserController.root);

//Inseri 01(um) novo usuário
routes.post("/users", UserController.store);

//busca todos os usuários
routes.get("/users", UserController.index);

//busca 01(um) usuário por id
routes.get("/users/:id", UserController.show);

//Atualiza 01(um) usuário pelo id
routes.put("/users/:id", UserController.update);

//Deleta 01(um) usuário pelo id
routes.delete("/users/:id", UserController.delete);

export default routes;
