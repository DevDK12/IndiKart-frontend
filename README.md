# IndiKart : Full Stack Ecommerce Web App 
## Frontend part 

### Preview

![Piechart page](./Demo%20Images/IndiKart.jpg)


### Realease 
- Frontend : 
  - [Live]()
  - [Repo](https://github.com/DevDK12/IndiKart-frontend)

- Backend : 
  - [Live]()
  - [Repo](https://github.com/DevDK12/IndiKart-Backend)



### Test User Signin
Note : Please do not mis-use this, use this only if you want to explore this project
- Email : test@email.com
- Password : test@1245
- Stripe : 
  - Card : 4242 4242 4242 4242
  - CVV : any
  - Expiry : any


### Features 
- Users Section
  - User can login or signup with email-password or with O-Auth google
  - User can see latest products on Home page
  - User can see all products and filter products with category, price and sort them 
  - Pagination implemented 
  - User can add products to cart (only if logged in)
  - User can make order by providing shipping details
  - Real time Order tracking  and order details
- Dashboard UI and management for admins
  - Admin can view stats of revenue , users products since last month added to shop
  - Admin can manage products , users and transactions 
  - Admin can Process orders as shipped or delivered 
  - Admin can view bar graph 
  - Admin can view line graph
  - Admin can view pie chart
  - Admin can generate new Coupons
- Lazy Loading components to reduce loading time by approximately **2-3 seconds** or approximately **50%**
- User Authentication via email-password and **O-Auth** along with **client + server** side validation
- Implemented **RTK Query** to reduce time of page loads by approximately **1-2 seconds** because of server-side state management and caching with **Redux-toolkit-Query (RTK)** which makes the API calls only when necessary, it also reduces the number of requests to the server by approximately **50-70%**.
- Debouncing used to reduce API calls by approximately **70%** 






### Libraries and Tools Used
- **Vite** and **Typescript** for faster development and bundling
- **Tailwind** for CSS
- **React-table** and **Chart.js**  for tables and charts
- **React-redux** for state management
- **Redux-toolkit-Query (RTK)** for server-side state management and caching
- **Stripe** for payment gateway
- **Firebase**  for o-auth 
- **React-router** for routing





### Install 
Please follow the instructions below to install the required packages.

Note : This Project uses Vite-react Plugin : [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


1. Clone Repository 
- `git clone https://github.com/DevDK12/IndiKart-frontend.git`
- `cd IndiKart-frontend`


2. Install Package
- `npm i`


3. Configure `.env` file
Create Firebase and Stripe account to get their api keys
Replace `<>` with corresponding key
Do not use any `"` around key or id
```bash
VITE_FIREBASE_API_KEY=<firebase api key>
VITE_FIREBASE_PROJECT_ID=<firebase project key>
VITE_FIREBASE_APP_ID=<firebase app id>
VITE_FIREBASE_MESSAGING_SENDER_ID=<firebase messaging sender id>
VITE_SERVER=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=<vite stripe public key>
```


4. Run project
- `npm run dev`



### Structure
- This project uses Clean Project structure well organised everything

```bash
IndiKart-frontend
├── public
├── scripts
├── src
│   ├── assets
│   │   ├── images
│   │   ├── ...
│   │   
│   ├── components
│   │   ├── admin
│   │   │   ├── ...
│   │   │   
│   │   ├── Layout
│   │   │   ├── Admin
│   │   │   ├── ...
│   │   │   
│   │   ├── shop
│   │   │   ├── ...
│   │   │   
│   │   ├── ui
│   │   │   ├── Charts
│   │   │   ├── ...
│   │      
│   ├── pages
│   │   ├── admin
│   │   │   ├── Apps
│   │   │   |   ├── ...
│   │   │   |      
│   │   │   ├── Chart
│   │   │   |   ├── ...
│   │   │   |      
│   │   │   ├── main
│   │   │   |   ├── customer
│   │   │   |   |   ├── ...
│   │   │   |   |   
│   │   │   |   ├── product
│   │   │   |   |   ├── ...
│   │   │   |   |   
│   │   │   |   ├── transaction
│   │   │   |   |   ├── ...
│   │   │   |   ├── ...
│   │   │   |
│   │   ├── auth
│   │   │   ├── ...
│   │   ├── shop
│   │   │   ├── ...
│   │      
│   ├── redux
│   │   ├── api
│   │   │   ├── ...
│   │   │   
│   │   ├── reducer
│   │   │   ├── ...
│   │   │   
│   │   ├── store.js
│   │      
│   ├── Types
│   │   │── ...
│   │      
│   ├── utils
│   │   │── ...
│   │      
│   ├── App.tsx
│   ├── firebase.ts
│   ├── index.css
│   ├── main.tsx
│   ├── ...
|
│── ...
```
