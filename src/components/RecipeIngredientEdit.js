import React from 'react'

export default function RecipeIngredientEdit(props) {

    const {
        ingredient,
        handleIngredientChange,
        handleIngredientDelete
    } = props
    
    function handleChange(changes) {
        handleIngredientChange(ingredient.id, {...ingredient, ...changes})
    }

    return (
        <>
            <input
                type="text"
                className="recipe-edit__input"
                onChange={(e)=> {handleChange({name: e.target.value})}}
                value={ingredient.name}
            />
            <input
                type="text"
                className="recipe-edit__input"
                onChange={(e)=> {handleChange({amount: e.target.value})}}
                value={ingredient.amount}/>

            <button
                className="btn btn--danger"
                onClick={() => handleIngredientDelete(ingredient.id)}
            >
                &times;
            </button>
        </>
    )
}
