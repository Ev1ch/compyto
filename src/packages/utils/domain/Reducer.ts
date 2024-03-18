type Reducer<T extends unknown[], Accumulator = {}> = T extends []
  ? Accumulator
  : T extends [infer Head, ...infer Tail]
    ? Reducer<Tail, Accumulator & Head>
    : never;

export default Reducer;
