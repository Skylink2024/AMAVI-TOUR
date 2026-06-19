import { useState, useEffect } from 'react';
import { useAbout, useUpdateAbout, useUploadAboutImage } from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminAboutEditor() {
  const { data: about, isLoading } = useAbout();
  const updateAbout = useUpdateAbout();
  const uploadImage = useUploadAboutImage();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!about) return;
    setFormData({
      title: about.title || 'Mr Angola',
      description: about.description || '',
    });
    setPreviewUrl(about.image_url || '');
  }, [about]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = about?.image_url;

      if (newImage) {
        const uploadResult = await uploadImage.mutateAsync(newImage);
        imageUrl = uploadResult;
      }

      await updateAbout.mutateAsync({
        id: about?.id || 'about-1',
        title: formData.title,
        description: formData.description,
        image_url: imageUrl || '',
        created_at: about?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      toast.success('About section updated!');
      setNewImage(null);
    } catch (error) {
      console.error('Error updating about:', error);
      toast.error('Failed to update about section');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading about section...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Manage your about page content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="About Angola Rhythms"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write about your company..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Image</Label>
              {previewUrl && (
                <div className="mb-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full max-w-sm h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-sm text-muted-foreground mt-2">JPG or PNG, max 5MB</p>
            </div>

            <Button
              type="submit"
              disabled={updateAbout.isPending || uploadImage.isPending}
              className="w-full"
            >
              {updateAbout.isPending || uploadImage.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save About Section'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
