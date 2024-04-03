import { createTodo, LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE, loadTodoInProgress, loadTodoSuccess, loadTodoFailure, REMOVE_TODO, markTodoAsCompleted } from "./actions"; // Import REMOVE_TODO action type

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodoInProgress());

        // Perform async operations, such as fetching data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const todos = await response.json();

        dispatch(loadTodoSuccess(todos));
    } catch (error) {
        dispatch(loadTodoFailure(error));
    }
};

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e.message));
    }
};

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to remove todo');
        }
        // Dispatch REMOVE_TODO action with the id as payload
        dispatch({ type: REMOVE_TODO, payload: { id } });
    } catch (e) {
        dispatch(displayAlert(e.message));
    }
}

export const markTodoAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'POST'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => {
    alert(text);
}
