import { useEffect, useRef, useState } from 'react'

function Section({
  children,
  className = '',
  backgroundImage,
  backgroundColor,
  animateOnScroll = true,
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(!animateOnScroll)

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
      <div className="section-inner">{children}</div>
    </section>
  )
}

export default Section
