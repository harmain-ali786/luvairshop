-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles (admins can read all, users can read their own)
CREATE POLICY "Users can read their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  is_new BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products (public read, admin write)
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products"
ON public.products
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products"
ON public.products
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for orders (public insert, admin read/update)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can view orders"
ON public.orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update orders"
ON public.orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updating products updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products from the existing data
INSERT INTO public.products (name, price, original_price, image, category, description, is_new, is_best_seller) VALUES
('Classic White Sneakers', 89.99, 129.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772', 'men', 'Comfortable white sneakers for everyday wear', true, true),
('Running Shoes Pro', 149.99, 199.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'sports', 'Professional running shoes with advanced cushioning', true, true),
('Leather Boots', 199.99, 249.99, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f', 'men', 'Premium leather boots for style and durability', false, true),
('Women''s Heel Sandals', 79.99, 109.99, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', 'women', 'Elegant heel sandals for special occasions', true, false),
('Canvas Sneakers', 59.99, 79.99, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', 'casual', 'Casual canvas sneakers in various colors', false, false),
('Basketball High-Tops', 129.99, 169.99, 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2', 'sports', 'High-performance basketball shoes', true, true),
('Women''s Flats', 69.99, 89.99, 'https://images.unsplash.com/photo-1560343090-f0409e92791a', 'women', 'Comfortable flats for daily wear', false, true),
('Hiking Boots', 179.99, 229.99, 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0', 'sports', 'Durable hiking boots for outdoor adventures', false, false),
('Slip-On Loafers', 89.99, 119.99, 'https://images.unsplash.com/photo-1533867617858-e7b97e060509', 'casual', 'Easy slip-on loafers for casual style', false, false),
('Athletic Trainers', 119.99, 159.99, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', 'sports', 'Versatile athletic trainers for gym and training', true, false);