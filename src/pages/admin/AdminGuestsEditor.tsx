import { useState } from 'react';
import {
  useGuests,
  useCreateGuest,
  useUpdateGuest,
  useDeleteGuest,
  useUploadGuestImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Plus, Edit2, X, Check, Loader2 } from 'lucide-react';
import type { Guest } from '../../types/content';

export default function AdminGuestsEditor() {
  const { data: guests, isLoading } = useGuests();
  const createGuest = useCreateGuest();
  const updateGuest = useUpdateGuest();
  const deleteGuest = useDeleteGuest();
  const uploadImage = useUploadGuestImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image_url: '',
    initials: '',
  });

  const resetForm = () => {
    setFormData({ name: '', role: '', image_url: '', initials: '' });
    setNewImage(null);
    setPreviewUrl('');
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleOpenDialog = (guest?: Guest) => {
    if (guest) {
      setEditingId(guest.id);
      setFormData({
        name: guest.name,
        role: guest.role,
        image_url: guest.image_url,
        initials: guest.initials,
      });
      setPreviewUrl(guest.image_url || '');
    } else {
      setFormData({ name: '', role: '', image_url: '', initials: '' });
      setPreviewUrl('');
      setNewImage(null);
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

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
      let imageUrl = formData.image_url;

      if (newImage) {
        imageUrl = await uploadImage.mutateAsync(newImage);
      }

      if (editingId) {
        await updateGuest.mutateAsync({
          id: editingId,
          name: formData.name,
          role: formData.role,
          initials: formData.initials,
          image_url: imageUrl || undefined,
        });
        toast.success('Guest updated!');
      } else {
        await createGuest.mutateAsync({
          name: formData.name,
          role: formData.role,
          initials: formData.initials,
          image_url: imageUrl,
        });
        toast.success('Guest added!');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to save guest');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this guest?')) {
      try {
        await deleteGuest.mutateAsync(id);
        toast.success('Guest deleted!');
      } catch (error) {
        toast.error('Failed to delete guest');
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Guests Section</span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Button onClick={() => handleOpenDialog()} size="sm" className="flex items-center gap-2">
                <Plus size={16} />
                Add Guest
              </Button>
            </Dialog>
          </CardTitle>
          <CardDescription>Manage special guests that appear on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Guest' : 'Add Guest'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Special Guest · Singer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Initials</Label>
                  <Input
                    value={formData.initials}
                    onChange={(e) => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                    placeholder="e.g., AR"
                    maxLength={4}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Used for the circular avatar if no image</p>
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  {previewUrl && (
                    <div className="mb-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-24 h-24 mx-auto rounded-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <p className="text-sm text-muted-foreground">JPG or PNG, max 5MB</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={createGuest.isPending || updateGuest.isPending || uploadImage.isPending}
                    className="flex-1"
                  >
                    {createGuest.isPending || updateGuest.isPending || uploadImage.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={16} className="mr-2" />
                        {editingId ? 'Update Guest' : 'Add Guest'}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X size={16} />
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {guests && guests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {guests.map((guest) => (
                <Card key={guest.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      {guest.image_url ? (
                        <img
                          src={guest.image_url}
                          alt={guest.name}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center font-display text-xl text-primary-foreground flex-shrink-0">
                          {guest.initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1">{guest.name}</h3>
                        <p className="text-sm text-primary mb-2">{guest.role}</p>
                        <p className="text-sm text-muted-foreground">Initials: {guest.initials}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(guest)}
                        className="flex-1"
                      >
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(guest.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No guests yet. Click "Add Guest" to create your first guest.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}