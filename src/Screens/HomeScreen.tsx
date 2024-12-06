import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext} from '../../AppProvider';

export interface IDataOBjIndex {
  index: number;
  item: {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    btnCondition: boolean;
    itemCount: number;
  };
}
export interface IDataObj {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  btnCondition: boolean;
  itemCount: number;
}

interface IState {
  apiData: [];
  isLoader: boolean;
  page: number;
}

export default class HomeScreen extends Component<IState> {
  state = {
    apiData: [],
    isLoader: false,
    page: 1,
    cartBtn: false,
  };

  onEndReachedList = async () => {
    this.setState({isLoader: true});
    setTimeout(async () => {
      await this.getApiData();
      this.setState({isLoader: false});
    }, 1000);  
  };

  onPressMinusBtn = (eachItem: IDataOBjIndex) => {
    const updatedData = this.state.apiData.map((Item: IDataObj) => {
      if (eachItem.item.id == Item.id){
        return {...Item, btnCondition: true}
      }
      return eachItem
    })

  }

  getApiData = async () => {
    const {apiData, page} = this.state;
    if (page === 1) {
      this.setState({page: 2});
    }
    if (apiData.length >= 12) return;

    try {      const response = await fetch(
        `https://reqres.in/api/users?page=${page}&per_page=6`,
      );
      const jsonData = await response.json();
      const objData = jsonData.data;
      const updatedData = objData.map((item: IDataObj) => ({
        ...item,
        btnCondition: true,
        itemCount: 1,
      }));
      const newData = [...apiData, ...updatedData];
      const limitedData = newData.slice(0, 12);
      this.setState({
        apiData: limitedData,
        totalPages: jsonData.total_pages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  onPressCartButton = (
    eachItem: IDataOBjIndex,
    onAddedCartData: (Item: IDataOBjIndex) => void,
  ) => {
    const {apiData} = this.state;

    const updatedItems = apiData.map((item: IDataObj) => {
      if (item.id === eachItem.item.id) {
        return {...item, btnCondition: false};
      }
      return item;
    });

    this.setState({apiData: updatedItems});
    onAddedCartData(eachItem);
  };

  componentDidMount(): void {
    this.getApiData();
  }

  renderEachItem = (eachItem: IDataOBjIndex) => {
    const {cartBtn} = this.state;
    const {first_name, last_name, email, avatar, btnCondition, itemCount} =
      eachItem.item;
    return (
      <AppContext.Consumer>
        {({addedCartData, onIncrement, onDecrement, onAddedCartData}) => (
          <View style={styles.container}>
            <View style={styles.imgStyles}>
              <Image source={{uri: avatar}} style={styles.avatarImg} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.names}>
                {first_name} {last_name}
              </Text>
              <Text style={styles.emails}>{email} </Text>
              {btnCondition ? (
                <View style={styles.AddCartBtn}>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() =>
                      this.onPressCartButton(eachItem, onAddedCartData)
                    }>
                    <Ionicons name="cart" size={25} color="white" />
                    <Text style={styles.AddCartText}>Add</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.plusMinusContainer}>
                  <TouchableOpacity style={styles.plusContainer} onPress={() => this.onPressMinusBtn(eachItem)}>
                    <Icons
                      name="minus"
                      
                      size={20}
                    />
                  </TouchableOpacity>

                  <Text style={styles.countText}>{itemCount}</Text>
                  <TouchableOpacity style={styles.plusContainer}>
                    <Icons
                      name="plus"
                      // onPress={() => this.onPressPlusBtn(product, getCount)}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </AppContext.Consumer>
    );
  };

  render() {
    const {apiData, isLoader} = this.state;
    return (
      <AppContext.Consumer>
        {({addedCartData, onIncrement, onDecrement, onAddedCartData}) => (
          <View>
            <FlatList
              data={apiData}
              numColumns={2}
              renderItem={this.renderEachItem}
              onEndReached={this.onEndReachedList}
              onEndReachedThreshold={1}
              // keyExtractor={(item: IDataObj) => item.id.toString()}
              keyExtractor={(item: IDataObj, index: number) => `${item.id}-${index}`}
              ListFooterComponent={
                isLoader ? (
                  <ActivityIndicator color="green" size="large" />
                ) : null
              }
            />
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 5,
    borderRadius: 14,
  },
  imgStyles: {
    width: responsiveWidth(47),
    height: 150,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  names: {
    fontSize: 18,
    fontWeight: 700,
  },
  emails: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  textContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: '50%',
  },
  AddCartBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderWidth: 0.1,
    marginTop: 50,
    padding: 6,
    borderRadius: 20,
  },
  AddCartText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 700,
    marginLeft: 6,
  },
  touchable: {
    flexDirection: 'row',
  },
  plusMinusContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  plusContainer: {
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    elevation: 10,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
