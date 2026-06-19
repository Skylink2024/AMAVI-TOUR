import { useState } from 'react';
import {
  useEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  useUploadEventImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Loader2 } from 'lucide-react';
import { Event } from '../../types/content';

export default function AdminEventsEditor() {
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const uploadImage = useUploadEventImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image_url: '',
    price: 0,
    capacity: 0,
  });

  const handleOpenDialog = (event?: Event) => {
    setImageFile(null);
    setPreviewUrl('');
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        image_url: event.image_url,
        price: event.price,
        capacity: event.capacity,
      });
      setPreviewUrl(event.image_url || '');
      setEditingId(event.id);
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image_url: '',
        price: 0,
        capacity: 0,
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
      } else if (!editingId && !imageUrl) {
        toast.error('Please choose an event image (JPG, PNG, or WebP).');
        return;
      }

      if (editingId) {
        await updateEvent.mutateAsync({
          id: editingId,
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Event updated!');
      } else {
        await createEvent.mutateAsync({
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Event created!');
      }
      setIsDialogOpen(false);
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      toast.error('Failed to save event');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent.mutateAsync(id);
        toast.success('Event deleted!');
      } catch (error) {
        toast.error('Failed to delete event');
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const saving = createEvent.isPending || updateEvent.isPending || uploadImage.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-muted-foreground">Manage event listings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus size={16} />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Angola Festival 2024"
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
                  placeholder="Event description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Grand Hall, Luanda"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Event image</Label>
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
                <p className="text-xs text-muted-foreground">
                  {editingId ? 'Leave empty to keep the current image.' : 'Required for new events.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Saving…
                  </>
                ) : editingId ? (
                  'Update Event'
                ) : (
                  'Create Event'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {events?.map((event) => (
          <Card key={event.id}>
            <CardContent className="pt-6">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{event.date} at {event.time}</p>
              <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>
              <p className="font-semibold mb-4">
                ${event.price.toFixed(2)} • {event.capacity} seats
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(event)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
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
