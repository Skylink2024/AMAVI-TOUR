import { useState } from 'react';
import {
  useDances,
  useCreateDance,
  useUpdateDance,
  useDeleteDance,
  useUploadDanceImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Loader2 } from 'lucide-react';
import { Dance } from '../../types/content';

export default function AdminDancesEditor() {
  const { data: dances, isLoading } = useDances();
  const createDance = useCreateDance();
  const updateDance = useUpdateDance();
  const deleteDance = useDeleteDance();
  const uploadImage = useUploadDanceImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    price: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const resetImagePickers = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  const handleOpenDialog = (dance?: Dance) => {
    resetImagePickers();
    if (dance) {
      setFormData({
        name: dance.name,
        description: dance.description,
        image_url: dance.image_url,
        price: dance.price,
      });
      setPreviewUrl(dance.image_url || '');
      setEditingId(dance.id);
    } else {
      setFormData({ name: '', description: '', image_url: '', price: 0 });
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image_url;
    try {
      if (imageFile) {
        imageUrl = await uploadImage.mutateAsync(imageFile);
      } else if (!editingId && !imageUrl) {
        toast.error('Please choose an image file (JPG, PNG, or WebP).');
        return;
      }

      if (editingId) {
        await updateDance.mutateAsync({
          id: editingId,
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Dance updated!');
      } else {
        await createDance.mutateAsync({
          name: formData.name,
          description: formData.description,
          image_url: imageUrl,
          price: formData.price,
        });
        toast.success('Dance created!');
      }
      setIsDialogOpen(false);
      resetImagePickers();
    } catch (error) {
      toast.error('Failed to save dance');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this dance?')) {
      try {
        await deleteDance.mutateAsync(id);
        toast.success('Dance deleted!');
      } catch (error) {
        toast.error('Failed to delete dance');
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const saving = createDance.isPending || updateDance.isPending || uploadImage.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dances</h2>
          <p className="text-muted-foreground">Manage dance offerings — upload JPG, PNG, or WebP</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus size={16} />
              Add Dance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Dance' : 'Add New Dance'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Dance Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Semba"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Dance description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Photo</Label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt=""
                    className="w-full max-w-sm h-40 object-cover rounded-lg border border-border"
                  />
                )}
                <Input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} />
                <p className="text-xs text-muted-foreground">
                  {editingId ? 'Leave empty to keep the current image.' : 'Required for new dances.'}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
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
                  'Update Dance'
                ) : (
                  'Create Dance'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dances?.map((dance) => (
          <Card key={dance.id}>
            <CardContent className="pt-6">
              {dance.image_url && (
                <img
                  src={dance.image_url}
                  alt={dance.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{dance.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dance.description}</p>
              <p className="font-semibold mb-4">${dance.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(dance)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(dance.id)}
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
