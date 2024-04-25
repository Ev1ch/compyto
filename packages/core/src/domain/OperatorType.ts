/**
 * Operator type code which is used to
 * identify the operator in communication
 * between {@link core/src.Process | Processes}.
 */
enum OperatorType {
  MAX = 'max',
  MIN = 'min',
  SUM = 'sum',
  PROD = 'prod',
  LAND = 'land', //- Performs a logical and across the elements.
  LOR = 'lor', //- Performs a logical or across the elements.
  BAND = 'band', //- Performs a bitwise and across the bits of the elements.
  BOR = 'bor', //- Performs a bitwise or across the bits of the elements.
  LXOR = 'lxor',
  BXOR = 'bxor',
  MAXLOC = 'maxloc', //- Returns the maximum value and the rank of the process that owns it.
  MINLOC = 'minloc', //- Returns the minimum value and the rank of the process that owns it.
}

export default OperatorType;
