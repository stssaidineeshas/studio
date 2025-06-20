import type { SVGProps } from 'react';

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>CertChain Logo</title>
    <path d="M10.62 3.56c.28.16.48.42.57.72l1.67 5.43a1.07 1.07 0 0 1-.6 1.23l-5.43 1.67a1.07 1.07 0 0 1-1.23-.6L3.9 6.58c-.1-.3-.07-.63.08-.9s.42-.48.72-.57l5.43-1.67c.3-.1.63-.07.9.08Z" />
    <path d="M13.38 20.44c-.28-.16-.48-.42-.57-.72l-1.67-5.43a1.07 1.07 0 0 1 .6-1.23l5.43-1.67a1.07 1.07 0 0 1 1.23.6l1.67 5.43c.1.3.07.63-.08.9s-.42.48-.72.57l-5.43 1.67c-.3.1-.63.07-.9-.08Z" />
    <path d="m12.56 11.44.9-.29" />
    <path d="m11.44 12.56.29-.9" />
  </svg>
);

export default LogoIcon;
