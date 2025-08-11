import { Wing } from '@lib/wings';
import { PopupPulse, Payload } from '@lib/chrome-pulse';

/**
 * PopupWing class for managing state in Chrome extension popup windows
 * @template T - The type of state data, must extend NonNullable<Payload>
 * @extends Wing<T>
 */
class PopupWing<T extends NonNullable<Payload>> extends Wing<T> {
  protected messenger: PopupPulse;

  /**
   * Creates a new PopupWing instance
   * @param eventCategory - Category identifier for the wing's events
   * @param initialState - Initial state data
   */
  public constructor(eventCategory: string, initialState: T) {
    super(initialState);

    this.messenger = new PopupPulse(eventCategory, {
      update: (payload: Payload) => this.setStateWithoutPropagation(payload as T),
      getState: () => this.getState(),
    });

    this.messenger.startListening();

    this.messenger.sendMessage<T>('getState')
      .then((state: T) => {
        this.setStateWithoutPropagation(state);
      });
  }

  /**
   * Updates state without propagating changes to other contexts
   * @private
   * @param newState - New state to set
   */
  private setStateWithoutPropagation(newState: T): void {
    super.setState(newState);
  }

  /**
   * Updates state and propagates changes to other contexts
   * @protected
   * @param newState - New state or partial state to set
   */
  protected setState(newState: T | Partial<T>): void {
    super.setState(newState);

    this.messenger.sendMessage('update', this.getState());
  }
}

export { PopupWing };