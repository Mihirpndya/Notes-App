const zod = require("zod");
const createTodoSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateSchema = zod.object({
  _id: zod.string(),
  title: zod.string(),
  description: zod.string(),
});

const deleteSchema = zod.object({
  _id: zod.string(),
});

module.exports = {
  createTodoSchema: createTodoSchema,
  updateSchema: updateSchema,
  deleteSchema: deleteSchema,
};
