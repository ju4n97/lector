import { type Parser, tokenize } from '@lectorjs/primitives';
import { type Mocked, vi } from 'vitest';

export function createMockParser(text: string): Mocked<Parser> {
    const words = tokenize(text);

    return {
        getWord: vi.fn(function* () {
            for (const word of words) {
                yield {
                    value: word,
                    insights: {
                        difficulty: 1,
                    },
                };
            }
        }),
        getMetadata: vi.fn().mockResolvedValue({
            foo: 'bar',
            baz: 'qux',
        }),
    };
}
