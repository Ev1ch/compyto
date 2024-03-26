enum SocketEvent {
  SEND = 'send',
  RECEIVE = 'receive',
  COMMAND = 'command',

  IDENTIFICATION = 'identification',
  CONNECTION = 'connection',
  DISCONNECTION = 'disconnection',
  BALANCES = 'balances',
  CONFIRMATION = 'confirmation',
  CONFIRMATION_RECEIVED = 'confirmation-received',
}

export default SocketEvent;
