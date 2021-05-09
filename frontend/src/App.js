import React, { Component, useState, useEffect, setState } from 'react';
import getBlockchain from './ethereum.js';
import axios from 'axios';

class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images: [],
      loading: true
    }

    // this.uploadImage = this.uploadImage.bind(this)
  }

  async componentWillMount() {
    // await this.loadWeb3()
    // await this.loadBlockchainData()

    const { nft } = await getBlockchain();
      //nft.tokenURI returns the BaseURL from the standard NFT and also append the 'id' of the token you are searching
      // const tokenURI = await nft.tokenURI(0);
      // const { data } = await axios.get(tokenURI);
      // setTokenInfo(data.result);
      
      this.state.images = []
      
      for(let i=0;i<3;i++){
         const tokenURI = await nft.tokenURI(i);
         const { data } = await axios.get(tokenURI);
         
        //  this.state.images.push(...this.state.images, data.result)

         this.setState({
          images: [...this.state.images, data.result]
        })

      }

      console.log(this.state.images);

  }



  render() {
    return (
      <div>

    <div className='container'>
      
      
      {
         this.state.images.map((item,key)=>{

            
          return(
                <div className='row' key={key}>
                <div className='col-sm-12'>
                  <h1 className='text-center'>{item.name}</h1>
                  <div className="jumbotron">
                    <p className="lead text-center">{item.description}</p>
                    
                    <img src={item.image} className="img-fluid" />
                  </div>
                </div>
              </div>
            );
    
          })
      }
    
    </div>


        {/* <Navbar account={this.state.account} bar={this.state.bar} />
          
          
          <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
            //two methods, one for the decentragram contract to just send fake values
            // and a real one to send to bronzeCoin real Bronzes
            tipImageBronze={this.tipImageBronze}
            tipRealBronze={this.tipRealBronze}
            covered={this.state.covered}
            saldo={this.state.saldo}
          /> */}


      </div>
    );
  }
}

export default App;