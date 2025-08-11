import { Wing } from '@lib/wings';
import { LocalPulse, Payload } from '@lib/chrome-pulse';

/**
 * LocalWing class for managing local state in Chrome extensions
 * @template T - The type of state data, must extend Payload
 * @extends Wing<T>
 */
class LocalWing<T extends Payload> extends Wing<T> {
  protected messenger: LocalPulse;

  /**
   * Creates a new LocalWing instance
   * @param eventCategory - Category identifier for the wing's events
   * @param initialState - Initial state data
   */
  public constructor(eventCategory: string, initialState: T) {
    super(initialState);

    this.messenger = new LocalPulse(eventCategory, {
      update: (payload: Payload) => this.setStateWithoutPropagation(payload as T),
      getState: () => this.getState(),
    });

    this.messenger.startListening();

    this.messenger.sendMessage('getState')
      .then((state) => {
        this.setStateWithoutPropagation(state as T);
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

export { LocalWing };