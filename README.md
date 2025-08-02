# Mount Zion Training Centre

A comprehensive church management and training center application built with Next.js, Supabase, and modern web technologies.

## Features

### 🎓 Student Management
- Student registration and profile management
- Course enrollment and progress tracking
- Program interest tracking
- Student dashboard with personalized content

### 📚 Course Management
- Course creation and scheduling
- Instructor assignment
- Enrollment management
- Progress tracking and certificates

### 💰 Financial Management
- Payment processing and tracking
- Fee management
- Financial reports and analytics
- Multiple payment methods support

### 📅 Event Management
- Event creation and scheduling
- Venue booking and management
- Attendee registration
- Event analytics

### 📢 Communication
- Announcements system
- Notifications management
- Newsletter campaigns
- Multi-audience targeting

### ⚙️ Administration
- Role-based access control (Admin, Instructor, Student)
- Comprehensive dashboard with analytics
- System settings and configuration
- User management

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Supabase Auth with Row Level Security
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/PeeapDev/mountZion.git
cd mountZion
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL to create all tables, policies, and initial data

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **profiles** - User profiles extending Supabase auth
- **programs** - Training programs offered
- **courses** - Individual courses within programs
- **course_enrollments** - Student course registrations
- **events** - Events and workshops
- **venues** - Facility and venue management
- **payments** - Payment tracking and management
- **announcements** - System announcements
- **notifications** - User notifications
- **newsletter_subscribers** - Newsletter management

## Authentication & Authorization

The app uses Supabase Auth with Row Level Security (RLS) policies:

- **Admin**: Full access to all features and data
- **Instructor**: Can manage assigned courses and view student data
- **Student**: Can view own data, enroll in courses, and access student portal

## Demo Credentials

For development and testing:

- **Admin**: admin@mountzion.org / password123
- **Student**: student@mountzion.org / password123

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Admin dashboard pages
│   ├── user-dashboard/    # Student dashboard
│   ├── login/            # Authentication pages
│   └── signup/           # User registration
├── components/           # Reusable UI components
├── contexts/            # React contexts (auth, etc.)
├── lib/                # Utility functions and services
│   ├── supabase/       # Supabase client configuration
│   ├── auth-supabase.ts # Authentication service
│   └── database.ts     # Database operations
├── supabase/           # Database schema and migrations
└── public/             # Static assets
```

### Key Files

- `lib/auth-supabase.ts` - Supabase authentication service
- `lib/database.ts` - Database operations and queries
- `contexts/auth-context-supabase.tsx` - Authentication context
- `supabase/schema.sql` - Complete database schema

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.
