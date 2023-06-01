import TodoItem from './TodoItem';


export default function TodoList({ todos, handlingDeleteTodo, toogleTodoStatus, handlingOpenEditPopUp,setTodo }) {

    return (

        <ul>
            {
                todos.map((todo, i) => {
                    return (
                        <TodoItem key={i} todo={todo}
                            setTodo={setTodo}
                            handlingDeleteTodo={handlingDeleteTodo}
                            toogleTodoStatus={toogleTodoStatus}
                            handlingOpenEditPopUp={handlingOpenEditPopUp} />
                    )
                })
            }

        </ul>

    )

}