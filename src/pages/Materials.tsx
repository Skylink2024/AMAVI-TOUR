import { useMaterials } from '../hooks/useContent';
import { PageShell } from '../components/PageShell';
import { SectionTitle } from '../components/SectionTitle';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function MaterialsPage() {
  const { data: materials, isLoading } = useMaterials();

  return (
    <PageShell title="Materials">
      {isLoading ? (
        <div className="py-12 text-center">Loading...</div>
      ) : materials && materials.length > 0 ? (
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle title="Materials" />
            <p className="text-lg text-muted-foreground mt-4">
              Explore our curated collection of products designed to enhance your dance journey and connect you deeper with Angolan culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                {material.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={material.image_url}
                      alt={material.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{material.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {material.description}
                  </p>
                  <p className="text-primary font-semibold text-lg">
                    ${material.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  {material.link ? (
                    <Button asChild className="w-full">
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Purchase <ExternalLink size={16} />
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          No materials available at this time.
        </div>
      )}
    </PageShell>
  );
}