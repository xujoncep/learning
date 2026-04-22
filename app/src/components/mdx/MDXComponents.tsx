import type { MDXComponents } from 'mdx/types';
import { Pre } from './CodeBlock';
import { Mermaid } from './Mermaid';
import { Callout } from './Callout';
import { ZoomableImage } from './ImageZoom';

export const mdxComponents: MDXComponents = {
  pre: (props) => <Pre {...(props as React.HTMLAttributes<HTMLPreElement>)} />,
  img: (props) => <ZoomableImage {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />,
  Mermaid: Mermaid as unknown as MDXComponents['div'],
  Callout: Callout as unknown as MDXComponents['div'],
};
