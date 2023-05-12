<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A web app that provides solutions for private jet charter operators and brokers, and enables them to stay ahead of the competition by leveraging real-time market demand
>
> SkyBid seeks to revolutionize the private jet charter industry by offering a seamless, user-friendly platform that enables operators and brokers to engage in real-time bidding for charter flights. Our mission is to optimize the booking experience, save time, and ensure the utmost satisfaction for all parties involved in the private aviation sector..

### User Stories
- As a user I want to edit my profile so that i can update it whenever something changes or needs to be corrected.
- As a user I want to be able to contact other users so that i can negotiate in private conversations
- As a broker I want to create a new request so that I can find available flights with best prices.
- As a broker I want to accept a bid in order to secure the best price for my client and book the desired flight
- As an operator I want to submit a bid in real-time so that I can have the best chance of winning the booking
- As an operator I want to see the current highest bid in real-time, so that I can adjust my bid accordingly.
- As an admin I want to monitor the number of users so that i can identify any issues or areas for improvement.
- As an admin I want to see the users details so that I can ensure compliance with platform policies 

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We designed SkyBid using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes
| Login screen  | Register screen | Aircrafts screen | Add aircraft screen | Edit profile screen | 
| ---| ---| ---| ---| --- |
| ![Landing](./readme/wireframes/login-wireframe.png) | ![register](./readme/wireframes/register-wireframe.png) | ![aircrafts](./readme/wireframes/aircrafts-wireframe.png) | ![addaircraft](./readme/wireframes/add-aircraft.png) | ![fsdaf](./readme/wireframes/Edit-profile.png)
| Requests screen | Create request screen | Add bid screen | Request details screen | Messages screen | 
|![fsdaf](./readme/wireframes/requests-broker.png) | ![fsdaf](./readme/wireframes/create-request-wireframe.png) | ![fsdaf](./readme/wireframes/bids.png) | ![fsdaf](./readme/wireframes/request-details.png) | ![fsdaf](./readme/wireframes/messages.png)
| Landing screen |
![fsdaf](./readme/wireframes/landing-page-wireframe.png)

### Mockups
| Login screen | Register screen | Aircrafts screen | Add aircraft screen | Edit profile screen | 
| ---| ---| ---| ---| --- |
| ![Landing](./readme/mockups/login-mockup.png) | ![register](./readme/mockups/register-mockup.png) | ![aircrafts](./readme/mockups/Aircrafts.png) | ![addaircraft](./readme/mockups/add-aircraft.png) | ![fsdaf](./readme/mockups/edit-profile.png)
| Requests screen | Create request screen | Add bid screen | Request details screen | Messages screen | 
|![fsdaf](./readme/mockups/requests-broker.png) | ![fsdaf](./readme/mockups/create-request.png) | ![fsdaf](./readme/mockups/Add-bid.png) | ![fsdaf](./readme/mockups/request-details.png) | ![fsdaf](./readme/mockups/messages.png)
| Landing screen |
![fsdaf](./readme/mockups/landing-page.png)

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the SkyBid app with the following features:

### User Screens
| Landing screen | Landing screen | Landing screen | Landing screen | Landing screen | 
| ---| ---| ---| ---| --- |
| ![Landing](./readme/implementation/landing-1.png) | ![Landing](./readme/implementation/landing-2.png) | ![Landing](./readme/implementation/landing-3.png) | ![Landing](./readme/implementation/landing-4.png) | ![Landing](./readme/implementation/landing-5.png)
| Landing screen | Landing screen | Landing screen | Landing screen | Register screen | 
| ![Landing](./readme/implementation/landing-6.png) | ![Landing](./readme/implementation/landing-7.png) | ![Landing](./readme/implementation/landing-8.png) | ![Landing](./readme/implementation/landing-9.png) | ![Landing](./readme/implementation/register.png)
| Login screen | Edit profile screen | Requests broker screen | Request operator screen | Create request screen |
| ![Landing](./readme/implementation/login.png) | ![Landing](./readme/implementation/edit-profile.png) | ![Landing](./readme/implementation/requests-broker.png) | ![Landing](./readme/implementation/requests-operator.png) | ![Landing](./readme/implementation/create-request.png)
| Bids screen | Accept bid screen | Send message screen | Messages screen | Chat screen |
| ![Landing](./readme/implementation/bids.png) | ![Landing](./readme/implementation/accept-bid.png) | ![Landing](./readme/implementation/send-message.png) | ![Landing](./readme/implementation/messages.png) | ![Landing](./readme/implementation/chat.png)
| Aircrafts screen | Add-aircraft screen | Request details screen | Add-bid screen |
| ![Landing](./readme/implementation/aircrafts.png) | ![Landing](./readme/implementation/add-aircraft.png) | ![Landing](./readme/implementation/request-details.png) | ![Landing](./readme/implementation/add-bid.png) | 

### Admin Screens
| Dashboard screen | Users screen |
| ---| ---|
| ![Landing](./readme/implementation/dashboard.png) | ![Landing](./readme/implementation/admin-users.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

###  SkyBid is built using the following technologies:

- This project uses the [Angular app development framework](https://angular.io/). Angular is a dynamic framework that crafts interactive user interfaces, ensuring seamless and responsive interactions across various devices.
- The app uses [MongoDB](https://www.mongodb.com/) a flexible NoSQL database for efficient data storage and retrieval, empowering the application to effectively scale and manage data.
- [Node.js](https://node.js.org/): A runtime environment executing JavaScript server-side, enabling the development of scalable, high-performance web applications.
- [Express.js](https://expressjs.com/): A lightweight, adaptable web application framework that streamlines Node.js server creation and effortlessly manages backend communication.
- [Socket.IO](https://socket.io/): A real-time bidirectional event-based communication library, facilitating live data updates between operators and brokers.

- The app uses the font ["Roboto"](https://fonts.google.com/specimen/Roboto) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up SkyBid locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/fady-dib/SkyBid.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

Now, you should be able to run SkyBid locally and explore its features.
