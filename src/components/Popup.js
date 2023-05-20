


export default function Popup({ todo, inputTextPopup, getPopupValue, handlingAddItem, setShowPopup, showPopup }) {

    return (

        <div className={`popup ${showPopup ? "showed" : ""}`}>
            <div className={`popup-container ${showPopup ? "showed" : ""}`} >

                <span className="close-btn" onClick={() => setShowPopup(false)}>x</span>
                <div className="popup-content">
                    <label>Edit the todo</label>
                    <input type="text" value={inputTextPopup} onChange={(e) => getPopupValue(e.target.value)} />
                    <button onClick={() => handlingAddItem({"id":todo.id})} >Add</button>
                </div>
            </div>


        </div>

    )

}