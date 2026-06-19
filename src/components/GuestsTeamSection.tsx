import teamImg from "@/assets/team-mrangola.png";
import { SectionTitle } from "./SectionTitle";
import { useTeamMembers, useGuests } from "../hooks/useContent";

export function GuestsTeamSection() {
  const { data: team = [] } = useTeamMembers();
  const { data: guests = [] } = useGuests();

  return (
    <section className="py-28 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Guests Section */}
        {guests.length > 0 && (
          <>
            <SectionTitle
              eyebrow="Featuring"
              title="OUR GUESTS"
              subtitle="Icons of Angolan music and culture, on our stage."
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              {guests.map((g) => (
                <div
                  key={g.id}
                  className="glass rounded-lg p-6 text-center group hover:border-primary/60 transition-colors"
                >
                  {g.image_url ? (
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 shadow-gold group-hover:scale-105 transition-transform">
                      <img
                        src={g.image_url}
                        alt={g.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-gold flex items-center justify-center font-display text-3xl text-primary-foreground mb-4 shadow-gold group-hover:scale-105 transition-transform">
                      {g.initials}
                    </div>
                  )}
                  <h3 className="font-display text-xl tracking-wide">{g.name}</h3>
                  <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mt-2">
                    {g.role}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Team Section */}
        {team.length > 0 && (
          <>
            <SectionTitle eyebrow="Behind the scenes" title="OUR TEAM" />

            <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-elegant">
                <img
                  src={team[0]?.image_url || teamImg}
                  alt="Mr Angola team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent dark:from-black/75" />
              </div>
              <div className="space-y-6">
                {team.map((member) => (
                  <div key={member.id} className="border-l-2 border-primary pl-6">
                    <h3 className="font-display text-2xl tracking-wide">{member.name}</h3>
                    <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase mt-1">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}