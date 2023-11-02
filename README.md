# Shinier -  Your One Stop for Collecting the Coolest and Rarest Pokemon Cards

## Table of Contents

1. [App Description](#App_-Description)
2. [Technologies](#Technologies)
3. [Project Planning](#Project-Planning)
4. [App Functionality](#App-Functionality)
5. [Deployment](#Deployment)
6. [Key Challenges](#Key-Challenges)
7. [Future Developments](#Future-Developments)
   
## App Description

Shinier is a mock-up of an e-commerce app for buying Pokemon Cards built using the MERN stack. It comes with the usual functions you would expect in an e-commerce app, such as search functionality, as well as being able to select specific items to checkout and buy. Currently, the app does not simulate the payment process and the order is considered as paid once the user confirms the checkout.

## Technologies

- **FrontEnd**: ReactJS, DaisyUI & Tailwind CSS
- **BackEnd**: Mongoose, Express, Node.js
- **Database**: MongoDB
- **APIs**: Pokemon TCG API
- **Others**: JWT for authentication

## Project Planning
- **WireFrame (MIRO)**: The development process for Shinier began with outlining key user stories to define the app's functionality and user experience. To visualize the app's design, we used  [MIRO](https://miro.com/app/board/uXjVNYureLA=/?share_link_id=905209158447) to create our wireframes. These wireframes served as a guiding framework on how to position and style each page in the app. Entity Relationship Diagrams (ERDs) were also included to map out the relationships between different data entities within Shinier.

- **Trello Board**: Planning and visualization process laid the groundwork for the TravelLog app's development. To further ensure that the team is on the right track, we utilised the [TrelloBoard](https://trello.com/b/1hVa8cQM/shinier) to efficiently track the team's progress.

## App Functionality 

User
### (Login/Sign Up --> Search for Cards --> Add Desired Cards to Cart --> Review and edit card quantity in cart --> Checkout)

Admin
### (Login --> View Item inventory --> Add new items to inventory)
   
## Deployment
The app is deployed on Render, and you can access it here.
[Shinier](https://shinier.onrender.com/)

## Key Challenges
- I initially wanted the app to have more features, such as having a favourites function, as well as for users to be able to leave reviews. However, due to scope creep, I was unable to incorporate these features into the app.
- I took some time to understand and utilize mongoose virtuals. I encountered some issues when using virtuals with references, because the references has to be populated first before the virtuals will work correctly.
- Encountered some issues when trying to shift the position of the searchbar from the centre in the App Landing page, to inside the Navbar for all the other pages

## Future Developments (User)
- **View Cards by Sets**: Allow users to view cards by sets
- **Advanced filters for search results**: Allow users to filter search results by set, card type, pokemon type, as well as rarity
- **Sort functionality for search results**: Allow users to sort search results by alphabetical order or price
- **Favourites**: Allow users to favourite specific cards of their choice
- **Cart quantity selection**: Allow users only select from the dropdown from 1 up to the maximum number of a particular card in stock
- **Integrate payment method**: Integrate a payment method such as Stripe which has test numbers to simulate paying for the items.

## Future Developments (Admin)
- **Edit inventory item**: Allow admin to edit entries in the item inventory, such as available stock
- **Delete inventory item**: Allow admin to delete a specific item in the inventory
- **Order DashBoard**: Allows admin to view the status of all orders, and to filter by order status or userId.

