


export default function Popup({ todo, setTodo,handleUpsert}) {
    const setValue=(e)=>{
        // e.preve
        setTodo({...todo,text:e.target.value})
    }
    return (
        <div className={`popup showed"`}>
            <div className={`popup-container showed`} >
                <span className="close-btn" onClick={() => setTodo(null)}>x</span>
                <div className="popup-content">
                    <label>{ todo.id ? "Edit":"Add"} the todo</label>
                    <input type="text" value={todo.text} onChange={(e) => setValue(e)} />
                    <button onClick={() => handleUpsert()} >{ todo.id ? "Edit":"Add"}</button>
                </div>
            </div>


        </div>

    )

}