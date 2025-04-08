import { z } from "zod";

// Define the Zod schema for a single todo item
const todoItemSchema = z.object({
    title: z.string().describe("The content/title of the todo item"),
    // priority: z.enum(["low", "medium", "high"]).optional().describe("Optional priority of the todo"),
    // dueDate: z.string().datetime().optional().describe("Optional due date in ISO 8601 format"),
    // tags: z.array(z.string()).optional().describe("Optional list of tags")
});

// Define the schema for the tool input
export const addTodoSchema = z.object({
    todos: z.array(todoItemSchema).describe("List of todos to add")
});

// const aiTools = {
//     addTodo: tool({
//         description: "Add one or more todo items with optional priority, due date, or tags.",
//         parameters: addTodoSchema,
//         execute: async ({ todos }) => {
//             console.log("Received todos:", todos);
//             await createTodo(todos[0].title, userId as string);
//             return {
//                 success: true,
//                 message: `${todos.length} todo(s) added successfully!`
//             };
//         }
//     })
// }