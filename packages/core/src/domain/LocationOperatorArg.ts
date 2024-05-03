import Rank from './Rank';

/**
 * Needed for Communicator.reduce method for MINLOC and MAXLOC operators.
 */
export default interface LocationOperatorArg {
  rank: Rank;
  value: number;
}
