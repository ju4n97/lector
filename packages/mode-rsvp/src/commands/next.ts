import { defineCommand, updateContext } from '@lector/primitives';
import { RSVP_CONTEXT_KEY, type RsvpContext } from '../context.ts';

export default defineCommand(() => ({
	execute({ render }) {
		updateContext<RsvpContext>(RSVP_CONTEXT_KEY, (ctx) => ({
			checkpoint: Math.min(ctx.parser.data.size - 1, ctx.checkpoint + 1),
		}));

		render();
	},
}));
