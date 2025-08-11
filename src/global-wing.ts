import { GlobalPulse, Payload, Message } from '@mirawision/chrome-pulse'
import { Wing, BaseState } from '@mirawision/wings'

/**
 * Type definition for wing message handlers in the global context
 * @template T - The type of payload data
 * @param payload - The data payload of the message
 * @param sender - Chrome runtime message sender information
 * @param sendResponse - Callback function to send a response
 * @param message - The complete message object
 * @returns Any value that the handler needs to return
 */
type WingHandler<T> = (
  payload: Payload,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
  message: Message
) => any

/**
 * GlobalWing class for managing global state in Chrome extensions
 * @template T - The type of state data, must extend Payload
 * @extends Wing<T>
 */
export class GlobalWing<T extends Payload & BaseState> extends Wing<T> {
  private messenger: GlobalPulse

  /**
   * Creates a new GlobalWing instance
   * @param eventCategory - Category identifier for the wing's events
   * @param initialState - Initial state data
   */
  constructor(eventCategory: string, initialState: T) {
    super(initialState)

    this.messenger = new GlobalPulse(eventCategory, {
      update: ((payload: Payload) => {
        this.setStateWithoutPropagation(payload as T)
      }) as WingHandler<T>,

      getState: ((_,
                 __,
                 sendResponse: (res: any) => void) => {
        sendResponse(this.getState())
        return false
      }) as WingHandler<T>,
    })
  }

  /**
   * Updates state without propagating changes to other contexts
   * @private
   * @param newState - New state to set
   */
  private setStateWithoutPropagation(newState: T): void {
    super.setState(newState)
  }

  /**
   * Updates state and propagates changes to other contexts
   * @protected
   * @param newState - New state or partial state to set
   */
  public setState(newState: T | Partial<T>): void {
    super.setState(newState)
    this.messenger.sendMessage('update', this.getState())
  }
}