# Description 
This is a simple web app that allows you to view and interact with crowd funding projects from the Geyser platform nostr relay. It is built using the Nostr Dev Kit.

# Running the Client

To run the client application, follow these steps:

1. **Install Dependencies**: First, ensure you have Node.js installed on your system. Then, run the following command in the project root directory to install the necessary dependencies:
   ```bash
   npm install
   ```
2. **Start the Development Server**: To start the development server, run:
   ```bash
   npm run dev
   ```
   This command uses Vite for a fast development experience with Hot Module Replacement (HMR).

# Architectural Decisions and Design Patterns

1. **React with TypeScript**: The project uses React for building the UI and TypeScript for static typing, enhancing code quality and maintainability.

2. **Vite for Tooling**: Vite is chosen for its fast build times and out-of-the-box support for TypeScript, React, and Hot Module Replacement (HMR).

3. **Chakra UI for Styling**: Chakra UI is used for styling components. It provides a set of accessible and composable React components that are easy to use and customize.

4. **Modular Architecture**: The codebase follows a modular architecture, separating concerns into distinct components and services. For example, `src/components/projects/` contains UI components, while `src/services/nostrService.ts` encapsulates API calls.

5. **Custom Types and Interfaces**: The project defines custom TypeScript interfaces, such as `Project` and `LinkCategories`, to model the application data. This approach enhances type safety and code readability.

6. **State Management with React Hooks**: The application uses React hooks for state management within components, as seen in `src/components/projects/ProjectsGrid.tsx` and `src/components/projects/ProjectLinksTab.tsx`, providing a clean and functional approach to handling component state and side effects.

7. **Async/Await for Asynchronous Operations**: Asynchronous operations, such as API calls in `src/services/nostrService.ts`, use async/await syntax for readability and error handling.

# Transparency 
The IDE used for this project is Cursor and its copilot was used to faciliate the development of this project.

# Challenges

The main challenge faced during this project was the difficulty with which the data was strucutred and obtained from the Nostr relays. For instance it was not clear how to obtain the author of a project from the Nostr relay as the author field was always undefined, after some digging in the NDK documentation I was able to solve this by using the fetchProfile method on the user object only to find that it was the same information that could be found in the kind `0` events. 

# Limitations 
I could not properly implement the zaps tab as I was not able to obtain the zap events related to given projects from the Nostr relay. I tried to match them with the proper `p` tag without success.  

I wanted to add a feature that would allow users to fund projects with lightning but from my undertsanding I need to register the app with alby to obtain the required credentials such as client_id to generate an invoice, which is a prerequisite before being able to send a payment. 
