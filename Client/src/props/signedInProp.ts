export type SignedInProp = {
  user?: {
    name: string;
  } | null;
  onNavigate?: (tab: string) => void;
  onOpenModal?: (type: "login" | "register") => void;
  onLogout?: () => void;
};
