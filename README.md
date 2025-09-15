# Life Changing Journey Mobile App

## Project Overview
A comprehensive mobile application for Life Changing Journey - a holistic wellness platform offering mental health services, spiritual growth, financial guidance, and hypnotherapy services based in Durban, KZN.

## Current Status
✅ **Completed:**
- Project structure setup
- Dependencies installation
- Authentication system (Supabase)
- Navigation setup (React Navigation v6)
- Core screens (Login, Register, Home, Services)
- Styling system (Colors, Typography, Global Styles)
- Database schema design

🚧 **In Progress:**
- Basic UI implementation
- Core navigation flow

⏳ **Next Steps:**
1. Complete remaining screens implementation
2. Implement booking system
3. Add payment integration (Stripe)
4. Implement resources section
5. Add push notifications
6. Integrate social media links
7. Add multi-language support
8. Testing and deployment

## Technology Stack
- **Frontend**: React Native (Expo)
- **Backend**: Supabase (Database, Auth, Storage, Real-time)
- **Navigation**: React Navigation v6
- **State Management**: React Context + Hooks
- **UI Components**: Custom components with React Native Elements
- **Payment**: Stripe integration (planned)
- **Notifications**: Expo Notifications (planned)

## Project Structure
```
LifeChangingJourneyApp/
├── App.js                          # Root component
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── .env                           # Environment variables
├── 
├── src/
│   ├── components/                 # Reusable components
│   │   ├── common/                # Common UI components
│   │   ├── forms/                 # Form components
│   │   └── cards/                 # Card components
│   │
│   ├── screens/                   # App screens
│   │   ├── auth/                  # Authentication screens
│   │   ├── main/                  # Main app screens
│   │   └── services/              # Service specific screens
│   │
│   ├── navigation/                # Navigation setup
│   ├── services/                  # API and external services
│   ├── context/                   # React Context providers
│   ├── hooks/                     # Custom hooks
│   ├── utils/                     # Utility functions
│   └── styles/                    # Styling
│
├── supabase/                      # Supabase configuration
├── docs/                          # Documentation
└── assets/                        # Images, fonts, etc.
```

## Setup Instructions

### Prerequisites
1. Node.js (v14 or later)
2. Expo CLI
3. Supabase account
4. Stripe account (for payments)

### Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up environment variables in `.env`
4. Set up Supabase database using the schema in `supabase/schema.sql`
5. Run `npx expo start` to start development

### Environment Variables
Create a `.env` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

## Features

### Core Features
1. **User Authentication** ✅
   - Registration with email verification
   - Login/logout functionality
   - Password reset
   - Profile management

2. **Service Booking System** 🚧
   - Mental wellness sessions
   - Spiritual growth consultations
   - Financial guidance meetings
   - Hypnotherapy sessions

3. **Online Donation Platform** ⏳
   - Multiple payment methods
   - Anonymous donations option
   - Donation tracking

4. **Resource Library** ⏳
   - Articles, videos, audio content
   - Categorized by service type
   - Featured content

5. **Contact & Communication** ⏳
   - Direct messaging
   - Contact forms
   - Support system

### Integration Features (Planned)
- YouTube channel integration
- Social media links (Facebook, Instagram, LinkedIn)
- Google Maps integration
- Calendar integration
- Push notifications
- Multi-language support (English, Zulu, Afrikaans)

## Development Commands
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web
npx expo start --web

# Clear cache and restart
npx expo start --clear
```

## Database Schema
The app uses Supabase with the following main tables:
- `profiles` - User profile information
- `services` - Available services
- `bookings` - Appointment bookings
- `donations` - Donation records
- `resources` - Educational content
- `testimonials` - Client testimonials
- `contact_messages` - Contact form submissions
- `notifications` - Push notifications

## Contributing
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License
Private project for Life Changing Journey

## Contact
For technical support or questions, contact the development team.
