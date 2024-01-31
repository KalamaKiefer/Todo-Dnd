export const reorder = <T>({
    list,
    startIndex,
    endIndex,
}: {
    list: Array<T>;
    startIndex: number;
    endIndex: number;
}) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const move = <T>({
    sourceTodos,
    destinationTodos,
    sourceIndex,
    destinationIndex,
}: {
    sourceTodos: Array<T>;
    destinationTodos: Array<T>;
    sourceIndex: number;
    destinationIndex: number;
}) => {
    const sourceClone = Array.from(sourceTodos);
    const destClone = Array.from(destinationTodos);
    const [removed] = sourceClone.splice(sourceIndex, 1);

    destClone.splice(destinationIndex, 0, removed);

    return { sourceTodos: sourceClone, destinationTodos: destClone };
};
