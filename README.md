## Online Store

This is the website for online computer store with a set of products to sell, currently with listing of _4 products_ available with _3 deals_ but there is an ability to add more products and pricing rules as needed.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The folder stucture has been revamped to organise components, pages and styles in separate folders for maintainability.

Follow this README for instructions on Basic Requirements, Set Up along with details about the project so that you can understand the technical details and run the application smoothly.

## Table of Contents

1. [Basic Requirement](#basic-requirement)
2. [Setting Up](#setting-up)
3. [Starting the Server](#starting-the-application-server)
4. [Running Tests](#running-tests)
5. [Project Overview](#project-overview)
6. [UI/UX](#uiux)
7. [Deployment](#deployment)

## Basic Requirement

This project runs on [Next 14](https://nextjs.org/blog/next-14) and requires minimum [Node](https://nodejs.org/) version of `18.17`.

You can check your version by running the following command

```sh
$ node -v
```

If your version of node is lower than the requirement, you can get the version by downloading directly from the [website](https://nodejs.org/en/download) or by using [nvm](https://github.com/nvm-sh/nvm) as detailed in [this tutorial](https://medium.com/geekculture/how-to-install-node-js-by-nvm-61addf4ab1ba).

## Setting Up

Once you have the basic requirement set up, make sure you are in the same directory as `package.json`

You can navigate to the required file by using `cd` to change into a certain directory

```sh
$ cd /directory
```

or to change out of the current directory

```sh
$ cd ..
```

Once you re in the same directory as `package.json`, run the following command to install the dependencies

```sh
$ npm i
```

## Starting the Server

After the installation is done, you should be able to run the development service by using

```sh
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

There are a total of _31 tests_ under _9 test suites_ in the project. You can run these tests by using the test script

```sh
$ npm test
```

The project uses [Jest](https://jestjs.io/) for the tests.

## Project Overview

The project is structured with frontend and backend in different folders within the `src` folder.

The tests for the project are placed in `tests` folder mirroring the structure for `src` folder with each test file ending with `.test.js`.

### Models

`models` folder has been used to place `products.js` and `pricingRules.js` where each model is storing the following data -

1. `products.js` - Details about the products including SKU code and image link.
2. `pricingRules.js` - Details about the available deals. There are 3 types of deals that have been definied in the system.  
   a. **X for Y deal** - You get X items of the SKU for the price of Y items. Essentially getting X - Y items of the SKU for free.  
   b. **Bulk Discount** - You get a discounted price if you buy more than a set threshold of a particular SKU.  
   c. **Bundle** - If you buy a bundled item with the current SKU, you get the bundled item for free. _For simplicity, in this project I have displayed this as a discount on the current SKU by bundling._

A database wasn't used because the application itself is rather straightforward, but the project can be extended further to make use of databases if necessary.

### Utils

`utils` folder contains the business logic with `calculateTotalPriceAndBreakDown.js` defining the function to fetch the total price and the breakdown for the cart of items. It's corresponding test is available in `tests/utils` folder.

### Pages

`pages` folder contains the pages for the application, with `pages/api` containing backend APIs while the other pages are available on top level. The `pages` are as follows -

1. `/api/checkout.js` - Contains the backend api for `/api/checkout` which is a `POST` API to fetch total price and the breakdown for the cart of items. Following is the request and response structure  
    **Request:**

   ```json
   {
     "items": [
       {
         "SKU": "ipd",
         "name": "Super iPad",
         "price": 549.99,
         "image": "/images/ipd.jpeg",
         "quantity": 6
       }
     ]
   }
   ```

   **Response:**

   ```json
   {
     "total": 2999.94,
     "breakdown": [
       {
         "SKU": "ipd",
         "name": "Super iPad",
         "quantity": 6,
         "originalPrice": 549.99,
         "finalPrice": 2999.94,
         "discountApplied": 300,
         "discountDescription": "Bulk discount applied for purchasing more than 4"
       }
     ]
   }
   ```

2. `index.js` - Contains the homepage of the application available at the route `"/"`.
3. `checkout.js` - Contains the checkout page available at the route `"/checkout"` that user lands on once they click on checkout from the cart sidebar. Users can only land on this page if their cart has items.
4. `success.js` - Contains the success page available at the route `"/success"` that user lands on once they confirm their purchase on checkout page. Users can only land on this page if their cart has items.
5. `_app.js` - It is used to initialise the pages and apply global settings, it does contain the code wrap the entire application with `CartProvider` to maintain context of cart across the pages.
6. `_document.js` - It is for customizing the overall HTML document structure. Currently, it just imports the font `Inter` but it can be used for further customisation to HTML document structure for server-side rendering optimizations.

The corresponding tests are available in `tests/pages` folder.

### Context

`context` contains context files, currently it has `CartContext` which maintains the state of cart across the application. It makes use of `localStorage` to preserve the state even on reloads.

### Hooks

`hooks` contains hooks that can be used on frontend across the application. Currently, it has `useFetchPriceDetails` hook that fetches the price details of a cart from `/api/checkout` API.

### Components

`components` contains all the reusable components of the application. Following are the components available -

1. `CartIcon.js` - Contains the `CartIcon` component which shows whether the cart of the user is empty or not and opens cart sidebar on clicking.
2. `CartProductCard.js` - Contains the `CartProductCard` component which displays a specific item in the cart along with the price and quantity with an option to be removed from the cart.
3. `CartSidebar.js` - Contains the `CartSidebar` component which displays the cart sidebar that opens when user clicks on the cart icon. It asks the user to add items to cart if the cart is empty.
4. `ProductCard.js` - Contains the `ProductCard` component which displays the product with image and it's details. It also contains a CTA to "Add to Cart".
5. `ProductList.js` - Contains the `ProductList` component which displays the list of products in a responsive grid.

The corresponding tests are available in `tests/components` folder.

### Styles

The styles for the application are placed in `styles` folder. Currently, it contains `globals.css` defining the globally applied styles.

## UI/UX

The UI is targetted to be simplistic in nature and easy to navigate, the application has been built to handle `dark` and `light` modes from the system settings. Feel free to toggle and check for the same.

To make the user experience more intutitive and effortless, there have been animations added for hover and state changes to the cart. Do check by navigating around.

## Updating Pricing or Deals

To update the pricing or the pricing rules, feel free to update [models](#models) and restart the server locally.

## Deployment

The project has been deployed using vercel and is available at - [https://online-store-cs.vercel.app](https://online-store-cs.vercel.app/)
