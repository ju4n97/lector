import { type Reader, createReader } from '@lectorjs/primitives';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { context } from '../../src/context.ts';
import { RsvpMode } from '../../src/mode.ts';
import { createMockParser } from '../__mocks__/parser.mock.ts';

describe('goToEnd', () => {
    let reader: Reader<RsvpMode>;

    beforeEach(async () => {
        reader = createReader({
            mode: new RsvpMode(),
            parser: createMockParser('word1 word2 word3'),
            renderTo: document.body,
        });

        await new Promise(setImmediate); // Wait for parser to stream data into the context

        context.subscribe(() => reader.render());
    });

    afterEach(() => {
        context.destroy();
    });

    it('executes the goToEnd command correctly', () => {
        expect(document.body.innerHTML).toMatchInlineSnapshot(`"<span>word1</span>"`);

        reader.commands.goToEnd();
        expect(document.body.innerHTML).toMatchInlineSnapshot(`"<span>word3</span>"`);
    });
});
