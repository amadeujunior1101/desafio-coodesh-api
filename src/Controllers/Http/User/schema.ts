import { JSONSchemaType } from "ajv";
import { User } from "./types";

const schema: JSONSchemaType<User> = {
  type: "object",
  required: ["gender", "first", "last", "email", "nat"],
  properties: {
    first: { type: "string", nullable: false, minLength: 4 },
    last: { type: "string", nullable: false, minLength: 4 },
    email: { type: "string", nullable: false, minLength: 4 },
    gender: { type: "string", nullable: false, minLength: 4 },
    birth: { type: "string", nullable: true },
    phone: { type: "string", nullable: true },
    nat: { type: "string", nullable: false, minLength: 2 },
    street: { type: "string", nullable: true },
    number: { type: "number", nullable: false },
  },
  maxProperties: 9,
  additionalProperties: false,
};

export { schema };
