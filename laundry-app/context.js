import React, { Component } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductContext = React.createContext();
import {API} from './global/constants'

class ProductProvider extends Component {
  state = {
    shopName: "",
    services: [],
    vendorToken: "",
    isLogged: true,
    customerData: [],
    shopResponse: "",
    price: 10
  };
  setShopName = (e) => {
    this.setState({
      shopName: e,
    });
  };

  getStorage = async () => {
    const item = await AsyncStorage.getItem("vendorId");
    this.setState({
      vendorToken: JSON.parse(item),
    });
    console.log(item);
  };
  setServices = (param)=>{
    this.setState({
      services: param.services
    })
  }
  saveService = (data) => {
    const service = {
      title: data.title,
      price: this.state.price,
    };
    this.setState({
      services: [...this.state.services, service],
    });
  };
  removeService = (data) => {
    let temp = [...this.state.services]
    let index = temp.findIndex(x => x.title === data.title)
    console.log(index)
    if (index !== -1) {
      temp.splice(index, 1);
      this.setState({services: temp});
    }
  
  };
  createShop = async (shopname, shopaddress, shopaccount) => {
    await this.getStorage();
    axios
      .post(`${API}/shop/create`, {
        vendorId: this.state.vendorToken,
        services: this.state.services,
        name: shopname,
        address: shopaddress,
        account: shopaccount
      })
      .then((res) => {
        this.setState({shopResponse: res.data});
      })
      .catch((err) => console.log(err));
  };
  Logout = () => {
    AsyncStorage.clear();
    this.setState({
      isLogged: false,
    });
  };
  setPrice =(e)=>{
    console.log(e)
    this.setState({
      price:e
    })
  }
  render() {
    return (
      <ProductContext.Provider
        value={{
          setShopName: this.setShopName,
          saveService: this.saveService,
          getStorage: this.getStorage,
          createShop: this.createShop,
          isLogged: this.state.isLogged,
          Logout: this.Logout,
          removeService:this.removeService,
          services: this.state.services,
          shopResponse: this.state.shopResponse,
          price: this.state.price,
          setPrice: this.setPrice,
          setServices: this.setServices
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
