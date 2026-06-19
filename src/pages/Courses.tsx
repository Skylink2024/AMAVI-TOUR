import { PageShell } from '../components/PageShell'
import { Clock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useCourses } from '../hooks/useContent'
import type { Course } from '../types/content'

function formatLevel(level: Course['level']): string {
  const labels: Record<Course['level'], string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return labels[level] ?? level
}

export default function CoursesPage() {
  const { data: courses = [], isLoading } = useCourses()
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  return (
    <PageShell
      eyebrow="Learn"
      title="OUR COURSES"
      subtitle="From your first step to performance level — taught by Angolan masters."
    >
      {isLoading ? (
        <div className="py-16 text-center text-muted-foreground">Loading courses…</div>
      ) : courses.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No courses yet. Add them in the admin dashboard under Courses.
        </p>
      ) : (
        <div className="space-y-8">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-card border border-border/50 hover:border-primary/60 transition-all overflow-hidden"
            >
              <div className="group flex flex-col md:flex-row gap-6 p-6">
                <div className="relative w-full md:w-64 h-48 overflow-hidden flex-shrink-0 bg-muted">
                  {c.image_url ? (
                    <img
                      src={c.image_url}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : null}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2 font-display">
                      {formatLevel(c.level)}
                    </p>
                    <h3 className="font-display text-3xl mb-3">{c.title}</h3>
                    <p className="text-muted-foreground mb-4">{c.description}</p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" /> {c.duration_weeks} weeks
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-6">
                    <span className="font-display text-3xl text-primary">${Number(c.price).toFixed(0)}</span>
                    <button
                      type="button"
                      onClick={() => setExpandedCourse(expandedCourse === c.id ? null : c.id)}
                      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors shimmer-gold-hover px-4 py-2 border border-primary"
                    >
                      {expandedCourse === c.id ? 'Hide' : 'View'} details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {expandedCourse === c.id && (
                <div className="border-t border-border/50 bg-background/50 p-6 space-y-4">
                  <h4 className="font-display text-xl uppercase tracking-widest text-primary mb-2">
                    About this course
                  </h4>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{c.description}</p>
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <button
                      type="button"
                      className="w-full bg-primary text-primary-foreground py-3 font-display tracking-widest uppercase hover:bg-primary/90 transition-colors shimmer-gold-hover"
                    >
                      Enroll — ${Number(c.price).toFixed(0)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
