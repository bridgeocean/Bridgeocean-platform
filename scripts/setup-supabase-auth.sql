-- Enable Row Level Security on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;

-- Create policy for users to read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Create policy for admins to view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Create policy for admins to update any user
CREATE POLICY "Admins can update any user" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Create policy for new user insertion
CREATE POLICY "Enable insert for authenticated users only" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, status, created_at)
  VALUES (
    NEW.id::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'user',
    'approved',
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create your admin user (replace with your actual admin email)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  'bridgeocean@cyberservices.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"name": "BridgeOcean Admin"}',
  false,
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Insert admin user into users table
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  status,
  created_at
) 
SELECT 
  id::text,
  email,
  'BridgeOcean Admin',
  'admin',
  'approved',
  NOW()
FROM auth.users 
WHERE email = 'bridgeocean@cyberservices.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'approved';
