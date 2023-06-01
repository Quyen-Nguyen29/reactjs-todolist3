
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
 * 3.hàm 1 search vơi filter đổi parameter là 1 object --> ko hiểu, Hiện tại todo là 1 object
 * 
 * 
 * *******
 * todosUI Đáng ra nó phải dc trigger Trong fucn set lại filter state Khi filter state thay đổi Chị mới gọi hàm filter

 *
 * ********** Relize********
 * Function có process tương tự nhau có thể dùng chung 1 function, chỉ cần truyền parameter khác nhau.
 */


function App() {
  //State
  const [rootTodos, setRootTodos] = useState([])
  const [todos, setTodos] = useState([])
  // const [inputText, setInputText] = useState('')
  // const [inputTextPopup, setInputTextPopup] = useState('')
  const [todo, setTodo] = useState(null)
  // const [showPopup, setShowPopup] = useState(false)
  // const [searchTerm, setSearchTerm] = useState('')
  // const [filterStateValue, setFilterStateValue] = useState(all)
  const [filter, setFilter] = useState({ "text": "", "status": all, pageSize: 5, pageNumber: 1 }) //  Tên state ngắn thôi


  //Function

  /// save todo from localstorage
  useEffect(() => {
    // const savedData = JSON.parse(localStorage.getItem('todos'));
    // if (savedData) {
    //   setTodos(savedData)

    // }
    if (filter?.text == "" && (filter?.status == "" || filter.status == all)) {
      setTodos(rootTodos)
      return
    }
    let todosClone = rootTodos.filter((val) => {
      let validityState = val?.text.toLocaleLowerCase().includes(filter.text.toLocaleLowerCase())
      if (filter?.status != all) {
        validityState = validityState && val?.status == filter?.status
      }
      return validityState
    })

    setTodos(todosClone)

  }, [filter, rootTodos])


  /// save todo to localstorage
  useEffect(() => {
    if (todos.length !== 0) {
      // checks if the array is empty and if not it saves to localStorage.
      // localStorage.setItem('todos', JSON.stringify(todos));
    }

  }, [todos]);


  //////////////////////////////////////////
  // //get input text value
  // const getInputValue = (textInput) => {
  //   setInputText(textInput)
  // }
  // //get input text value
  // const getEditPopUpValue = ({ textPopupInput }) => {
  //   setInputTextPopup(textPopupInput)

  // }

  // //handling get search value
  // const gettingSearchTodoValue = (searchText) => {
  //   setSearchTerm(searchText)

  // }

  // //handling get filter value //all- completed -uncompleted
  // const gettingFilterOptionValue = (optionFilter) => {
  //   setFilterStateValue(optionFilter)
  // }

  ////////////////// cách tạo 1 function getvalue để dùng chung ko đc why??

  // const setValue = ({ textInput, textPopupInput, searchText, optionFilter }) => {
  //   if (textInput) {
  //     setInputText(textInput)
  //   }

  //   if (textPopupInput) {
  //     setInputTextPopup(textPopupInput)
  //   }

  //   if (searchText) {
  //     setSearchTerm(searchText)
  //   }

  //   if (optionFilter) {
  //     setFilterStateValue(optionFilter)
  //   }

  // }


  //handling click add item 
  // const handlingAddItem = ({ id, textInput }) => {

  // click add edit  todo
  // if (id) {
  //   if (inputTextPopup === "") {
  //     alert("Please type your todo ")
  //     return
  //   }
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, "text": inputTextPopup }
  //       }
  //       return todo
  //     })
  //   )
  //   setShowPopup(false)
  // }

  // // click add new  todo
  // if (textInput && !id) {
  //   if (textInput === "") {
  //     alert("Please type your todo ")
  //     return
  //   }
  //   setTodos([...todos, { 'id': todos.length + 1, "text": textInput, "status": unCompleted }])
  //   setInputText('');
  // }

  // }


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
  // const handlingOpenEditPopUp = (todo) => {
  //   // setShowPopup(true)
  //   // setTodo(todo)
  //   // setInputTextPopup(todo.text)

  // }

  const handleUpsert = () => {
    if (!todo) {
      return
    }
    if (!todo.id) {
      setTodos([...todos, { ...todo, 'id': todos.length + 1, }])
      setRootTodos([...todos, { ...todo, 'id': todos.length + 1, }])
      setTodo(null)
      return
    }
    let index = todos.findIndex((val) => {
      return val.id == todo.id
    })
    if (index < 0) {
      return
    }
    let todosClone = todos
    todosClone[index] = { ...todosClone[index], ...todo }
    setTodos(todosClone)
    setRootTodos(todosClone)
    setTodo(null)
  }


  //handling data filter todo
  // const todosUI = todos.filter(todo => {

  //   if (filterStateValue === unCompleted) {
  //     return todo.status === unCompleted;
  //   }
  //   else if (filterStateValue === completed) {
  //     return todo.status === completed;
  //   }
  //   else {
  //     return true;
  //   }
  // }).filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));



  return (
    <div className="App">
      <div className="container">
        <h1> Todo list</h1>
        <Filter setFilter={setFilter} filter={filter} />

        <Form setTodo={setTodo} />
        <TodoList todos={todos}
          handlingDeleteTodo={handlingDeleteTodo}
          toogleTodoStatus={toogleTodoStatus}
          // handlingOpenEditPopUp={handlingOpenEditPopUp}
          setTodo={setTodo}
        // todosUI={todosUI} 
        />
        {
          todo && <Popup todo={todo} setTodo={setTodo} handleUpsert={handleUpsert} />
        }
        {/*         
          // inputTextPopup={inputTextPopup}
          // getPopupValue={getEditPopUpValue}
          // handlingAddItem={handlingAddItem}
          // setShowPopup={setShowPopup}
          // showPopup={showPopup}  */}


        {/* <Search /> */}




      </div>



    </div>
  );
}

export default App;
