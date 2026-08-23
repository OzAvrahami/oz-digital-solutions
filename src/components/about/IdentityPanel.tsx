interface IdentityPanelProps {
  name: string
}

export default function IdentityPanel({ name }: IdentityPanelProps) {
  return (
    <div
      aria-hidden="true"
      className="relative isolate mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-surface-raised desktop:max-w-none"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
        }}
      />
      <div className="pointer-events-none absolute -end-20 top-[18%] size-[240px] rounded-full bg-accent/[0.09] blur-[70px]" />
      <div className="pointer-events-none absolute inset-[18px] rounded-[13px] border border-white/[0.04]" />

      <div className="pointer-events-none absolute start-5 top-5 flex items-center gap-2 font-mono text-[10px] font-medium tracking-[0.18em] text-text-quiet">
        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(77,125,255,0.8)]" />
        <span>OA</span>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8">
        <div className="relative flex size-[148px] items-center justify-center rounded-full border border-white/[0.06] min-[401px]:size-[164px]">
          <div className="absolute inset-[10px] rounded-full border border-dashed border-white/[0.05]" />
          <span className="pe-[0.12em] font-mono text-[54px] font-medium tracking-[-0.12em] text-white/[0.14] min-[401px]:text-[60px]">
            OA
          </span>
          <span className="absolute bottom-[18px] end-[8px] size-2 rounded-full bg-accent shadow-[0_0_18px_rgba(77,125,255,0.75)]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-[12px] border border-white/[0.07] bg-canvas/70 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="text-[17px] font-bold tracking-[-0.02em] text-text min-[401px]:text-lg">
            {name}
          </span>
        </div>
      </div>
    </div>
  )
}
