import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { unlockKeys } from '../../lib/keyclick';

/** Ctrl/⌘ + ` opens the terminal from anywhere on the site. */
export default function TerminalShortcut() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === '`') {
                e.preventDefault();
                unlockKeys();
                if (pathname !== '/terminal') navigate('/terminal');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [navigate, pathname]);

    return null;
}
