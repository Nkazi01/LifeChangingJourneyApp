-- Life Changing Journey App Database Schema
-- This file contains the SQL schema for setting up the Supabase database

-- Enable Row Level Security
alter database postgres set "app.jwt_secret" to 'your-jwt-secret-here';

-- Users table is handled by Supabase Auth automatically
-- Create profiles table for additional user data
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  phone text,
  date_of_birth date,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text not null check (category in ('mental_wellness', 'spiritual_growth', 'financial_guidance', 'hypnotherapy')),
  price decimal(10,2),
  duration integer, -- in minutes
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings table
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  service_id uuid references services(id) on delete cascade not null,
  appointment_date timestamp with time zone not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  client_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Donations table
create table if not exists donations (
  id uuid default gen_random_uuid() primary key,
  donor_name text,
  donor_email text,
  amount decimal(10,2) not null,
  payment_method text,
  payment_id text, -- Stripe payment ID
  status text default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  message text,
  is_anonymous boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Resources table
create table if not exists resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  category text not null check (category in ('mental_wellness', 'spiritual_growth', 'financial_guidance', 'hypnotherapy', 'general')),
  resource_type text not null check (resource_type in ('article', 'video', 'audio', 'pdf')),
  url text,
  thumbnail_url text,
  duration integer, -- for video/audio in seconds
  is_featured boolean default false,
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_image_url text,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  service_category text check (service_category in ('mental_wellness', 'spiritual_growth', 'financial_guidance', 'hypnotherapy')),
  is_featured boolean default false,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact messages table
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notifications table
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null check (type in ('booking', 'reminder', 'general', 'promotion')),
  is_read boolean default false,
  data jsonb, -- additional data for the notification
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies

-- Profiles policies
alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Services policies (public read)
alter table services enable row level security;

create policy "Services are viewable by everyone" on services
  for select using (is_active = true);

-- Bookings policies
alter table bookings enable row level security;

create policy "Users can view own bookings" on bookings
  for select using (auth.uid() = user_id);

create policy "Users can create own bookings" on bookings
  for insert with check (auth.uid() = user_id);

create policy "Users can update own bookings" on bookings
  for update using (auth.uid() = user_id);

-- Resources policies (public read for public resources)
alter table resources enable row level security;

create policy "Public resources are viewable by everyone" on resources
  for select using (is_public = true);

-- Notifications policies
alter table notifications enable row level security;

create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users can update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- Contact messages policies (insert only for users)
alter table contact_messages enable row level security;

create policy "Anyone can insert contact messages" on contact_messages
  for insert with check (true);

-- Testimonials policies (public read for approved)
alter table testimonials enable row level security;

create policy "Approved testimonials are viewable by everyone" on testimonials
  for select using (is_approved = true);

-- Functions and Triggers

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_services_updated_at before update on services
  for each row execute procedure update_updated_at_column();

create trigger update_bookings_updated_at before update on bookings
  for each row execute procedure update_updated_at_column();

create trigger update_resources_updated_at before update on resources
  for each row execute procedure update_updated_at_column();

-- Function to create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, created_at)
  values (new.id, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
