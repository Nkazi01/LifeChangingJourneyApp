# Life Changing Journey Mobile App

## Project Overview
A directory gateway mobile application for Life Changing Journey - connecting users to a comprehensive network of holistic wellness services including mental health services, spiritual growth, financial guidance, hypnotherapy, and integrated professional services based in Durban, KZN.

## Current Status
✅ **Completed:**
- Project structure setup
- Dependencies installation
- Authentication system (Supabase) with demo mode
- Navigation setup (React Navigation v7)
- Service directory screens with real website links
- Directory gateway functionality
- Styling system (Colors, Typography, Global Styles)
- Database schema design
- Static data with real service information

🚧 **In Progress:**
- Directory gateway optimization
- Service information updates

⏳ **Version 2.0 Features (Future):**
1. Booking system implementation
2. Payment integration (Stripe)
3. Push notifications
4. Multi-language support
5. Advanced user profiles
6. Service rating and reviews
7. Enhanced resources section

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

### Core Features (Version 1.0)
1. **Service Directory Gateway** ✅
   - Psychology services (Vuyani Nyezi)
   - Spiritual interventions & traditional healing
   - Financial services (Tshabalala Finance)
   - Hypnotherapy & life coaching
   - Integrated services (Tshabalala Omkhulu)
   - Educational support (Nyezi Foundation)

2. **User Authentication** ✅
   - Registration with email verification
   - Login/logout functionality
   - Password reset
   - Profile management
   - Demo mode for content browsing

3. **Service Information** ✅
   - Detailed service descriptions
   - Contact information and website links
   - Direct calling functionality
   - Service categories and features

4. **Resource Library** ✅
   - Articles, videos, audio content
   - Categorized by service type
   - Featured content
   - Static data fallbacks

5. **Contact & Communication** ✅
   - Contact forms
   - Direct website navigation
   - Phone call integration
   - Support system

### Version 2.0 Features (Future)
1. **Service Booking System** ⏳
   - Online appointment scheduling
   - Calendar integration
   - Booking management

2. **Online Donation Platform** ⏳
   - Multiple payment methods
   - Anonymous donations option
   - Donation tracking

3. **Advanced Features** ⏳
   - Push notifications
   - Multi-language support
   - Service ratings and reviews
   - Enhanced user profiles

### Service Network
The app serves as a directory gateway to the following services:

- **[Life Changing Journey](https://lifechangingjourney.co.za)** - Main holistic wellness platform
- **[Psychologist Durban](https://psychologistdurban.co.za)** - Vuyani Nyezi's psychology practice
- **[Tshabalala Finance](https://tshabalalafinance.co.za)** - Financial services and loans
- **[Tshabalala Omkhulu](https://tshabalalaomkhulu.co.za)** - Integrated professional services
- **[Nyezi Foundation](https://www.nyezivfoundation.co.za/)** - Educational support for rural communities

### Integration Features (Version 2.0)
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
