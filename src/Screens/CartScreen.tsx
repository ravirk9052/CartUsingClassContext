import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../../AppProvider';
import {IDataObj, IDataOBjIndex} from './HomeScreen';
import Icons from 'react-native-vector-icons/Entypo';

export default class CartScreen extends Component {
  static contextType = AppContext;

  renderCartItem = (Item: IDataOBjIndex) => {
    const {onAddedCartData, onIncrement, onDecrement, addedCartData} = this.context;

    // console.log('10', onAddedCartData,onIncrement, addedCartData);
    // console.log('9', Item);
    const cartItem = Item.item;
    // console.log('13', cartItem);
    const {avatar, first_name, last_name, email, itemCount} = cartItem.item;
    // console.log('14', avatar);

    const onPressPlusButton = (item: IDataObj) => {
      console.log('29', item)
      console.log('30', addedCartData)
    };

        // addedCartdata.find((cartItem: IDataObj) => {
      //   if (cartItem.id == item.id) {
      //     cartItem.itemCount = cartItem.itemCount + 1;
      //     onAddCartData(cartItem);
      //   }
      // });

    // const onPressMinusButton = () => {
    //   addedCartdata.find((cartItem: IItemObj) => {
    //     // console
    //     if (cartItem.id == item.id) {
    //       cartItem.itemCount = cartItem.itemCount - 1;
    //       onAddCartData(cartItem);
    //     }
    //   });
    // };
    // const {}
    return (
      <SafeAreaView>
        <View style={styles.cartContainer}>
          <View style={styles.imgStyle}>
            <Image source={{uri: avatar}} style={styles.img} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {first_name} {last_name}
            </Text>
            <Text style={styles.stockText}>
              <Text style={styles.quantity}>({email})</Text>
            </Text>
            <View style={styles.plusMinusContaner}>
              <TouchableOpacity
                style={styles.plusContainer}
                // onPress={onPressMinusButton}
              >
                <Icons name="minus" size={25} color="#9B9B9B" />
              </TouchableOpacity>

              <View>
                <Text style={styles.itemCount}>{itemCount}</Text>
              </View>
              <TouchableOpacity
                style={styles.plusContainer}
                onPress={() => onPressPlusButton(cartItem)}>
                <Icons name="plus" size={25} color="#9B9B9B" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dotsContainer}>
            <Icons name="dots-three-vertical" color="grey" size={25} />
            {/* <Text style={styles.price}>
              {' '}
              ₹ {discountPercentage * itemCount}
            </Text> */}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  render() {
    const {addedCartData} = this.context;
    console.log('10', addedCartData);

    return (
      <View>
        <FlatList
          data={addedCartData}
          renderItem={this.renderCartItem}
          keyExtractor={item => item.index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cartContainer: {
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    margin: 10,
    // padding: 8,
    // marginLeft: 10,
    marginTop: 10,
  },
  textContainer: {
    // borderWidth: 1,
    width: '45%',
    // borderWidth: 1,
    marginLeft: 15,
    padding: 3,
  },
  img: {
    height: '100%',
  },
  imgStyle: {
    width: '30%',
    height: 100,
    padding: 0,
    borderTopLeftRadius: 12,
  },
  titleText: {
    // flex: 1,
    paddingLeft: 5,
    marginTop: 1,
    fontSize: 16,
    fontWeight: 700,
    color: '#222222',
    width: '100%',
  },
  stockText: {
    paddingLeft: 5,
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
  },
  quantity: {
    fontWeight: 500,
    fontSize: 12,
    color: 'grey',
  },
  plusContainer: {
    // width: 25,
    // height: 25,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    elevation: 10,
  },
  plusMinusContaner: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // justifyContent: 'flex-start',
    // borderWidth: 1,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: 700,
  },
  dotsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: 10,
    // borderWidth: 1,
  },
  price: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 700,
  },
  bagContainer: {
    marginLeft: 10,
    // borderWidth: 1,
    marginTop: 50,
  },
  bagText: {
    color: '#222222',
    fontSize: 34,
    fontWeight: 'bold',
  },
});
