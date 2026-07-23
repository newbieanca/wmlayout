
CREATE POLICY "public read slide-images" ON storage.objects FOR SELECT USING (bucket_id = 'slide-images');
CREATE POLICY "public upload slide-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'slide-images');
CREATE POLICY "public update slide-images" ON storage.objects FOR UPDATE USING (bucket_id = 'slide-images') WITH CHECK (bucket_id = 'slide-images');
CREATE POLICY "public delete slide-images" ON storage.objects FOR DELETE USING (bucket_id = 'slide-images');
