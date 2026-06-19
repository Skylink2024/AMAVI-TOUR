import { useState, useEffect } from 'react';
import { useMaterials, useCreateMaterial, useUpdateMaterial, useDeleteMaterial, useUploadMaterialImage } from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import type { Material } from '../../types/content';

export default function AdminMaterialsEditor() {
  const { data: materials, isLoading } = useMaterials();
  const createMaterial = useCreateMaterial();
  const updateMaterial = useUpdateMaterial();
  const deleteMaterial = useDeleteMaterial();
  const uploadImage = useUploadMaterialImage();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    link: '',
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', link: '' });
    setNewImage(null);
    setPreviewUrl('');
    setIsCreating(false);
    setEditingId(null);
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
      let imageUrl = '';

      if (newImage) {
        imageUrl = await uploadImage.mutateAsync(newImage);
      }

      if (editingId) {
        await updateMaterial.mutateAsync({
          id: editingId,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price) || 0,
          link: formData.link,
          image_url: imageUrl || undefined,
        });
        toast.success('Material updated!');
      } else {
        await createMaterial.mutateAsync({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price) || 0,
          link: formData.link,
          image_url: imageUrl,
        });
        toast.success('Material created!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving material:', error);
      toast.error('Failed to save material');
    }
  };

  const handleEdit = (material: Material) => {
    setEditingId(material.id);
    setFormData({
      name: material.name,
      description: material.description,
      price: material.price.toString(),
      link: material.link,
    });
    setPreviewUrl(material.image_url || '');
    setIsCreating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      await deleteMaterial.mutateAsync(id);
      toast.success('Material deleted!');
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Failed to delete material');
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading materials...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Materials Section</span>
            {!isCreating && !editingId && (
              <Button onClick={() => setIsCreating(true)} size="sm">
                <Plus size={16} className="mr-2" />
                Add Material
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Manage products and materials for sale
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(isCreating || editingId) && (
            <form onSubmit={handleSubmit} className="space-y-6 mb-8 p-6 border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {editingId ? 'Edit Material' : 'Add New Material'}
                </h3>
                <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the product..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="link">Purchase Link</Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMaterial.isPending || updateMaterial.isPending || uploadImage.isPending}
                  className="flex-1"
                >
                  {createMaterial.isPending || updateMaterial.isPending || uploadImage.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} className="mr-2" />
                      {editingId ? 'Update Material' : 'Create Material'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Existing Materials ({materials?.length || 0})</h3>

            {materials && materials.length > 0 ? (
              <div className="grid gap-4">
                {materials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {material.image_url && (
                          <img
                            src={material.image_url}
                            alt={material.name}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold">{material.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {material.description}
                              </p>
                              <p className="text-primary font-semibold mt-1">
                                ${material.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(material)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(material.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          {material.link && (
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline mt-1 inline-block"
                            >
                              {material.link}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No materials yet. Click "Add Material" to create your first product.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}