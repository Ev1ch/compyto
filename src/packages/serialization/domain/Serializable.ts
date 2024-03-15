/**
 * Interface, which can be implemented by any class
 * which is meant to be transferred over the network
 * from one peer to another. The implementation
 * of this interface allows the mechanism to
 * automatically serialize the sent entity
 * and deserialize it on the other side.
 */
export default interface Serializable<TEntity> {
  serialize(): string;
  deserialize(data: string): TEntity;
}
