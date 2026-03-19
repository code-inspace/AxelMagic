import useTextRoll from '../../hooks/useTextRoll';
import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

interface RollButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<any>;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  [key: string]: any;
}

export function RollButton({ children, className = '', href, style, ...rest }: RollButtonProps) {
  const ref = useTextRoll();

  // overflow-hidden sur l'élément racine : h = offsetHeight = référence correcte pour GSAP
  const inner = (
    <>
      <span className="roll-top flex items-center gap-2">{children}</span>
      <span className="roll-bottom absolute inset-0 flex items-center justify-center gap-2">{children}</span>
    </>
  );

  const cls = `relative overflow-hidden ${className}`;

  if (href !== undefined) {
    return <a ref={ref as any} href={href} className={cls} style={style} {...rest}>{inner}</a>;
  }

  return <button ref={ref as any} className={cls} style={style} {...rest}>{inner}</button>;
}
