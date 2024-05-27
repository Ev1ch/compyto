import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface HeadProps {
  children: ReactNode;
}

export default function Head({ children }: HeadProps) {
  return createPortal(children, document.head);
}
