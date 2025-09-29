'use client';

import { ReactNode } from 'react';

interface ApiProviderProps {
  children: ReactNode;
}

export default function ApiProvider({ children }: ApiProviderProps) {
  return <>{children}</>;
}
