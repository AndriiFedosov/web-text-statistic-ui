import React, { Component } from 'react'
import '../../App.css'
import rick from '../../resources/rick.jpg'

class EmptyPage extends Component{

    render(){
        return(
                <div className="error-page container">
                    <img src={rick} alt="" className="img-error" style={{position: 'relative',
                        width:'100%'}}/>
                    <div style={{color:'#b4b4b4',position:'absolute' ,bottom:5,right:5}}>Write by Andrii Fedosov</div>
                </div>
        );
    }
}
export default EmptyPage;