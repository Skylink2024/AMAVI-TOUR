import { useState } from 'react';
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
  useUploadCourseImage,
} from '../../hooks/useContent';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Loader2 } from 'lucide-react';
import { Course } from '../../types/content';

export default function AdminCoursesEditor() {
  const { data: courses, isLoading } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const uploadImage = useUploadCourseImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    price: 0,
    duration_weeks: 0,
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  });

  const handleOpenDialog = (course?: Course) => {
    setImageFile(null);
    setPreviewUrl('');
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        image_url: course.image_url,
        price: course.price,
        duration_weeks: course.duration_weeks,
        level: course.level,
      });
      setPreviewUrl(course.image_url || '');
      setEditingId(course.id);
    } else {
      setFormData({
        title: '',
        description: '',
        image_url: '',
        price: 0,
        duration_weeks: 0,
        level: 'beginner',
      });
      setEditingId(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = formData.image_url;
    try {
      if (imageFile) {
        imageUrl = await uploadImage.mutateAsync(imageFile);
      } else if (!editingId && !imageUrl) {
        toast.error('Please choose a course image (JPG, PNG, or WebP).');
        return;
      }

      if (editingId) {
        await updateCourse.mutateAsync({
          id: editingId,
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Course updated!');
      } else {
        await createCourse.mutateAsync({
          ...formData,
          image_url: imageUrl,
        });
        toast.success('Course created!');
      }
      setIsDialogOpen(false);
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      toast.error('Failed to save course');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse.mutateAsync(id);
        toast.success('Course deleted!');
      } catch (error) {
        toast.error('Failed to delete course');
        console.error(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const saving =
    createCourse.isPending || updateCourse.isPending || uploadImage.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Courses</h2>
          <p className="text-muted-foreground">Manage dance courses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus size={16} />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Beginner Semba"
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
                  placeholder="Course description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Course image</Label>
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
                  {editingId ? 'Leave empty to keep the current image.' : 'Required for new courses.'}
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
                  <Label>Duration (weeks)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.duration_weeks}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_weeks: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      level: value as 'beginner' | 'intermediate' | 'advanced',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Saving…
                  </>
                ) : editingId ? (
                  'Update Course'
                ) : (
                  'Create Course'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Card key={course.id}>
            <CardContent className="pt-6">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {course.duration_weeks} weeks • {course.level}
              </p>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>
              <p className="font-semibold mb-4">${course.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(course)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
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
