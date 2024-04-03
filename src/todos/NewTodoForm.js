import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addTodoRequest } from './thunk';
import { getTodos } from './selectors';

const FormContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
  display: flex;
`;

const TodoInput = styled.div`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
  cursor: pointer;
`;

const TodoButton = styled.div`
  font-sie: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;

const NewTodoForm = ({ onCreatePressed }) => {
  const [inputValue, setInputValue] = useState('');

  const handleCreateTodo = () => {
    const trimmedText = inputValue.trim();
    if (trimmedText) {
      onCreatePressed(trimmedText);
      setInputValue('');
    }
  };

  return (
    <FormContainer>
      <TodoInput
        placeholder='Type your new todo here'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        type="text"
      />
      <TodoButton
        onClick={handleCreateTodo}
      >
        Create Todo
      </TodoButton>
    </FormContainer>
  );
};

const mapStateToProps = state => {
  todos: getTodos(state);
}

const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
