import React,{Component} from 'react';
import axios from 'axios'

const ProductContext = React.createContext()
class ProductProvider extends Component{
    state={
        customers:[{}],
        vendors:[{}],
        riders:[{}],
        sideBar: true,
        shops:[{}]

    }
    componentDidMount(){
        this.getCustomers()
        this.getVendors()
        this.getRiders()
        this.getShops()
    }
    getVendors=()=>{
        axios.get("/vendors/total")
        .then((res) => this.setState({vendors:res.data}))
    }
    getCustomers=()=>{
        axios.get("/customers/total")
        .then((res) => this.setState({customers:res.data}))
    }
    getRiders=()=>{
        axios.get("/riders/total")
        .then((res) => this.setState({riders:res.data}))
    }
    getShops=()=>{
        axios.get("/shop/")
        .then((res) => this.setState({shops:res.data}))
    }
    delCustomer=(e)=>{
       console.log(e)
    }    
        
    showSideBar = () => {
        this.setState({
            sideBar: !(this.state.sideBar)
        })
      };
    render(){
        return <ProductContext.Provider value={{
            getCustomers: this.getCustomers,
            getVendors: this.getVendors,
            getRiders: this.getRiders,
            showSideBar:this.showSideBar,
            getShops:this.getShops,
            sideBar: this.state.sideBar,
            customers: this.state.customers,
            vendors: this.state.vendors,
            riders: this.state.riders,
            shops: this.state.shops

            
        }}>
            
            {this.props.children}
        </ProductContext.Provider>
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductConsumer, ProductProvider };
