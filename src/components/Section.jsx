import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Extra padding (px) added to section-inner on each side when using serpentine border, for visible space between content and border. */
const SECTION_INNER_CLEARANCE = 32

const DEFAULT_HEIGHT_TRANSITION_MS = 400

function Section({
  children,
  className = '',
  backgroundImage,
  backgroundColor,
  animateOnScroll = true,
  animateHeight = true,
  heightTransitionMs = DEFAULT_HEIGHT_TRANSITION_MS,
  sectionPadding,
  ...props
}) {
  const ref = useRef(null)
  const measureRef = useRef(null)
  const firstHeightMeasureRef = useRef(false)
  const [isVisible, setIsVisible] = useState(!animateOnScroll)
  const [heightPx, setHeightPx] = useState(null)
  const [heightTransitionEnabled, setHeightTransitionEnabled] = useState(false)

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
          ['--section-height-duration']: `${heightTransitionMs}ms`,
        }
      : animateHeight
        ? { ['--section-height-duration']: `${heightTransitionMs}ms` }
        : undefined

  useLayoutEffect(() => {
    if (!animateHeight) return
    const el = measureRef.current
    if (!el) return

    const update = () => {
      const h = el.scrollHeight
      if (h <= 0) return
      setHeightPx(h)
      if (!firstHeightMeasureRef.current) {
        firstHeightMeasureRef.current = true
        requestAnimationFrame(() => setHeightTransitionEnabled(true))
      }
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      ro.disconnect()
    }
  }, [animateHeight])

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

  const heightShellStyle =
    animateHeight && heightPx != null
      ? {
          height: heightPx,
          transition: heightTransitionEnabled
            ? `height ${heightTransitionMs}ms ease-out`
            : 'none',
        }
      : undefined

  const innerContent = animateHeight ? (
    <div className="section-inner__height-shell" style={heightShellStyle}>
      <div ref={measureRef} className="section-inner__measure">
        {children}
      </div>
    </div>
  ) : (
    children
  )

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
        {innerContent}
      </div>
    </section>
  )
}

export default Section
