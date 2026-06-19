import { useAbout, useTeamMembers } from '../hooks/useContent';
import { PageShell } from '../components/PageShell';
import { SectionTitle } from '../components/SectionTitle';
import teamImg from '../assets/team-mrangola.png';

export default function AboutPage() {
  const { data: about, isLoading: aboutLoading } = useAbout();
  const { data: team = [] } = useTeamMembers();

  if (aboutLoading) {
    return (
      <PageShell title="About Us">
        <div className="py-12 text-center">Loading...</div>
      </PageShell>
    );
  }

  return (
    <PageShell title="About Us">
      {about ? (
        <div className="space-y-16">
          {/* Main About Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {about.image_url && (
              <img
                src={about.image_url}
                alt={about.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
            <div className="space-y-4">
              <SectionTitle title={about.title} />
              <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
                {about.description}
              </p>
            </div>
          </div>

          {/* Team Section */}
          {team.length > 0 && (
            <div className="pt-8 border-t">
              <SectionTitle title="Our Team" />
              <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto mt-8">
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-elegant">
                  <img
                    src={team[0]?.image_url || teamImg}
                    alt="Mr Angola team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
                <div className="space-y-6">
                  {team.map((member) => (
                    <div key={member.id} className="border-l-2 border-primary pl-6">
                      <h3 className="font-display text-2xl tracking-wide">{member.name}</h3>
                      <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase mt-1">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">No about content available</div>
      )}
    </PageShell>
  );
}