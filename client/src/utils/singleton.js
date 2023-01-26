export function useSingleton<T>(provider: () => T): T {
    const singleton = useRef<T>();

    function getSingleton() {
        if (singleton.current == null) {
            singleton.current = provider();
        }
        return singleton.current;
    }

    return getSingleton();
}

export function useComponentId(): string {
    return useSingleton(uuidv4);
}