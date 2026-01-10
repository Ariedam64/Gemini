import { ClientToServerMessage } from './types/messages';

export class RemoteOperationError extends Error {
  messageContext: ClientToServerMessage;
  constructor(message: string, messageContext: ClientToServerMessage) {
    super(message);
    this.name = 'RemoteOperationError';
    this.messageContext = messageContext;
    this.stack = `RemoteOperationError: ${message}.\n\nThis error was thrown on the server while handling this client message:\n\n${JSON.stringify(
      messageContext,
      null,
      2
    )}`;
  }
}
