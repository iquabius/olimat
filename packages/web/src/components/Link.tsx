import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

// These types are from nextjs-with-typescript example in Material-UI's repo:
// https://github.com/mui-org/material-ui/blob/ae047a72f/examples/nextjs-with-typescript/src/Link.tsx
type NextComposedProps = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	'href'
> &
	NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
	(props, ref) => {
		const {
			as,
			href,
			children,
			replace,
			scroll,
			passHref,
			shallow,
			prefetch,
			...other
		} = props;

		return (
			<NextLink
				href={href}
				prefetch={prefetch}
				as={as}
				replace={replace}
				scroll={scroll}
				shallow={shallow}
				passHref={passHref}
			>
				<a ref={ref} {...other}>
					{children}
				</a>
			</NextLink>
		);
	},
);

// https://github.com/yannickcr/eslint-plugin-react/issues/2269
NextComposed.displayName = 'NextComposed';

interface LinkPropsBase {
	activeClassName?: string;
	innerRef?: React.Ref<HTMLAnchorElement>;
	naked?: boolean;
}

export type LinkProps = LinkPropsBase &
	NextComposedProps &
	Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const LinkWithRef: React.FC<LinkProps> = (props) => {
	const {
		activeClassName = 'active',
		className: classNameProps,
		href,
		innerRef,
		naked,
		role: roleProp,
		...other
	} = props;

	const router = useRouter();
	const pathname = typeof href === 'string' ? href : href.pathname;
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
	});

	// catch role passed from ButtonBase. This is definitely a link
	const role = roleProp === 'button' ? undefined : roleProp;

	// Next.js' Link supports an UrlObject:
	// https://nextjs.org/docs/api-reference/next/link#with-url-object
	const hrefHack = typeof href === 'string' ? href : href.protocol;
	const isExternal =
		hrefHack.indexOf('https:') === 0 || hrefHack.indexOf('mailto:') === 0;

	if (isExternal) {
		return (
			<MuiLink
				className={className}
				href={href as string}
				ref={innerRef}
				role={role}
				{...other}
			/>
		);
	}

	if (naked) {
		return (
			<NextComposed
				className={className}
				href={href}
				ref={innerRef}
				role={role}
				{...other}
			/>
		);
	}

	return (
		<MuiLink
			component={NextComposed}
			className={className}
			href={href as string}
			ref={innerRef}
			role={role}
			{...other}
		/>
	);
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<LinkWithRef {...props} innerRef={ref} />
));

Link.displayName = 'Link';

export default Link;
