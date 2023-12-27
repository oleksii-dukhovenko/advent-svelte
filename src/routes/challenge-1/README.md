# Svelte Challenge 1 Solution

This  is a solution to the first Svelte challenge. It fetches data from an API and renders a list of children on Santa's list.

## Challenges and Obstacles

- Fetching Data: One of the challenges I encountered was fetching data from the API. I used the `fetch` function to make an HTTP request to the API endpoint and then used the `response.json()` method to parse the JSON data.

- Handling Transitions: Another challenge was implementing transitions for the list items. I used the `svelte/transition` module to apply fade and fly transitions to the list items when they are added or removed from the list.

- Conditional Rendering: I needed to conditionally render the button based on certain criteria. I used the `showButton` variable to control the visibility of the button, and the `handleClick` function to handle the button click event.

## Code Structure

- `onMount`: The `onMount` function is used to fetch data from the API when the component is mounted.

- `children` and `filteredChildren`: These variables hold the list of children fetched from the API and the filtered list of children with a tally less than 50.

- Rendering: The component renders the children list using the `each` block and applies transitions to the list items. It also conditionally renders the filtered children list and the button.

For more details, please refer to the code block provided.
