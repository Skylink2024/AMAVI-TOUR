import { useState, useEffect } from 'react';
import {
  useTeamMembers,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
  useUploadTeamMemberImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Plus, Edit2, X, Check, Loader2 } from 'lucide-react';
import type { TeamMember } from '../../types/content';

export default function AdminTeamEditor() {
  const { data: members, isLoading } = useTeamMembers();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();
  const uploadImage = useUploadTeamMemberImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image_url: '',
    bio: '',
  });

  const resetForm = () => {
    setFormData({ name: '', role: '', image_url: '', bio: '' });
    setNewImage(null);
    setPreviewUrl('');
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name,
        role: member.role,
        image_url: member.image_url,
        bio: member.bio,
      });
      setPreviewUrl(member.image_url || '');
    } else {
      setFormData({ name: '', role: '', image_url: '', bio: '' });
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
        await updateMember.mutateAsync({
          id: editingId,
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          image_url: imageUrl || undefined,
        });
        toast.success('Team member updated!');
      } else {
        await createMember.mutateAsync({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          image_url: imageUrl,
        });
        toast.success('Team member added!');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to save team member');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteMember.mutateAsync(id);
        toast.success('Team member deleted!');
      } catch (error) {
        toast.error('Failed to delete team member');
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
            <span>Team Section</span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} size="sm" className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
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
                      placeholder="e.g., Dance Instructor"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image</Label>
                    {previewUrl && (
                      <div className="mb-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full max-w-xs h-32 object-cover rounded-lg"
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

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Short bio and experience"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createMember.isPending || updateMember.isPending || uploadImage.isPending}
                      className="flex-1"
                    >
                      {createMember.isPending || updateMember.isPending || uploadImage.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check size={16} className="mr-2" />
                          {editingId ? 'Update Member' : 'Add Member'}
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
          </CardTitle>
          <CardDescription>Manage team members that appear on the homepage and about page</CardDescription>
        </CardHeader>
        <CardContent>
          {members && members.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="pt-6">
                    {member.image_url && (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(member)}
                        className="flex-1"
                      >
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
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
              No team members yet. Click "Add Member" to create your first team member.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}