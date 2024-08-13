# Blogify

## Overview

This Blog App is a modern web application that allows users to create, manage, and read blog posts. It supports user authentication via Google and guest access with limited features. The app is built with React and leverages a variety of tools and libraries to deliver a rich user experience.

## Features

- **User Authentication**: Users can log in using their Google account or as a guest with limited features.
- **Rich Text Editor**: Customizable rich text editor implemented with `react-md-editor`.
- **Dynamic Data Handling**: Utilizes `react-query` for data fetching and mutations.
- **Routing**: Managed by `react-router-dom` for seamless navigation.
- **Context API**: For global state management and user authentication.
- **Styling**: Styled with `TailwindCSS` and `Shadcn UI` for a modern, responsive design.
- **Icons**: Uses `remix-icons` for a comprehensive set of icons.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Query**: For data fetching, caching, and synchronization.
- **React Router DOM**: For client-side routing.
- **Context API**: For state management and user authentication.
- **Shadcn UI**: A UI component library for a consistent design.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Remix Icons**: A set of customizable icons.
- **react-md-editor**: Rich text editor for creating and editing blog content.
- **Firebase**: Backend service for data storage and user authentication.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/moashraf86/Blogify.git
   cd blog-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   VITE_APP_FIREBASE_API_KEY=your-api-key
   VITE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_APP_FIREBASE_PROJECT_ID=your-project-id
   VITE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_APP_FIREBASE_APP_ID=your-app-id
   VITE_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

## Usage

- **Create an Account**: Log in using your Google account or enter as a guest.
- **Create and Manage Posts**: Use the rich text editor to write and manage your blog posts.
- **Navigation**: Navigate through the app using the integrated routing system.
- **Bookmarks and Comments**: Interact with posts by bookmarking and commenting.

## Contributing

We welcome contributions to the project! To get started:

1. **Fork the Repository**: Create a personal copy of the repository by forking it on GitHub.
2. **Clone Your Fork**: Clone your fork to your local machine.

   ```bash
   git clone https://github.com/moashraf86/Blogify.git
   ```

3. **Create a New Branch**: Create a new branch for your changes.

   ```bash
   git checkout -b my-feature-branch
   ```

4. **Make Changes**: Implement your changes or new features.
5. **Commit Your Changes**: Commit your changes with a clear and descriptive message.

   ```bash
   git add .
   git commit -m "Add feature or fix issue"
   ```

6. **Push Your Changes**: Push your changes to your forked repository.

   ```bash
   git push origin my-feature-branch
   ```

7. **Submit a Pull Request**: Go to the original repository and submit a pull request from your branch. Provide a clear description of the changes and why they should be merged.

## License

This project is licensed under the MIT License.

---

Feel free to adjust any specifics according to your needs!
