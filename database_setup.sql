-- Life Changing Journey App - Supabase Database Setup Script
-- Run this script in your Supabase SQL Editor to create all required tables

-- =====================================================
-- 1. PROFILES TABLE (User profiles and extended information)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    profile_picture_url TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. SERVICES TABLE (Wellness services offered)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- mental_wellness, spiritual_growth, financial_guidance, hypnotherapy
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    practitioner_id UUID REFERENCES public.profiles(id),
    practitioner_name VARCHAR(255),
    practitioner_title VARCHAR(255),
    features TEXT[], -- array of features/benefits
    requirements TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    max_participants INTEGER DEFAULT 1,
    location VARCHAR(255),
    online_available BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. APPOINTMENTS TABLE (Scheduled sessions)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES public.profiles(id),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, confirmed, in_progress, completed, cancelled, no_show
    notes TEXT,
    client_notes TEXT,
    practitioner_notes TEXT,
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded, failed
    payment_amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. RESOURCES TABLE (Educational content library)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    type VARCHAR(50) NOT NULL, -- video, audio, article, pdf, worksheet
    category VARCHAR(100) NOT NULL, -- mental_wellness, spiritual_growth, etc.
    url TEXT,
    thumbnail_url TEXT,
    duration INTEGER, -- in seconds for audio/video
    file_size INTEGER, -- in bytes
    author VARCHAR(255),
    tags TEXT[],
    difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
    is_premium BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. TESTIMONIALS TABLE (Client success stories)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_initial VARCHAR(10), -- for privacy (e.g., "S.M.")
    service_category VARCHAR(100),
    testimonial_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    client_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    location VARCHAR(100),
    date_of_service DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. DONATIONS TABLE (Nyezi Foundation donations)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id UUID REFERENCES public.profiles(id),
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    donation_type VARCHAR(20) DEFAULT 'one_time', -- one_time, monthly, annual
    payment_method VARCHAR(50),
    payment_reference VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    is_anonymous BOOLEAN DEFAULT FALSE,
    message TEXT,
    tax_certificate_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. NOTIFICATIONS TABLE (Push notifications and messages)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- appointment_reminder, payment_due, new_resource, general
    related_id UUID, -- appointment_id, resource_id, etc.
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. USER_PREFERENCES TABLE (App settings and preferences)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    appointment_reminders BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Africa/Johannesburg',
    theme VARCHAR(20) DEFAULT 'light', -- light, dark, auto
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. BOOKMARKS TABLE (User saved resources)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, resource_id)
);

-- =====================================================
-- 10. PRACTITIONER_AVAILABILITY TABLE (Practitioner schedules)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.practitioner_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    practitioner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    break_start_time TIME,
    break_end_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_practitioner ON public.services(practitioner_id);

-- Appointments indexes
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_practitioner ON public.appointments(practitioner_id);

-- Resources indexes
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON public.resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_resources_premium ON public.resources(is_premium);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved);

-- Donations indexes
CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practitioner_availability ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Services policies (publicly readable)
CREATE POLICY "Services are publicly readable" ON public.services
    FOR SELECT TO authenticated USING (is_active = true);

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON public.appointments
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() = practitioner_id);

CREATE POLICY "Users can create own appointments" ON public.appointments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments" ON public.appointments
    FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = practitioner_id);

-- Resources policies (publicly readable)
CREATE POLICY "Resources are publicly readable" ON public.resources
    FOR SELECT TO authenticated USING (true);

-- Testimonials policies (publicly readable, approved only)
CREATE POLICY "Approved testimonials are publicly readable" ON public.testimonials
    FOR SELECT TO authenticated USING (is_approved = true);

-- Donations policies
CREATE POLICY "Users can view own donations" ON public.donations
    FOR SELECT USING (auth.uid() = donor_id);

CREATE POLICY "Users can create donations" ON public.donations
    FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS for Updated_at timestamps
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at columns
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_donations_updated_at
    BEFORE UPDATE ON public.donations
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_user_preferences_updated_at
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_practitioner_availability_updated_at
    BEFORE UPDATE ON public.practitioner_availability
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample services
INSERT INTO public.services (title, description, category, price, duration, practitioner_name, practitioner_title, features) VALUES
('Individual Counseling Session', 'One-on-one therapy session for mental wellness and personal growth', 'mental_wellness', 350.00, 60, 'Dr. Sarah Mthembu', 'Clinical Psychologist', ARRAY['Confidential environment', 'Personalized treatment plan', 'Evidence-based therapy', 'Progress tracking']),
('Spiritual Life Coaching', 'Guidance for spiritual growth and finding life purpose', 'spiritual_growth', 250.00, 90, 'Rev. John Ndaba', 'Spiritual Life Coach', ARRAY['Life purpose exploration', 'Spiritual practices', 'Meditation guidance', 'Faith-based counseling']),
('Financial Planning Consultation', 'Comprehensive financial planning and investment advice', 'financial_guidance', 400.00, 75, 'Maria Santos', 'Certified Financial Planner', ARRAY['Budget analysis', 'Investment planning', 'Debt management', 'Retirement planning']),
('Hypnotherapy Session', 'Therapeutic hypnosis for habit change and healing', 'hypnotherapy', 300.00, 60, 'Dr. Peter Williams', 'Certified Hypnotherapist', ARRAY['Relaxation techniques', 'Subconscious reprogramming', 'Habit modification', 'Stress relief']);

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, client_initial, service_category, testimonial_text, rating, is_featured, is_approved) VALUES
('Sarah Mokoena', 'S.M.', 'mental_wellness', 'The counseling sessions completely changed my perspective on life. I feel so much more confident and at peace.', 5, true, true),
('David Lebenya', 'D.L.', 'financial_guidance', 'Thanks to the financial planning, my family is now debt-free and saving for our future. Incredible service!', 5, true, true),
('Nomsa Khumalo', 'N.K.', 'spiritual_growth', 'The spiritual coaching helped me find my true purpose. I am forever grateful for this journey.', 5, true, true);

-- Insert sample resources
INSERT INTO public.resources (title, description, type, category, duration, author, is_featured) VALUES
('Managing Anxiety: A Complete Guide', 'Comprehensive guide to understanding and managing anxiety disorders', 'article', 'mental_wellness', 900, 'Dr. Sarah Mthembu', true),
('Morning Meditation Practice', 'Guided 15-minute morning meditation for spiritual growth', 'audio', 'spiritual_growth', 900, 'Rev. John Ndaba', true),
('Budget Planning Worksheet', 'Interactive worksheet for creating and managing your personal budget', 'pdf', 'financial_guidance', NULL, 'Maria Santos', false),
('Sleep Hypnosis for Deep Rest', 'Hypnotherapy session designed to improve sleep quality', 'audio', 'hypnotherapy', 1800, 'Dr. Peter Williams', true);

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE 'Life Changing Journey database setup completed successfully!';
    RAISE NOTICE 'Tables created: profiles, services, appointments, resources, testimonials, donations, notifications, user_preferences, bookmarks, practitioner_availability';
    RAISE NOTICE 'Security policies, indexes, and triggers have been applied.';
    RAISE NOTICE 'Sample data has been inserted for testing.';
END $$;
