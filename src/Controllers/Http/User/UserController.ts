import { Request, Response } from "express";

import { results } from "./user.json";
import Connection from "../../../config/database/connection";
import Ajv from "ajv";
import { schema } from "./schema";

const ajv = new Ajv({ allErrors: true });

export default {
  root(req: Request, res: Response) {
    return res
      .status(200)
      .json({ message: "REST Fullstack Challenge 20201209 Running" });
  },

  async index(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;

      if (!page || page === "" || !limit || limit === "")
        return res.status(200).json({
          message: "Informe a página e o limite da busca.",
        });

      let result = [];

      const user = await Connection("users").select("*");

      let parseUser = [];

      for (let index = 0; index < user.length; index++) {
        parseUser.push(JSON.parse(user[index]["json_user"]));
      }

      let totalPage = Math.ceil(parseUser.length / Number(limit));

      let count = Number(page) * Number(limit) - Number(limit);

      let delimiter = count + Number(limit);

      if (Number(page) <= totalPage) {
        for (let i = count; i < delimiter; i++) {
          if (parseUser[i] != null) {
            result.push(parseUser[i]);
          }
          count++;
        }
      }

      return res.status(200).json({
        "actual page": Number(page),
        "items per page": Number(limit),
        "total pages": totalPage,
        users: result,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: error, message: "Registration failed" });
    }
  },

  async store(req: Request, res: Response) {
    try {
      results.map(async (element, index) => {
        const user = await Connection("users").insert({
          json_user: JSON.stringify({ ...element, id: index + 1 }),
        });
      });
      // const user = await Connection("users").insert({ json_user: results[0] });

      return res.status(200).json({
        message: "successfully registered",
        // user: user,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: error, message: "Registration failed" });
    }
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await Connection("users").where("id", id);

    if (user.length === 0)
      return res.status(200).json({
        message: "usuário não encontrado!",
      });

    let userObj = {
      id: user[0].id,
      infos: JSON.parse(user[0]["json_user"]),
    };

    return res.json(userObj);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    if (!id || id === "")
      return res.status(200).json({
        message: "Informe o id do usuário.",
      });

    const user = await Connection("users").where("id", id);

    if (user.length === 0)
      return res.status(200).json({
        message: "usuário não encontrado!",
      });
    try {
      const validate = ajv.compile(schema);

      const valideData = {
        first: data.name.first,
        last: data.name.last,
        email: data.email,
        gender: data.gender,
        birth: data.dob.date,
        phone: data.phone,
        nat: data.nat,
        street: data.location.street.name,
        number: data.location.street.number,
      };

      if (validate(valideData)) {
        await Connection("users")
          .where("id", id)
          .update({ json_user: JSON.stringify(data) });
        return res.status(200).json({ message: "Updated register" });

        // res.status(200).json({
        //   data: data,
        // });
      } else {
        let err: any = validate.errors;
        let errorMessage = {
          field: err[0].instancePath,
          message: err[0].message,
        };

        res.status(200).json({
          error: errorMessage,
        });
      }
    } catch (error) {
      return res.status(400).json({ error: error, message: "Updated failed" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || id === "")
      return res.status(200).json({
        message: "Informe o id do usuário.",
      });

    const user = await Connection("users").where("id", id);

    if (user.length === 0)
      return res.status(200).json({
        message: "usuário não encontrado!",
      });

    try {
      await Connection("users").where("id", id).del();

      return res.status(200).json({ message: "Delete register" });
    } catch (error) {
      return res.status(400).json({ error: error, message: "Delete failed" });
    }
  },
};
