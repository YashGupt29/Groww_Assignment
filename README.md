# Groww Mobile Application

This document provides an overview of the Groww mobile application, detailing its core functionalities, technical architecture, scalability aspects, and how data fetching and state management are handled using React Query and Redux.

## Table of Contents
- [Core Functionalities](#core-functionalities)
- [Technical Architecture](#technical-architecture)
- [Scalability Aspects](#scalability-aspects)
- [Data Fetching with React Query](#data-fetching-with-react-query)
- [State Management with Redux Toolkit](#state-management-with-redux-toolkit)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Core Functionalities

The Groww mobile application offers the following key features:

1.  **Company Overview**: Provides detailed information about specific companies, including their profile, financial data, and other relevant metrics.
2.  **Stock Listing and Exploration**: Allows users to browse a comprehensive list of stocks, with potential filtering, searching, and viewing of top gainers and losers.
3.  **Watchlist Management**: Enables users to create and manage personalized watchlists, adding or removing stocks of interest for easy tracking.
4.  **Time Series Data and Charting**: Displays historical stock price data through interactive charts, allowing users to visualize trends over different timeframes.
5.  **Splash Screen**: An initial loading screen to enhance user experience during app startup.

## Technical Architecture

The application is built using a modern React Native stack, incorporating best practices for mobile development:

*   **React Native**: A cross-platform framework for building native mobile applications using JavaScript and React.
*   **TypeScript**: Provides type safety and improves code quality and maintainability.
*   **React Navigation**: Handles navigation flows within the application, including stack and tab-based navigation.
*   **Redux Toolkit**: A powerful and opinionated set of tools for efficient and scalable state management.
*   **React Query**: Manages server-side data fetching, caching, and synchronization, optimizing performance and user experience.
*   **Axios**: A promise-based HTTP client for making API requests.
*   **Victory Native**: A charting library used for rendering interactive stock charts.
*   **Theming**: Supports dynamic light and dark mode theming for a personalized user experience.
*   **Error Handling**: Incorporates an `ErrorBoundary` component for robust error management and improved application resilience.
*   **Toast Messages**: Utilizes `react-native-toast-message` for displaying non-intrusive feedback to users.

## Scalability Aspects

The architectural choices made in this application provide a strong foundation for scalability:

*   **Modular Architecture**: The codebase is organized into distinct modules (components, screens, services, slices), promoting separation of concerns. This modularity facilitates independent feature development, easier maintenance, and allows different teams to work on separate parts of the application without significant conflicts, enhancing overall development velocity and scalability.
*   **React Native for Cross-Platform Development**: By using React Native, the application maintains a single codebase for both iOS and Android platforms. This significantly reduces development and maintenance overhead as the application grows, allowing for faster iteration and consistent feature delivery across platforms.
*   **Redux Toolkit for State Management**: Redux Toolkit provides a structured and efficient way to manage global application state. Its adherence to immutability and predictable state changes ensures that the application's state remains consistent and debuggable, even with a large number of features and complex interactions. The simplified setup with `createSlice` makes adding new state features straightforward, contributing to long-term maintainability and scalability.
*   **React Query for Data Fetching and Caching**: React Query is a critical component for optimizing data interactions. It intelligently caches API responses, automatically re-fetches stale data, and handles background updates. This dramatically reduces network requests, improves perceived performance, and enhances the user experience, especially in data-intensive scenarios. Its robust caching strategies are essential for scaling an application that relies heavily on external APIs, ensuring responsiveness and efficiency under load.
*   **Efficient Asynchronous Operations**: The combination of `Axios` for HTTP requests and `React Query`'s capabilities ensures that data fetching operations are handled asynchronously and efficiently. This prevents UI freezes and provides a smooth user experience, even when dealing with numerous or large data payloads, which is crucial for a scalable application.
*   **Theming and UI Customization**: The implemented theming system allows for easy customization of the application's appearance. This is beneficial for future scalability, as it enables quick adaptation to different branding requirements, white-labeling, or supporting diverse user preferences without extensive code changes.
*   **Robust Error Handling**: The `ErrorBoundary` component ensures that isolated UI errors do not lead to a complete application crash. This enhances the application's stability and resilience, which are paramount for a scalable system that needs to remain operational even when individual components encounter issues.
*   **Flexible Navigation**: `React Navigation` provides a flexible and powerful navigation solution that can easily accommodate a growing number of screens and increasingly complex navigation patterns, ensuring a smooth and intuitive user journey as new features are added.

## Data Fetching with React Query

React Query is extensively used for managing server-side data, including fetching, caching, synchronizing, and updating.

*   **`QueryClient` Configuration**: A global `QueryClient` is configured in `utils/queryClient.js` and provided to the application via `QueryClientProvider` in `App.jsx`. This client manages all data fetching and caching logic.
    *   **Default Options**: Configured with `retry: 1`, `staleTime: 1000 * 60` (1 minute), `gcTime: 1000 * 60 * 10` (10 minutes), `refetchOnMount: false`, `refetchOnReconnect: true`, and `refetchOnWindowFocus: false`. These settings optimize network usage and data freshness.
*   **Usage**: Custom hooks, typically found in the `hooks/` directory (e.g., `useCompanyOverview`, `useTimeSeriesData`), leverage `useQuery` to abstract API calls (made using `axios` in `services/`). These hooks provide states for loading, error, and successful data retrieval, simplifying component logic.
*   **Benefits**: Automatic caching, background refetching, simplified error handling, and support for optimistic UI updates significantly enhance performance and developer experience.

## State Management with Redux Toolkit

Redux Toolkit is utilized for managing the application's global state, particularly for features requiring centralized state management like user watchlists.

*   **`watchlistSlice`**: Defined in `slices/watchlistSlice.js`, this slice manages the state of user watchlists. It includes:
    *   `initialState`: Defines the default structure for watchlists.
    *   `reducers`: Contains actions such as `createWatchlist`, `addToWatchlist`, and `removeFromWatchlist` to modify the watchlist state in a predictable and immutable manner.
*   **`configureStore`**: The Redux store, set up in `utils/store.js`, combines all application reducers (e.g., `watchlistReducer`) into a single global state object.
*   **`Provider` Integration**: The store is made accessible throughout the application by wrapping the root component with `<Provider store={store}>` in `App.jsx`.
*   **Benefits**: Centralized state management, predictable state changes, and excellent developer tooling (e.g., Redux DevTools) make it ideal for managing complex application state, ensuring maintainability and scalability.

## Installation and Setup

To set up and run the Groww mobile application locally, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone [repository_url]
    cd Groww
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Install CocoaPods (for iOS development)**:
    ```bash
    cd ios
    pod install
    cd ..
    ```
4.  **Environment Variables**:
    Create a `.env` file in the root directory with necessary API keys or configurations.
    ```
    # Example .env content
    API_BASE_URL=https://api.example.com
    ```
    Make sure to define any required environment variables as per `react-native-dotenv` configuration.

## Running the Application

### For Android

1.  **Start Metro Bundler**:
    ```bash
    npm start
    # or
    yarn start
    ```
2.  **Run on Android Emulator/Device**:
    ```bash
    npm run android
    # or
    yarn android
    ```

### For iOS

1.  **Start Metro Bundler**:
    ```bash
    npm start
    # or
    yarn start
    ```
2.  **Run on iOS Simulator/Device**:
    ```bash
    npm run ios
    # or
    yarn ios
    ```

## Project Structure

The project follows a standard React Native structure, with clear separation of concerns:

```
.
├── __tests__/                  # Unit and integration tests
├── android/                    # Android specific native code
├── app.json                    # Application configuration
├── App.jsx                     # Main application entry point and navigation setup
├── assets/                     # Static assets like images and fonts
├── babel.config.js             # Babel configuration
├── components/                 # Reusable UI components
├── constants/                  # Application constants (colors, dummy data, styles)
├── hooks/                      # Custom React hooks (e.g., for data fetching)
├── ios/                        # iOS specific native code
├── metro.config.js             # Metro bundler configuration
├── package.json                # Project dependencies and scripts
├── screens/                    # Individual application screens/pages
├── services/                   # API service calls (e.g., fetch data
├── slices/                     # Redux slices for state management
├── tsconfig.json               # TypeScript configuration
├── utils/                      # Utility functions and configurations (e.g., Redux store, QueryClient)
└── yarn.lock                   # Yarn dependency lock file
```
