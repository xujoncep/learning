import type { MDXComponents } from 'mdx/types';
import { Pre } from './CodeBlock';
import { Mermaid } from './Mermaid';
import { Callout } from './Callout';

export const mdxComponents: MDXComponents = {
  pre: (props) => <Pre {...(props as React.HTMLAttributes<HTMLPreElement>)} />,
  Mermaid: Mermaid as unknown as MDXComponents['div'],
  Callout: Callout as unknown as MDXComponents['div'],
};
