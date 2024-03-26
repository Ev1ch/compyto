/**
 * The interface which represents the
 * structure of abort controller.
 */
export default interface Abort extends AbortController {
  abort(reason?: string): void;
}
