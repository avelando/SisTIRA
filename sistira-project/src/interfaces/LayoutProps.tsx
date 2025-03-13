export interface LayoutProps {
  children: React.ReactNode;
  user?: {
    firstName: string;
    lastName: string;
    username: string;
  } | null;
  title?: string;
}
