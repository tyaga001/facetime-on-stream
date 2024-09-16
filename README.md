## Getting Started
- Clone the GitHub repository.
- Run **`npm install`** to install to necessary dependencies.
- Create a [Clerk account](https://clerk.com/) and copy your credentials into a **`.env.local`** file.
  ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY= 
  ```
- Create a [GetStream.io](https://getstream.io/) account and copy your credentials into the **`.env.local`** file.
  ```bash
    STREAM_APP_ID=
    NEXT_PUBLIC_STREAM_API_KEY=
    STREAM_SECRET_KEY=
  ```
- Add this environment variable to the **`.env.local`** file:
  ```bash
    NEXT_PUBLIC_FACETIME_HOST=http://localhost:3000/facetime
  ```
- Finally, start the development server by runnning **`npm run dev`**.
