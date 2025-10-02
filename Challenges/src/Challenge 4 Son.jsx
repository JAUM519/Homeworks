export const CategoriesList = ({ categories }) => (
    <ol>
        {categories.map((category, key) => (
            <li key={key}>{category}</li>
        ))}
    </ol>
)