import { GlobalWing, LocalWing, PopupWing, SideWing } from '../src';
import './setup';

interface TestState {
  count: number;
  text: string;
}

const initialState: TestState = {
  count: 0,
  text: ''
};

describe('GlobalWing', () => {
  let wing: GlobalWing<TestState>;

  beforeEach(() => {
    wing = new GlobalWing<TestState>('test', initialState);
  });

  it('should initialize with correct state', () => {
    expect(wing.getState()).toEqual(initialState);
  });

  it('should update state correctly', () => {
    const newState = { count: 1, text: 'test' };
    wing.setState(newState);
    expect(wing.getState()).toEqual(newState);
  });

  it('should handle partial state updates', () => {
    wing.setState({ count: 1 });
    expect(wing.getState()).toEqual({ ...initialState, count: 1 });
  });
});

describe('LocalWing', () => {
  let wing: LocalWing<TestState>;

  beforeEach(() => {
    wing = new LocalWing<TestState>('test', initialState);
  });

  it('should initialize with correct state', () => {
    expect(wing.getState()).toEqual(initialState);
  });

  it('should update state correctly', () => {
    const newState = { count: 1, text: 'test' };
    wing.setState(newState);
    expect(wing.getState()).toEqual(newState);
  });

  it('should handle partial state updates', () => {
    wing.setState({ text: 'test' });
    expect(wing.getState()).toEqual({ ...initialState, text: 'test' });
  });
});

describe('PopupWing', () => {
  let wing: PopupWing<TestState>;

  beforeEach(() => {
    wing = new PopupWing<TestState>('test', initialState);
  });

  it('should initialize with correct state', () => {
    expect(wing.getState()).toEqual(initialState);
  });

  it('should update state correctly', () => {
    const newState = { count: 1, text: 'test' };
    wing.setState(newState);
    expect(wing.getState()).toEqual(newState);
  });

  it('should handle partial state updates', () => {
    wing.setState({ count: 1 });
    expect(wing.getState()).toEqual({ ...initialState, count: 1 });
  });
});

describe('SideWing', () => {
  let wing: SideWing<TestState>;

  beforeEach(() => {
    wing = new SideWing<TestState>('test', initialState);
  });

  it('should initialize with correct state', () => {
    expect(wing.getState()).toEqual(initialState);
  });

  it('should update state correctly', () => {
    const newState = { count: 1, text: 'test' };
    wing.setState(newState);
    expect(wing.getState()).toEqual(newState);
  });

  it('should handle partial state updates', () => {
    wing.setState({ text: 'test' });
    expect(wing.getState()).toEqual({ ...initialState, text: 'test' });
  });
});