import type { ProjectContent } from '@/content/types'

interface ProjectHeadingProps {
  project: ProjectContent
  compact?: boolean
}

export default function ProjectHeading({ project, compact = false }: ProjectHeadingProps) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="font-mono text-[11.5px] tracking-[0.08em] text-accent">
          {project.number}
        </span>
        <span className="text-[13px] text-text-muted">{project.category}</span>
      </div>
      <h3 className={`${compact ? 'text-[28px]' : 'text-[30px]'} mb-3 font-extrabold tracking-[-0.01em] text-text`}>
        {project.title}
      </h3>
      <p className={`${compact ? 'text-[15.5px]' : 'text-base'} mb-5 leading-[1.65] text-text-secondary`}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 px-[11px] py-[5px] font-mono text-[11px] tracking-[0.06em] text-[#b4bac4]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
