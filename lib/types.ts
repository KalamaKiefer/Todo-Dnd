export type TodoType = {
    id: string;
    status: "todo" | "in-progress" | "done";
    text: string;
};

export type ListType = {
    title: string;
    todos: Array<TodoType>;
    listId: "todo" | "in-progress" | "done";
};
