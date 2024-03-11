export default interface Serializable<TEntity> {
  serialize(): string;
  deserialize(data: string): TEntity;
}
