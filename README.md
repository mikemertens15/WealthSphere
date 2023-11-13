# WealthSphere

Your Personal Financial Hub

## Introduction

Welcome to WealthSphere – a comprehensive and automated financial management application designed to be the central hub for all your financial needs. Our mission is to simplify personal finance management, making it accessible, effortless, and tailored to individual needs. Whether you're looking to track spending, monitor investments, adhere to budgets, or just gain better control over your financial life, WealthSphere is your go-to solution.

### Who is WealthSphere For?

Our target audience is broad – anyone who seeks to secure and streamline their financial life. From the budget-conscious student to the investment-savvy professional, WealthSphere is versatile and intuitive, catering to a wide spectrum of financial needs and literacy.

### Automated Budget Tracking:

We aim to set a new standard in budget tracking. Other apps often require tedious manual adjustments, but WealthSphere aspires to minimize your effort. Our advanced technology is designed to keep you as hands-off as possible, offering a truly automated financial tracking experience.

### Inspiration Behind WealthSphere:

The idea of WealthSphere was born out of personal frustration with existing financial apps like Mint, which often necessitate manual intervention for tasks that should be automated, such as transaction splitting. WealthSphere is our answer to these limitations, offering a more intelligent, self-regulating financial tool.

### Technical Vision:

While still in the early stages of development, our goal is clear: to create a user-friendly platform where all you need to do is link an account and set a budget. From there, WealthSphere will guide you through your financial journey, offering insights and suggestions tailored to your personal goals and habits.

### The Journey and Collaboration:

Currently a personal project to showcase my skills in software engineering, WealthSphere represents not just a tool, but a vision to transform how individuals interact with their finances. Collaboration and contributions are welcome as we embark on this journey to create a platform that could potentially become an integral part of people's financial lives.

## Technologies Used

WealthSphere is built using a robust stack of technologies and tools designed to offer a seamless and efficient user experience. Below is a list of the major technologies involved:

- **Frontend:**

  - **TypeScript:** For type-safe code in the front-end client.
  - **React:** A JavaScript library for building user interfaces.
  - **Material-UI:** A popular React UI framework for designing elegant and responsive UI components.
  - **Cypress:** An end-to-end testing framework used for testing the front-end client.

- **Backend:**

  - **Node.js:** The runtime environment for executing JavaScript on the server side.
  - **Express.js:** A web application framework for Node.js.
  - **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity, used for testing the server.

- **Database:**

  - **MongoDB:** A NoSQL database used to store application data.

- **APIs and Services:**
  - **Plaid API:** Used for linking bank accounts to the application.

## Installation

### Setting up the Frontend client

1. Clone the frontend repository:

```bash
git clone https://github.com/mikemertens15/WealthSphere.git
```

2. Install Dependencies

```bash
npm install
```

### Setting up the Backend Server

1. Clone the frontend repository:

```bash
git clone https://github.com/mikemertens15/WealthSphere_Server.git
```

2. Install Dependencies

```bash
npm install
```

### Database and External Services Setup

1. Set up a MongoDB cluster
2. Create a Plaid API account

### Environment Configuration

1. In the server directory, create a .env file with the following details:

- MongoDB connection string.
- Plaid API keys and configurations.

2. In the client directory, create a .env file to include:

- Server connection URL

### Running the Application

- Client: Execute `npm run dev` in the frontend directory
- Server: Execute `npm start` in the backend directory
