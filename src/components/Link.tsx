import NextLink from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

const CustomLink = ({ href, children, ...rest }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <span {...rest}>{children}</span>
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest}>{children}</a>
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>{children}</a>
}

export default CustomLink;
