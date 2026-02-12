import { useEffect, useRef } from 'react';

export const useIdleTimer = (timeout: number, onIdle: () => void) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const resetTimer = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(onIdle, timeout);
        };

        const handleActivity = () => {
            resetTimer();
        };

        // Events to listen for
        const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll', 'click'];

        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        // Initial start
        resetTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [timeout, onIdle]);
};
