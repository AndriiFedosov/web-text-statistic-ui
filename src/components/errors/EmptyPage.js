import React, { Component } from 'react'
import '../../App.css'
import rick from '../../resources/rick.jpg'

class EmptyPage extends Component{

    render(){
        return(
                <div className="error-page">
                    <img src={rick} alt="" className="img-error"/>
                </div>
        );
    }
}
export default EmptyPage;