import { useState } from 'react';
import {
  useGallery,
  useCreateGalleryItem,
  useDeleteGalleryItem,
  useUploadGalleryImage,
  useUploadGalleryVideo,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { Trash2, Plus, Loader2 } from 'lucide-react';

export default function AdminGalleryEditor() {
  const { data: galleryItems, isLoading } = useGallery();
  const createItem = useCreateGalleryItem();
  const deleteItem = useDeleteGalleryItem();
  const uploadImage = useUploadGalleryImage();
  const uploadVideo = useUploadGalleryVideo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    video_url: '',
    type: 'image' as 'image' | 'video',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleOpenDialog = () => {
    setFormData({
      title: '',
      image_url: '',
      video_url: '',
      type: 'image' as 'image' | 'video',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (formData.type === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;
      let videoUrl = formData.video_url;

      if (selectedFile) {
        if (formData.type === 'image') {
          imageUrl = await uploadImage.mutateAsync(selectedFile);
        } else {
          videoUrl = await uploadVideo.mutateAsync(selectedFile);
        }
      }

      await createItem.mutateAsync({
        title: formData.title,
        image_url: imageUrl,
        video_url: videoUrl,
        type: formData.type,
      });
      toast.success('Gallery item added!');
      setIsDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      toast.error('Failed to add gallery item');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem.mutateAsync(id);
        toast.success('Gallery item deleted!');
      } catch (error) {
        toast.error('Failed to delete gallery item');
        console.error(error);
      }
    }
  };

  const isUploading = uploadImage.isPending || uploadVideo.isPending || createItem.isPending;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gallery</h2>
          <p className="text-muted-foreground">Manage gallery images and videos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus size={16} />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Gallery Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Festival 2024 Highlights"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => {
                    setFormData({ ...formData, type: value as 'image' | 'video' });
                    setSelectedFile(null);
                    setPreviewUrl('');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{formData.type === 'image' ? 'Image File' : 'Video File'}</Label>
                <Input
                  type="file"
                  accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                  required={!selectedFile}
                  className="block w-full"
                />
                {previewUrl && formData.type === 'image' && (
                  <div className="mt-2">
                    <img src={previewUrl} alt="Preview" className="max-h-40 rounded-lg" />
                  </div>
                )}
                {selectedFile && formData.type === 'video' && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Add Item'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleryItems?.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              {item.type === 'image' && item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              {item.type === 'video' && item.video_url && (
                <div className="w-full h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Video: {item.title}</span>
                </div>
              )}
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 capitalize">{item.type}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
