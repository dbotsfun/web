export function login() {
    if (typeof window === "undefined") return;
    const newWindowWidth = 500;
    const newWindowHeight = 500;
    const left = (screen.width - newWindowWidth) / 2;
    const top = (screen.height - newWindowHeight) / 2;

    const w = window.open(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
        '_blank',
        `width=${newWindowWidth},height=${newWindowHeight},left=${left},top=${top}`
    );

    const handleWindowClose = () => {
        window.location.reload();
    };

    if (w) {
        w.addEventListener('beforeunload', handleWindowClose);
        w.removeEventListener('beforeunload', handleWindowClose);
    }
}