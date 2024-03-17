type MatchingKeys<TObject extends object, TMatcher> = {
  [key in keyof TObject]-?: key extends TMatcher ? key : never;
}[keyof TObject];

export default MatchingKeys;
