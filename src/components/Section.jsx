import { useEffect, useRef, useState } from 'react'

/** Extra padding (px) added to section-inner on each side when using serpentine border, for visible space between content and border. */
const SECTION_INNER_CLEARANCE = 32

function Section({
  children,
  className = '',
  backgroundImage,
  backgroundColor,
  animateOnScroll = true,
  sectionPadding,
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(!animateOnScroll)

  const paddingTop = sectionPadding != null ? sectionPadding.top + SECTION_INNER_CLEARANCE : undefined
  const paddingRight = sectionPadding != null ? sectionPadding.right + SECTION_INNER_CLEARANCE : undefined
  const paddingBottom = sectionPadding != null ? sectionPadding.bottom + SECTION_INNER_CLEARANCE : undefined
  const paddingLeft = sectionPadding != null ? sectionPadding.left + SECTION_INNER_CLEARANCE : undefined

  const innerStyle =
    sectionPadding != null
      ? {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          ['--section-npm-inset-top']: `${paddingTop}px`,
          ['--section-npm-inset-right']: `${paddingRight}px`,
        }
      : undefined

  useEffect(() => {
    if (!animateOnScroll) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-15% 0px -78% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animateOnScroll])

  return (
    <section
      ref={ref}
      className={`section ${isVisible ? 'section-visible' : ''} ${className}`.trim()}
      {...props}
    >
      <div
        className="section-bg"
        style={{ backgroundColor: backgroundColor ?? 'transparent' }}
        aria-hidden="true"
      >
        {backgroundImage && (
          <div
            className="section-bg__ghost"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
      </div>
      <div className="section-inner" style={innerStyle}>
        {children}
      </div>
    </section>
  )
}

export default Section
