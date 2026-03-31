export type SignedInProp = {
  user?: {
    name: string;
    id: number;
  } | null;
  onNavigate?: (tab: string) => void;
  onOpenModal?: (type: "login" | "register") => void;
  onLogout?: () => void;
  navTab?: string;
};
