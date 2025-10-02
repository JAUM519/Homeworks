import { useState } from "react"
import { CategoriesList } from "./Challenge 4 Son.jsx"

export const ComponentApp = () => {
    const [categories, setCategories] = useState(["firts category", "second category"])
    const [category, setCategory] = useState("")

    const handleInputChange = (event) => {
        setCategory(event.target.value)
    }

    const handleAddCategory = () => {
        if (category.trim() !== "") {
            setCategories([...categories, category])
            setCategory("")
        }
    }

    return (
        <>
            <h1>Challenge 4</h1>
            <input
                type="text"
                value={category}
                onChange={handleInputChange}
                placeholder="Add category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
            <CategoriesList categories={categories} />
        </>
    )
}