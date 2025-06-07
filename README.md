# LugoTrip

A Next.js application with Supabase backend and Vercel deployment.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Supabase project at https://supabase.com
   - Get your project URL and anon key
   - Create a `.env.local` file in the root directory with the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase (Database & Authentication)
- Vercel (Hosting)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
