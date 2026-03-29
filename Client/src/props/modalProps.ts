export type ModalProps = {
    modalType: "login" | "register" | null;
    onClose: () => void;
    onLogin: (user: any) => void;
}