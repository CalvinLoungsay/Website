import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'


interface TodoFormProp {
    addTodo: (title: string) => void
}

export function NewTodoForm({ addTodo }: TodoFormProp) {

    const [newItem, setNewItem] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()


        if (newItem === "") return

        addTodo(newItem)

        setNewItem("")
    }

    return (<>
        <Row>
            <form
                onSubmit={handleSubmit}
                className="new-item-form justify-content-center d-flex">
                <div className = "mb-3">
                    <input
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        type="text"
                        id="item"
                        className="newTodoField" />
                    <button type="submit" className = "addBtn"><h5 className = "addBtnText">Add</h5></button>
                </div>
            </form>
        </Row>
    </>
    )
}