import React, { Component } from 'react';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'
import './App.css';
import Navbar from './Navbar'
import ListElements from './ListElements'
import AddProduct from './AddProduct'


class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadData();
        window.ethereum.on('accountsChanged', function (accounts) {
             window.location.reload();
        })
    }

    async loadWeb3() {
           if(window.ethereum) {
               window.web3 = new Web3(window.ethereum);
               window.ethereum.enable();

           } else if (window.web3) {
               var web3 = new Web3();
        window.web3 = new Web3(web3.currentProvider);
    } else {
               alert("Cannoct connect to network")
           }
       }

    async loadData() {
        const account = await window.web3.eth.getAccounts();
        const networkId = await window.web3.eth.net.getId();
        const networkData = await Marketplace.networks[networkId];
        if(networkData) {
            const marketplace = await window.web3.eth.Contract(Marketplace.abi, networkData.address)
            this.setState({marketplace})
            this.setState({
                account: account[0],
            })
            await this.loadItems();
        } else {
            alert("cannot connect to network");
        }

    }
    async loadItems() {
        this.setState({items: []})
        const itemsCount = await this.state.marketplace.methods.productCount().call();
        for(var i=0; i<itemsCount; i++) {
            const singleItem = await this.state.marketplace.methods.products(i).call();
            this.setState({
                items: [...this.state.items, singleItem]
            })
        }

    }
    async productAdd(_price, _name, _description) {
        await this.state.marketplace.methods.productAdd(_price, _name, _description).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        })
    }

    async buyProduct(_id, price) {
        await this.state.marketplace.methods.buyProduct(_id).send({from: this.state.account, value: price*1000000000000000000}, async(e) => {
            await this.checkBlockNumber();
        })
    }

    async checkBlockNumber() {
        this.setState({loading: true})
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        const blockNumber = await window.web3.eth.getBlockNumber()
        let blockNumberNew = await window.web3.eth.getBlockNumber()
        while(blockNumber === blockNumberNew) {
            blockNumberNew = await window.web3.eth.getBlockNumber()
            await sleep(250);
        }
        await this.loadItems();
        this.setState({loading: false})
    }

    constructor(props) {
        super(props);
        this.state =  {
            account: null,
            items: []
        }
    }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
        ? <h1 className="display-2 mt-5 text-center">Loading..</h1>
        :<div><AddProduct productAdd={this.productAdd.bind(this)}/>
        <ListElements buyProduct={this.buyProduct.bind(this)}  items={this.state.items}/></div>
        }

      </div>
    );
  }
}

export default App;
