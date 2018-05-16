import { MediaBreakpoint } from './mediaBreakpoint';

export abstract class MatchOperator {
  operator: 'gt' | 'lt';
  match: (breakpoint: MediaBreakpoint) => boolean;
}
