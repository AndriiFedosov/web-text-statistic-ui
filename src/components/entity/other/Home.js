import React, { Component } from 'react'
import '../../../App.css'
import rick from '../../../resources/1.png'

class Home extends Component{

    render(){
        return(
            <div className="error-page">
                <img src={rick} alt="" className="img-error" style={{position: 'relative',
                    width:'100%'}}/>
                <div style={{color:'#262c3a',position:'absolute' ,bottom:5,right:5}}>Write by Andrii Fedosov</div>
            </div>
        );
    }
}
export default Home;