export default interface Abort extends AbortController {
  abort(reason?: string): void;
}
