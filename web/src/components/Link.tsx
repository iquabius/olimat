import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import NextLink from 'next/link';
import { withRouter } from 'next/router';
import React, { ReactEventHandler, KeyboardEventHandler } from 'react';
import compose from 'recompose/compose';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    default: {
      color: 'inherit',
    },
    primary: {
      color: theme.palette.primary.main,
    },
    secondary: {
      color: theme.palette.secondary.main,
    },
    button: {
      '&:hover': {
        textDecoration: 'inherit',
      },
    },
  });

interface InnerProps extends WithStyles<typeof styles> {
  router: {
    pathname: string;
  };
}

type Variant = 'default' | 'primary' | 'secondary' | 'button' | 'inherit';

interface OuterProps {
  activeClassName?: string;
  // children: node.isRequired;
  className?: string;
  component?: any;
  href?: string;
  onClick?: ReactEventHandler;
  prefetch?: boolean;
  variant?: Variant;
}

const Link: React.FunctionComponent<InnerProps & OuterProps> = props => {
  const {
    activeClassName,
    children: childrenProp,
    classes,
    className: classNameProp,
    component: ComponentProp,
    href,
    onClick,
    prefetch,
    router,
    variant,
    ...other
  } = props;

  let ComponentRoot;
  const className = classNames(
    classes.root,
    {
      [classes[variant]]: variant !== 'inherit',
    },
    classNameProp,
  );
  let RootProps;
  let children = childrenProp;

  if (ComponentProp) {
    ComponentRoot = ComponentProp;
    RootProps = {
      ...other,
      className,
    };
  } else if (href) {
    ComponentRoot = NextLink;
    RootProps = {
      href,
      prefetch,
      passHref: true,
    };
    const handleKeyPress: KeyboardEventHandler = event => {
      if (event.key == 'Enter') {
        onClick(event);
      }
    };
    children = (
      <a
        className={classNames(className, {
          [activeClassName]: router.pathname === href && activeClassName,
        })}
        onClick={onClick}
        onKeyPress={handleKeyPress}
        {...other}
      >
        {children}
      </a>
    );
  } else {
    ComponentRoot = 'a';
    RootProps = {
      ...other,
      className,
    };
  }

  return <ComponentRoot {...RootProps}>{children}</ComponentRoot>;
};

// Link.defaultProps = {
//   variant: 'default',
//   activeClassName: 'active',
// };

export default compose<InnerProps, OuterProps>(
  withRouter,
  withStyles(styles),
)(Link);
