export function propName(
    object: Record<string, unknown>,
    value: unknown,
): string | undefined {
    for (const key in object) {
        const val = object[key];

        if (val === value) {
            return key;
        }

        if (typeof val === 'object') {
            const nestedPath = propName(
                val as Record<string, unknown>,
                value,
            );
            if (nestedPath) {
                return nestedPath;
            }
        }
    }

    return undefined;
}
