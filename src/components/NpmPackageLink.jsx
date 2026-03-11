/**
 * Link to an npm package page with npm logo and "available as an npm package" text.
 * Renders in the top-right of section when used inside .section-inner (position: relative).
 */
function NpmPackageLink({ href, ariaLabel }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="section-npm-link"
      aria-label={ariaLabel ?? 'View package on npm'}
    >
      <span className="section-npm-link__text">
        available as an{' '}
        <span className="section-npm-link__icon" aria-hidden="true">
          <img src="/logos/npm-logo.svg" alt="npm" width={24} height={24} />
        </span>{' '}
        package
      </span>
    </a>
  )
}

export default NpmPackageLink
