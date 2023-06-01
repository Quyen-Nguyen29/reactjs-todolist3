import { unCompleted } from './../variables/variable'
export default function Form({ setTodo }) {

    const handlingClickSubmit = (e) => {
        e.preventDefault();
        setTodo({ text: "", status: unCompleted })
    }

    const onChange = (e) => {
        e.preventDefault();
        setTodo({ text: e.target.value, status: unCompleted })
    }

    return (

        <form>
            {/* <input type="text" value={todo?.text} placeholder="Please insert your todo" onChange={(e) => onChange(e)} /> */}
            <button type="submit" onClick={(e) => handlingClickSubmit(e)}> Add </button>
        </form>

    )

}