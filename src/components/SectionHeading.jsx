import Reveal from './Reveal'

/**
 * SectionHeading — kicker, title and optional subtitle for each section.
 * `align` can be 'left' or 'center'.
 */
export default function SectionHeading({ kicker, title, sub, align = 'left' }) {
  const centered = align === 'center'

  return (
    <Reveal className={centered ? 'flex flex-col items-center text-center' : ''}>
      <p className="section-label">
        {kicker && (
          <>
            <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
            {kicker}
          </>
        )}
      </p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className={`section-sub ${centered ? 'mx-auto' : ''}`}>{sub}</p>}
    </Reveal>
  )
}
