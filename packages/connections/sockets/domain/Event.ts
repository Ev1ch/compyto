enum Event {
  SEND = 'send',
  RECEIVE = 'receive',
  COMMAND = 'command',

  IDENTIFICATION = 'identification',
  CONNECTION = 'connection',
  BALANCES = 'balances',
  CONFIRMATION = 'confirmation',
  CONFIRMATION_RECEIVED = 'confirmation-received',
}

export default Event;
