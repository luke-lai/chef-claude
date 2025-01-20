import React from 'react';
import IngredientsList from './IngredientsList';
import ClaudeRecipe from './ClaudeRecipe';
import { getRecipeFromChefClaude } from '../ai';

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState('');

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get('ingredient');
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            newIngredient
        ]);
    }
    function removeIngredient(ingredientToRemove) {
        setIngredients((prevIngredients) =>
            prevIngredients.filter(
                (ingredient) => ingredient !== ingredientToRemove
            )
        );
    }

    return (
        <main>
            <form action={addIngredient} className='add-ingredient-form'>
                <input
                    type='text'
                    placeholder='e.g. oregano'
                    aria-label='Add ingredient'
                    name='ingredient'
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length < 4 && (
                <p className='form__info'>
                    Please, add at least four ingredients to generate a recipe.
                </p>
            )}
            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={removeIngredient}
                />
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}
