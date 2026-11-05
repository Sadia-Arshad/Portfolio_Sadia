import Reveal from './Reveal'

/**
 * SectionHeading - kicker, heading and optional subtitle for each section.
 * `align` can be 'left' or 'center'.
 *
 * The prop is `heading`, matching every caller. It was previously destructured
 * as `title`, which silently rendered an empty <h2> in all seven sections.
 */
export default function SectionHeading({ kicker, heading, sub, align = 'left' }) {
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
      <h2 className="section-title">{heading}</h2>
      {sub && <p className={`section-sub ${centered ? 'mx-auto' : ''}`}>{sub}</p>}
    </Reveal>
  )
}
