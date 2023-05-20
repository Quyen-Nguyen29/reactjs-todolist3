
import './app.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import Popup from './components/Popup';
import Search from './components/Search';
import Filter from './components/Filter';

import React, { useState, useEffect } from 'react';
import { completed, unCompleted, all } from './variables/variable'


function App() {
  //State

  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')
  const [inputTextPopup, setInputTextPopup] = useState('')
  const [todo, setTodo] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStateValue, setFilterStateValue] = useState(all)




  //Function

  /// save todo from localstorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('todos'));

    if (savedData) {
      setTodos(savedData)

    }
    console.log("savedData", savedData)

  }, [])


  /// save todo to localstorage
  useEffect(() => {
    if (todos.length !== 0) {
      // checks if the array is empty and if not it saves to localStorage.
      localStorage.setItem('todos', JSON.stringify(todos));
    }

  }, [todos]);


  //////////////////////////////////////////
  const getInputValue = (e) => {
    setInputText(e.target.value)
  }

  const handlingAddItem = ({textInput}) => {
    if (textInput) {
      
      if (textInput === "") {
        alert("Please type your todo ")
        return
      }
      setTodos([...todos, { 'id': todos.length + 1, "text": textInput, "status": unCompleted }])
      setInputText('');
    }

  }

  const handlingDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => {
      return (todo.id !== todoId)
    }))

  }

  const toogleTodoStatus = (todoId) => {

    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return ({ ...todo, "status": todo.status === unCompleted ? completed : unCompleted })

      }
      return todo
    }))
  }

  const handlingOpenEditPopUp = (todo) => {
    setShowPopup(true)
    setTodo(todo)
    setInputTextPopup(todo.text)

  }

  const handlingEditPopUp = (textInput) => {
    setInputTextPopup(textInput)

  }

  const handlingAddEditPopUp = (todoId) => {

    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, "text": inputTextPopup }
        }
        return todo
      })
    )

    setShowPopup(false)
  }

  const gettingSearchTodoValue = (searchText) => {
    setSearchTerm(searchText)

  }

  const gettingFilterOptionValue = (optionFilter) => {
    setFilterStateValue(optionFilter)

  }


  const todosUI = todos.filter(todo => {

    if (filterStateValue === unCompleted) {
      return todo.status === unCompleted;
    }
    else if (filterStateValue === completed) {
      return todo.status === completed;
    }
    else {
      return true;
    }
  }).filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));










  return (
    <div className="App">
      <div className="container">
        <h1> Todo list</h1>

        <Form getInputValue={getInputValue} inputText={inputText} handlingAddItem={handlingAddItem} />
        <TodoList todos={todos}
          handlingDeleteTodo={handlingDeleteTodo}
          toogleTodoStatus={toogleTodoStatus}
          handlingOpenEditPopUp={handlingOpenEditPopUp}
          todosUI={todosUI} />

        <Popup todo={todo}
          inputTextPopup={inputTextPopup}
          handlingEditPopUp={handlingEditPopUp}
          handlingAddEditPopUp={handlingAddEditPopUp}
          setShowPopup={setShowPopup}
          showPopup={showPopup} />

        <Search gettingSearchTodoValue={gettingSearchTodoValue} />
        <Filter gettingFilterOptionValue={gettingFilterOptionValue} />




      </div>



    </div>
  );
}

export default App;
