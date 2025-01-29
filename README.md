# Killers

"Killers" is an e-commerce website built with Next.js for selling pest control products.

## Technologies Used

- **Next.js:** For building the application with server-side rendering and static site generation.
- **Supabase:** For database management.
- **Auth0:** For authorization and user login.
- **next-intl:** For internationalization and localization.
- **Tailwind CSS:** For styling and responsive design.

## Features

### General

- **Light Mode, Dark Mode, and System Mode**;
- **Internationalization:** Available in two languages - English and Georgian.

### Pages

- **Home Page:** Introduction to the website.
- **Products Page:** List of all pest control products, including traps, gels, and more.
- **Product Details Page:** Detailed information about a selected product.
- **Blog Posts Page:** A collection of articles related to pest control tips and tricks.
- **Blog Post Details Page:** Detailed content for a specific blog post.
- **About Page:** Information about the "Killers" website and its mission.
- **Profile Page:** A personalized page where users can view their information.
- **Contact Page:** A page for users to get in touch with the website administrators.
- **Dashboard Page**: Displaying sales performance, user activity, and growth trends, to help users or administrators track and analyze data.

  ### Authentication

  User authentication is managed with **Auth0** for secure login functionality.

  ### Database

  The website uses **Supabase** as its backend database for storing and managing products and blogs data.

  ## Setup and Installation

  ### Prerequisites

  - Node.js (v16 or higher)
  - A Supabase account
  - An Auth0 account

  ### Installation Steps

  1. Clone the repository:

     ```
     git clone https://github.com/IrakliAmbroladze/tbc_x_usaid.git
     ```

  2. Navigate to the project directory:

     ```
     cd tbc_x_usaid
     ```

  3. Install dependencies:

     ```
     npm install
     ```

  4. Create a `.env.local` file in the root directory and add the following environment variables:

     - Supabase:

       ```
       NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
       NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
       ```

     - Auth0:

       ```
         AUTH0_SECRET=your_auth0_secret
         AUTH0_BASE_URL=http://localhost:3000
         AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
         AUTH0_CLIENT_ID=your_auth0_client_id
         AUTH0_CLIENT_SECRET=your_auth0_client_secret
       ```

  5. Run the development server:

     ```
       npm run dev
     ```

  6. Open [http://localhost:3000](url) in your browser to view the project.
