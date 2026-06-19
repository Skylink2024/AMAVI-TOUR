import { useState } from 'react';
import {
  useHotels,
  useCreateHotel,
  useUpdateHotel,
  useDeleteHotel,
  useUploadHotelImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Loader2 } from 'lucide-react';
import { Hotel } from '../../types/content';

export default function AdminHotelsEditor() {
  const { data: hotels, isLoading } = useHotels();
  const createHotel = useCreateHotel();
  const updateHotel = useUpdateHotel();
  const deleteHotel = useDeleteHotel();
  const uploadImage = useUploadHotelImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    price_per_night: 0,
    image_url: '',
    link: '',
  });

  const handleOpenDialog = (hotel?: Hotel) => {
    setImageFile(null);
    setPreviewUrl('');
    if (hotel) {
      setFormData({
        name: hotel.name,
        description: hotel.description,
        address: hotel.address,
        price_per_night: hotel.price_per_night,
        image_url: hotel.image_url,
        link: hotel.link,
      });
      setPreviewUrl(hotel.image_url || '');
      setEditingId(hotel.id);
    } else {
      setFormData({
        name: '',
        description: '',
        address: '',
        price_per_night: 0,
        image_url: '',
        link: '',
      });
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image_url;
    try {
      if (imageFile) {
        imageUrl = await uploadImage.mutateAsync(imageFile);
      }

      if (editingId) {
        await updateHotel.mutateAsync({
          id: editingId,
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Hotel updated!');
      } else {
        await createHotel.mutateAsync({
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Hotel added!');
      }
      setIsDialogOpen(false);
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      toast.error('Failed to save hotel');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hotel?')) {
      try {
        await deleteHotel.mutateAsync(id);
        toast.success('Hotel deleted!');
      } catch (error) {
        toast.error('Failed to delete hotel');
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const saving = createHotel.isPending || updateHotel.isPending || uploadImage.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hotels</h2>
          <p className="text-muted-foreground">Manage hotel recommendations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus size={16} />
              Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Hotel' : 'Add Hotel'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Hotel Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Luxury Resort Luanda"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Hotel description and amenities"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Hotel address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Price Per Night</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_per_night}
                  onChange={(e) =>
                    setFormData({ ...formData, price_per_night: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Hotel photo (optional)</Label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt=""
                    className="w-full max-w-sm h-36 object-cover rounded-lg border border-border"
                  />
                )}
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      const r = new FileReader();
                      r.onloadend = () => setPreviewUrl(r.result as string);
                      r.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Booking Link</Label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://booking.com/..."
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Saving…
                  </>
                ) : editingId ? (
                  'Update Hotel'
                ) : (
                  'Add Hotel'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {hotels?.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="pt-6">
              {hotel.image_url && (
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{hotel.address}</p>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {hotel.description}
              </p>
              <p className="font-semibold mb-4">${hotel.price_per_night.toFixed(2)}/night</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(hotel)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(hotel.id)}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
