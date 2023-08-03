# Nash

**_with Tabby_**

## What is Nash?

Nash is a dashboard for the Nostr protocol. It is a web application that allows users to interact with Nostr DVMs and view the state of the network.

It is built with [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) and uses [Tailwind CSS](https://tailwindcss.com/) for styling.

It is a work in progress and is not yet ready for production use. Upon its completion, the end user will be able to:

- View the active relays and their current state
- Sign in to the Nostr network and the dashboard with a private key
- Submit new job requests to the AI DVMs
- View the status of submitted jobs
- Pay for completed jobs with Bitcoin zaps

The features listed above are not yet implemented. The current version of Nash allows the user to view the state of the network and submit new job requests to the AI DVMs.

**_Once the above features are added, the next step will be to add the ability to create, deploy, and track the status of new DVMs, including the Tabby audio transcription model._**

## How to run Nash

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 14 or higher

### Installation

1. Clone the repository from [https://github.com/jbalthis/nash-with-tabby](https://github.com/jbalthis/nash-with-tabby)
2. Change into the project directory with `cd nash-with-tabby`
3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard
6. To stop the development server, press `Ctrl + C` in the terminal

### Usage

- The dashboard will display the current state of the network relays
- The user should select a relay from the dropdoown menu
- The user should enter a valid private key in the input field
- The user should click the "Submit" button and will be signed into the network
- To submit new job requests, the user should navigate to the relevant DVM page and follow the instructions there.

## How to contribute

### Contributing to Nash

- Fork the repository
- Submit a pull request
- If you have any questions, please contact me on Discord, @barelyjason
