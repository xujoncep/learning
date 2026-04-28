import type { MDXComponents } from 'mdx/types';
import { Pre } from './CodeBlock';
import { Mermaid } from './Mermaid';
import { Callout } from './Callout';
import { ZoomableImage } from './ImageZoom';
import { MDXLink } from './MDXLink';

export const mdxComponents: MDXComponents = {
  pre: (props) => <Pre {...(props as React.HTMLAttributes<HTMLPreElement>)} />,
  img: (props) => <ZoomableImage {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />,
  a: (props) => <MDXLink {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />,
  Mermaid: Mermaid as unknown as MDXComponents['div'],
  Callout: Callout as unknown as MDXComponents['div'],
};
