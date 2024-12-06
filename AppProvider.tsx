import {Component, createContext, ReactNode} from 'react';
import {IDataObj, IDataOBjIndex} from './src/Screens/HomeScreen';

interface AppContextInterface {
  onIncrement: (item: number) => void;
  onDecrement: (item: number) => void;
  onAddedCartData: (eachItem: IDataOBjIndex) => void;
  addedCartData: IDataOBjIndex[];
}
export const AppContext = createContext<AppContextInterface>({
  onIncrement: () => {},
  onDecrement: () => {},
  onAddedCartData: () => {},
  addedCartData: [],
});

interface IProps {
  children: ReactNode;
}

interface IState {
  addedCartData: [];
}

export class AppProvider extends Component<IProps, IState> {
  static Consumer: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      addedCartData: [],
    };
  }

  onIncrement = (itemId: number) => {
    this.setState(prevState => {
      const updatedCartData = prevState.addedCartData.map((item: IDataObj) => {
        if (item.id === itemId) {
          return {...item, itemCount: item.itemCount + 1};
        }
        return item;
      });
      return { ...prevState,addedCartData: updatedCartData};
    });
  };

  // Decrement item count
  onDecrement = (itemId: number) => {
    this.setState(prevState => {
      const updatedCartData = prevState.addedCartData.map((item: IDataObj) => {
        if (item.id === itemId && item.itemCount > 1) {
          return {...item, itemCount: item.itemCount - 1};
        }
        return item;
      });
      return {addedCartData: updatedCartData};
    });
  };

  // onDecrement = () => {};

  onAddedCartData = (eachItem: IDataOBjIndex) => {
    console.log('43', eachItem);
    this.setState(prevState => ({
      addedCartData: [...prevState.addedCartData, eachItem],
    }));

    console.log('45', this.state.addedCartData);
  };

  render() {
    const {children} = this.props;
    const {addedCartData} = this.state;
    return (
      <AppContext.Provider
        value={{
          onIncrement: this.onIncrement,
          onDecrement: this.onDecrement,
          onAddedCartData: this.onAddedCartData,
          addedCartData,
        }}>
        {children}
      </AppContext.Provider>
    );
  }
}
