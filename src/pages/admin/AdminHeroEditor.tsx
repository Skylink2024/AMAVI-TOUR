import { useEffect, useState } from 'react'
import { useHeroSection, useUpdateHeroSection, useUploadHeroImage } from '../../hooks/useContent'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { toast } from 'sonner'

export default function AdminHeroEditor() {
  const { data: hero, isLoading } = useHeroSection()
  const updateHero = useUpdateHeroSection()
  const uploadImage = useUploadHeroImage()

  const [formData, setFormData] = useState({
    eyebrow: '',
    title: '',
    subtitle: '',
    cta_text: '',
    cta_link: '',
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (!hero) return

    setFormData({
      eyebrow: hero.eyebrow || 'Turismo & Hospitalidade em Angola',
      title: hero.title || '',
      subtitle: hero.subtitle || '',
      cta_text: hero.cta_text || '',
      cta_link: hero.cta_link || '',
    })
    setPreviewUrl(hero.image_url || '')
  }, [hero])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let updateData = { ...formData, id: hero?.id } as Record<string, unknown>

      if (selectedFile) {
        const imageUrl = await uploadImage.mutateAsync(selectedFile)
        updateData.image_url = imageUrl
        setSelectedFile(null)
      }

      await updateHero.mutateAsync(updateData)
      toast.success('Secção inicial actualizada!')
    } catch (error) {
      toast.error('Não foi possível actualizar a secção inicial')
      console.error(error)
    }
  }

  if (isLoading) return <div className="py-8 text-center text-amavi-brown/70">A carregar...</div>

  return (
    <Card className="border-amavi-brown/10">
      <CardHeader>
        <CardTitle className="text-amavi-brown">Secção Inicial (Hero)</CardTitle>
        <CardDescription>Editar o banner principal da página inicial</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Texto superior</Label>
            <Input
              value={formData.eyebrow}
              onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
              placeholder="ex: Turismo & Hospitalidade"
            />
          </div>

          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título principal"
            />
          </div>

          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Descrição curta"
            />
          </div>

          <div className="space-y-2">
            <Label>Texto do botão</Label>
            <Input
              value={formData.cta_text}
              onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
              placeholder="ex: Reservar"
            />
          </div>

          <div className="space-y-2">
            <Label>Link do botão</Label>
            <Input
              value={formData.cta_link}
              onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
              placeholder="ex: /reservar"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-amavi-brown/70 file:mr-4 file:rounded-md file:border-0 file:bg-amavi-brown file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {previewUrl && (
              <img src={previewUrl} alt="Pré-visualização" className="mt-4 max-h-64 rounded-lg object-cover" />
            )}
          </div>

          <Button
            type="submit"
            disabled={updateHero.isPending || uploadImage.isPending}
            className="w-full bg-amavi-brown hover:bg-amavi-burnt"
          >
            {updateHero.isPending || uploadImage.isPending ? 'A guardar...' : 'Guardar alterações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
