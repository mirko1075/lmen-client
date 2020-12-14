# LMeN Confeccions

![logo](https://res.cloudinary.com/mirko1075/image/upload/v1607239517/logotipo1_qg8ebg.jpg)

## Description

LM&N confessions website is a small e-commerce website that allows a small craftmen company in Brasil to reach customers worldwide and sell their products online

## User Stories - MVP - FRONTEND

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault 🔑
- **Sign Up** -As a anon/user I want to sign up quickly and get in there, and be automatically logged in 🔑
- **Log In** - As a anon/user I want to be able to login, riderected to the homepage and see my personal data and configuration. 🔑
- **Log Out** - As a user I want to login and get redirected to the homepage. 🔑
- **User Profile** - As users, we want to be able to edit our profiles whenever we need it. Here we will have our personal information, a profile picture, products in favourites chek the shopping card, keep on shopping and checkout. 🔑
- **Homepage** - As a user, I want to check the LM&N marketplace with last products and offers 🏠
- **Product research** - As a user I want to search for products inside the marketplace. 🔎
- **Product list**- A a user I want to see all the products categorized and searchable 📋
- **Product detail** - A user I want to see the product detail, with different angles pictures and add it to the shopping cart
- **Reviews** - As user I want to write/delete and see Product's reviews in the Product detail ✍️
- **Shopping cart** - As a user I want to be able to pick up a product and add it to shopping bag and choose color and quantity 🛍️
- **Contact page** - A user I want to contact the seller through a contact form
- **About page** - As user I want to see the About the company news and story

## User Stories - MVP - BACKEND

- **Sign Up** -As a user I want to sign up quickly and get in there, and be automatically logged in 🔑

- **Log In** - As a user I want to login and get redirected to the homepage. 🔑

- **Log Out** - As a user I want to log out and get redirected to the homepage. 👋

- **List all products** - As user, i want to list all products and select a product to see the product details

- **Get product details** - As user, i want to see the product details of a selected product

- **Add product to cart** - As user, I want to add to cart the selected product

- **Remove product from cart** - As user, I want to remove from cart a selected product

- **Get the shopping cart** - As user I want to get my personal shopping cart

## Server Routes (back-end)

| **Route**                         | **Method** | **Description**                                                             | **Request - Body**                                                                                                                                          |
| --------------------------------- | ---------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/auth/signup`                    | `POST`     | Check if username exists and if not registers the user and returns a cookie | {firstName, lastName, address, country, cap, city, province, telephone, birthDay, birthMonth, birthYear, email, username, password, email, repeat password} |
| `/auth/login`                     | `POST`     | Check if username exists and if finds it returns a cookie                   | {username, password}                                                                                                                                        |
| `/auth/logout`                    | `GET`      | Logges user out and redirects to `login` page.                              |                                                                                                                                                             |
| `/auth/me`                        | `GET`      | Gets the user obj                                                           |                                                                                                                                                             |
| `/api/products/`                  | `GET`      | Private route, get the products list.                                       |                                                                                                                                                             |
| `/api/products/:productId`        | `GET`      | Private route, get the product detail                                       |                                                                                                                                                             |
| `/api/cart`                       | `GET`      | Private route, returns the shopping cart array                              |                                                                                                                                                             |
| `/api/cart/`                      | `POST`     | Create/modify/overwrite the shopping cart                                   |                                                                                                                                                             |
| `/api/product/:productId/reviews` | `POST`     | Add review for the selected product                                         |                                                                                                                                                             |
| `/api/product/:productId/reviews` | `GET`      | Delete review for the selected product                                      |                                                                                                                                                             |
| `/api/checkout`                   | `GET`      | ???                                                                         | NOT SURE                                                                                                                                                    |
| `/api/payment`                    | `GET`      | ???                                                                         | NOT SURE                                                                                                                                                    |

**Services**

# Client / Frontend

## React Router Routes (React App)

| Path                   | Component                                      | Permissions | Behaviour                                                                                                                                                   |
| ---------------------- | ---------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                    | HomePage                                       | Anon/auth   |                                                                                                                                                             |
| `/login`               | LoginPage                                      | Anon        | {firstName, lastName, address, country, cap, city, province, telephone, birthDay, birthMonth, birthYear, email, username, password, email, repeat password} |
| `/signup`              | SignupPage                                     | Anon        |                                                                                                                                                             |
| `/about`               | About                                          | Anon        |                                                                                                                                                             |
| `/contact`             | Contact                                        | Anon        |                                                                                                                                                             |
| `/private/profile`     | userProfile                                    | Auth        |                                                                                                                                                             |
| `/private/editProfile` | EditProfile                                    | Auth        |                                                                                                                                                             |
| `/products/`           | Private route, renders productList component   | Anon/Auth   |                                                                                                                                                             |
| `/products/:productId` | Private route, renders productDetail component | Anon/Auth   |                                                                                                                                                             |
| `/private/cart`        | Private route, shows shoppingCart              | Auth        |                                                                                                                                                             |
| `/private/favourites`  | Private route, shows favouritesList            | Auth        |                                                                                                                                                             |
| `/products/reviews`    | Show productsReviews                           | Anon/Auth   |                                                                                                                                                             |

##

## Models

USERS

```
{
  firstName: String,
  lastName: String,
  email: {type: String, unique: true },
  role: {type: String, default: "user" },
  phoneNumber: String,
  gender: {String, enum: ["Male", "Female", "Other"]},
  birthDateDay: Number,
  birthDateMonth: Number,
  birthDateYear: Number,
  address: String,
  country: String,
  city: String,
  state: String,
  CP: String,
  username: String,
  password: String,
  basket: [{ type: Schema.Types.ObjectId, ref: ‘Product’ }],
  shoppingHistory: [{ type: Schema.Types.ObjectId, ref: ‘Product’ }],  //ADD
  favofavouritesrites:[{ type: Schema.Types.ObjectId, ref: ‘Product’ }],
  reviews: [{ type: Schema.Types.ObjectId, ref: ‘Review’ }],
}
, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
```

PRODUCTS

```
{
  name: String,
  description: String,
  materials: [{type: String }],
  category: {String, enum: ["Wallets man","Wallets woman", "Bags man","Bags woman","Passport case","Dog leashes"]},
  price: Number,
  pics: String,
  review: : [{ type: Schema.Types.ObjectId, ref: ‘Review’ }],
}
, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
```

REVIEWS

```
{
  title: String,
  description: String,
  rate: [{type: Number, min: 1, max: 5 }],
  reviewUser: [{ type: Schema.Types.ObjectId, ref: ‘User’ }],
  reviewProduct: [{ type: Schema.Types.ObjectId, ref: ‘Product’ }],
}
, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
```

## Backlog - FRONTEND

- **Checkout page** - As a user I want to be able to complete the buy process and checkout paying by Paypal or Credit card by Stripe 💪

## Backlog - BACKEND

- **Create/Modify / delete products** - As seller, we want to be able to edit our profiles whenever we need it. Here we will have our personal information, a profile picture, products in favourites chek the shopping card, keep on shopping and checkout. 🥊
- **Create/Modify/delete offers** - A a seller I want to see all the products categorized and searchable
- **Add/remove offers to products**- A seller I want to see the product detail, with different angles pictures and add it to the shopping cart
- **Enable upload multiple pictures for each product**

## Links

#### Git

[Repository Link](https://github.com/mirko1075/Aora)

[Deploy Link](https://why-so-serial.herokuapp.com/)

#### Trello

[Our Trello board](https://trello.com/b/yAu4Puzc/aora)

#### Slides

[Our slide show](https://docs.google.com/presentation/d/1rhgCc_YME-1Z9I68bBdCm8Mg-atVrasFP5CgQL9745M/edit?usp=sharing)

#### Figma

[Wireframes](https://www.figma.com/file/6HSnPmmt9bQyLpb7mZVKrb/Untitled?node-id=2%3A757)
