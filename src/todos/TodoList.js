import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import styled from 'styled-components';
import { getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';
import { loadTodos, removeTodoRequest } from './thunk';
import { displayAlert, markTodoAsCompletedRequest } from './thunk';

const ListWrapper = styled.div`
max-width: 700px;
margin: auto;
`;

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, onDisplayAlertClicked, isLoading, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, [])
  const loadingMessage = <div>Loading...</div>
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete: </h3>
      {incompleteTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} onDisplayAlertClicked={onCompletedPressed} />)}
      <h3>Completed: </h3>
      {completedTodos.map(todo => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} onDisplayAlertClicked={onCompletedPressed} />)}
    </ListWrapper>
  )
  return isLoading ? loadingMessage : content
}

const mapStateToProps = state => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state)
})

const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
  onDisplayAlertClicked: () => dispatch(displayAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);