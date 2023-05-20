
import './app.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import Popup from './components/Popup';
import Search from './components/Search';
import Filter from './components/Filter';

import React, { useState, useEffect } from 'react';
import { completed, unCompleted, all } from './variables/variable'

/**
 ********** Feedback:********
 *  1 search vơi filter sẽ là 1 object ví dụ có sau này có nhiêu thứ để filter hơn thì sao. ví dụ {ttext:"",status:"",category:"",type:""} 
  hoặc nhiều hơn nữa.k lẽ mỗi 1 cái là 1 hàm.v 6 ccái thì phải tạo 6 function. k ổn.gom thành 1 function.
  hàm edit cũng z. e thấy c đang truyền mỗi cái text len.giờ nếu e muốn thêm status type category thì sao hoắc nhiều hơn nữa.
  1 cái form có thể có cả 20 fields. k lẽ cái hàm gồm 20 tham số. nên là gom về 1 objetc thôi. qui về object hết.
  create vs edit sẽ sài chung cái object la [todo,setTodo]=useSatte({}) khi edit thì todo sẽ có id, còn add thì k có id
 ********** Feedback:********
 * ********** Todo********
 * 1.hàm edit todo: thay đổi parameter la 1 object thay vì chỉ truyền text như hiện tại
 * 2.hàm dùng handling click add item và hàm handling click add edit  todo có thể gộp lại làm 1 ( truyền object)--> khi edit thì todo sẽ có id, còn add thì k có id
 * 3.hàm 1 search vơi filter đổi parameter là 1 object
 *
 * ********** Relize********
 * Function có process tương tự nhau có thể dùng chung 1 function, chỉ cần truyền parameter khác nhau.
 */


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

  }, [])


  /// save todo to localstorage
  useEffect(() => {
    if (todos.length !== 0) {
      // checks if the array is empty and if not it saves to localStorage.
      localStorage.setItem('todos', JSON.stringify(todos));
    }

  }, [todos]);


  //////////////////////////////////////////
  //get input text value
  const getInputValue = (e) => {
    setInputText(e.target.value)
  }
//get input text value
  const getEditPopUpValue = ({ textInput }) => {
    setInputTextPopup(textInput)

  }

  
  //handling get search value
  const gettingSearchTodoValue = (searchText) => {
    setSearchTerm(searchText)

  }

   //handling get filter value //all- completed -uncompleted
   const gettingFilterOptionValue = (optionFilter) => {
    setFilterStateValue(optionFilter)

  }


  //handling click add item 
  const handlingAddItem = ({ id, textInput }) => {
  
    // click add edit  todo
    if (id) {
      if (inputTextPopup === "") {
        alert("Please type your todo ")
        return
      }
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, "text": inputTextPopup }
          }
          return todo
        })
      )
      setShowPopup(false)
    }

    // click add new  todo
    if (textInput && !id) {
      if (textInput === "") {
        alert("Please type your todo ")
        return
      }
      setTodos([...todos, { 'id': todos.length + 1, "text": textInput, "status": unCompleted }])
      setInputText('');
    }

  }


  //handling delete item 
  const handlingDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => {
      return (todo.id !== todoId)
    }))

  }
  //handling toogle todo status
  const toogleTodoStatus = (todoId) => {

    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return ({ ...todo, "status": todo.status === unCompleted ? completed : unCompleted })

      }
      return todo
    }))
  }

  //handling open editpopup
  const handlingOpenEditPopUp = (todo) => {
    setShowPopup(true)
    setTodo(todo)
    setInputTextPopup(todo.text)

  }


  //handling get filter value //all- completed -uncompleted
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
          getEditPopUpValue={getEditPopUpValue}
          handlingAddItem={handlingAddItem}
          setShowPopup={setShowPopup}
          showPopup={showPopup} />

        <Search gettingSearchTodoValue={gettingSearchTodoValue} />
        <Filter gettingFilterOptionValue={gettingFilterOptionValue} />




      </div>



    </div>
  );
}

export default App;
