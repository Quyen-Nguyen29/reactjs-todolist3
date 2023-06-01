
import { completed, unCompleted, all } from '../variables/variable'

export default function Filter({ filter,setFilter }) {

   const setFilterOptionValue=(key,value)=>{
    setFilter({...filter,[key]:value})
   }
   

    return (

        <form>
            <div className="select-wrapper" style={{display:"flex"}}>
                <input type="text"  placeholder="Please input your search"  onKeyUp={(e)=>setFilterOptionValue("text",e.target.value)} />
                <select name="options" id="options" onChange={(e)=> setFilterOptionValue("status",e.target.value)}  >
                    <option value={all}>All</option>
                    <option value={completed}>Completed</option>
                    <option value={unCompleted}>Uncompleted</option>

                </select>

            </div>

        </form>

    )

}