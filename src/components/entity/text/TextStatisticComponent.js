import React, {Component} from 'react';
import TextService from '../../../utils/Service.js'
import LineStatisticListComponent from "../line/LineStatisticListComponent";
import EmptyPage from "../../errors/EmptyPage";




class TextStatisticComponent extends Component{

   constructor(props){
       super(props);
       this.id  = props.match.params.id;
       this.servise = new TextService();
       this.state={text:{},hasError: false}
   }

    componentDidMount(){
            this.createStatisticFromFile()
    }

   createStatisticFromFile(){

        this.servise.getText(this.id)
            .then(text =>{
                if (text ===404){
                    this.setState({hasError:true})
                } else{
                console.log(text);
                this.setState({text:text});}
            })
   }

   render(){
       if (this.state.hasError){
           return(<EmptyPage/>);
       }else {
           const text = this.state.text;
           return(
               <div className="container">
                   <div className="row">
                       <div className="texts ">
                           <h2 className="lineHeader">Статистика файла</h2>
                           <ul className="block-statistic ">
                               <li>Номер фала: <span className="statistic">{text.id}</span></li>
                               <li>Длинна текста: <span className="statistic">{text.textLength}</span></li>
                               <li>Самое длинное слово: {
                                   text.longestWord === null ||
                                   text.longestWord==="\r" ||
                                   text.longestWord === "\t"?
                                       <span className="empty">Отсутствует</span>:
                                       <span className="statistic">{text.longestWord}</span>}</li>
                               <li>Самое короткое слово: {
                                   text.shortestWord === null || text.shortestWord==="\r"|| text.shortestWord==="\v"?
                                       <span className="empty">Отсутствует</span> :
                                       <span className="statistic">{text.shortestWord}</span>}</li>
                               <li>Средняя длинна слова : <span className="statistic">{text.averageLengthWord}</span></li>
                           </ul>

                       </div>
                       <LineStatisticListComponent id = {this.id}/>
                       <div style={{color:'#b4b4b4',position:'absolute' ,bottom:5,right:5}}>Write by Andrii Fedosov</div>
                   </div>
               </div>);
       }
   }


}
export default TextStatisticComponent;