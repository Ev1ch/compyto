import Rank from './Rank';

/**
 * Needed for {@link connections/src.Communicator.reduce} method for MINLOC and MAXLOC operators.
 */
export default interface LocationOperatorArg {
  rank: Rank;
  value: number;
}
