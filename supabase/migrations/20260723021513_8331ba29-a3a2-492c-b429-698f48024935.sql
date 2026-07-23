
CREATE TABLE public.slide_image_slots (
  slot_key TEXT PRIMARY KEY,
  image_url TEXT,
  storage_path TEXT,
  position TEXT NOT NULL DEFAULT 'center',
  object_fit TEXT NOT NULL DEFAULT 'cover',
  size_percent INT NOT NULL DEFAULT 100,
  overlay_opacity INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.slide_image_slots TO anon, authenticated;
GRANT ALL ON public.slide_image_slots TO service_role;
ALTER TABLE public.slide_image_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read image slots" ON public.slide_image_slots FOR SELECT USING (true);
CREATE POLICY "public write image slots" ON public.slide_image_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "public update image slots" ON public.slide_image_slots FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete image slots" ON public.slide_image_slots FOR DELETE USING (true);

CREATE TABLE public.slide_content (
  content_key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.slide_content TO anon, authenticated;
GRANT ALL ON public.slide_content TO service_role;
ALTER TABLE public.slide_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read content" ON public.slide_content FOR SELECT USING (true);
CREATE POLICY "public write content" ON public.slide_content FOR INSERT WITH CHECK (true);
CREATE POLICY "public update content" ON public.slide_content FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete content" ON public.slide_content FOR DELETE USING (true);
