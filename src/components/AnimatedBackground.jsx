import React, { Suspense, lazy, useEffect } from 'react';
import { usePreloader } from './Preloader';
import { usePerfProfile } from '../hooks/usePerfProfile';
import { setSceneStatus, useSceneStatus } from '../lib/scene-health';

const KeyboardScene = lazy(() => import('./keyboard/KeyboardScene'));

class SceneErrorBoundary extends React.Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch() {
        setSceneStatus('failed');
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

const SceneSession = ({ maxDpr }) => {
    const status = useSceneStatus();
    const { bypassLoading } = usePreloader();

    useEffect(() => {
        let context = null;
        try {
            const canvas = document.createElement('canvas');
            context = canvas.getContext('webgl2') || canvas.getContext('webgl');
        } catch {
            // Browser policy or driver failures can throw instead of returning null.
        }
        if (!context) {
            setSceneStatus('failed');
            return () => setSceneStatus('idle');
        }
        context.getExtension('WEBGL_lose_context')?.loseContext();
        setSceneStatus('loading');
        return () => setSceneStatus('idle');
    }, []);

    useEffect(() => {
        if (status === 'failed') bypassLoading();
    }, [status, bypassLoading]);

    useEffect(() => {
        if (status !== 'loading') return undefined;
        const timeout = window.setTimeout(() => setSceneStatus('failed'), 20000);
        return () => window.clearTimeout(timeout);
    }, [status]);

    if (status === 'idle' || status === 'failed') return null;
    return (
        <SceneErrorBoundary>
            <Suspense fallback={null}>
                <KeyboardScene maxDpr={maxDpr} />
            </Suspense>
        </SceneErrorBoundary>
    );
};

/** The interactive 3D keyboard that follows you down the page. */
const AnimatedBackground = () => {
    const { disable3D, maxDpr, ready } = usePerfProfile();
    if (!ready || disable3D) return null;
    return <SceneSession maxDpr={maxDpr} />;
};

export default AnimatedBackground;
