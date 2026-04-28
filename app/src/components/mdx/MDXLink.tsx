import type { AnchorHTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function isHashOnly(href: string): boolean {
  return href.startsWith('#');
}

// Resolve a relative href against the current pathname so MDX links written
// like `01-foo.md` (which the converter rewrites to `01-foo`) navigate to the
// correct chapter regardless of how the index page was reached.
//
// Examples while at `/docs/dbms/00-master-index`:
//   "01-foo"           → "/docs/dbms/01-foo"
//   "../c-programming" → "/docs/c-programming"
//   "/handbooks"       → "/handbooks"            (already absolute)
function resolveRelative(href: string, currentPath: string): string {
  if (href.startsWith('/')) return href;
  // Strip trailing slash so the last segment is treated as a file, not a dir.
  const baseSegments = currentPath.replace(/\/$/, '').split('/');
  baseSegments.pop(); // drop the current "filename"
  const hrefSegments = href.split('/');
  for (const seg of hrefSegments) {
    if (seg === '.' || seg === '') continue;
    if (seg === '..') {
      baseSegments.pop();
      continue;
    }
    baseSegments.push(seg);
  }
  return baseSegments.join('/') || '/';
}

export function MDXLink({ href, children, ...rest }: Props) {
  const location = useLocation();

  if (!href) {
    return <a {...rest}>{children}</a>;
  }

  if (isExternal(href)) {
    return (
      <a {...rest} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (isHashOnly(href)) {
    // In-page anchors — let the browser handle the smooth scroll.
    return (
      <a {...rest} href={href}>
        {children}
      </a>
    );
  }

  // Split off any trailing #hash so React Router can include it in `to`.
  const hashIndex = href.indexOf('#');
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hashPart = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const resolved = resolveRelative(pathPart, location.pathname) + hashPart;

  return (
    <Link to={resolved} {...rest}>
      {children}
    </Link>
  );
}
