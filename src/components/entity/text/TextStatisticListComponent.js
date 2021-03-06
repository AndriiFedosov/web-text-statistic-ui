import React,{Component} from 'react';
import TextStatisticService from "../../../utils/Service.js";
import * as queryString from "query-string";
import {Link} from 'react-router-dom'
import Pagimagic from 'react-pagimagic';
import EmptyPage from "../../errors/EmptyPage";
import LineStatisticListComponent from "../line/LineStatisticListComponent";

class TextStatisticListComponent extends Component{
    constructor(props){
        super(props);
        this.service = new TextStatisticService();
        this.filter = { minLines: TextStatisticListComponent.getMinimumLines(this.props)};
        this.state={
            texts:[],
            hasError:false
        }
    }
    componentDidMount(){
        this.searchAllFilesWithMinLines();
    }

    static getMinimumLines(props){
        let _minLines = queryString.parse(props.location.path).minLines;
        if (!_minLines || _minLines < 1) { _minLines = 1; }
        return _minLines;
    }
    static searchWithParams(name , query){
        let parameter = queryString.parse(query)[name];
        if(!parameter || parameter < 1){
            parameter = 1;
        }
        return parameter;
    }
    handleMinimumLinesApply(e){
        this.filter.minLines = e.target.value
    }

    searchAllFilesWithMinLines() {
        this.service.getAllTexts(this.filter.minLines)
            .then(entity =>{
                if (entity ===404){
                   this.setState({hasError:true})
                }
                else {let texts = entity.components;
                this.setState({texts:texts})}
            });
    }

    componentWillReceiveProps(nextProps){
        this.filter.minLines = LineStatisticListComponent.searchWithParams("minLines" ,nextProps.location.search);
        this.searchAllFilesWithMinLines();
    }

    submitFormHandler(e){
        e.preventDefault();
        this.props.history.push('/texts?minLines=' + this.filter.minLines)
    }
    child(texts){
        return(<div className="block-statistic all-text-statistic">
            {texts.map(text =>(
                <div className="position-static" key={text.id} >
                    <div>
                        <ul>
                            <li>Номер фала: <span className="statistic">{text.id}</span></li>
                            <li>Длинна текста: <span className="statistic">{text.textLength}</span></li>
                            <li>Самое длинное слово: {text.longestWord === null || text.longestWord==="\r" ?
                                <span className="empty">Отсутствует</span>:
                                <span className="statistic">{text.longestWord}</span>}</li>
                            <li>Самое короткое слово: {text.shortestWord === null || text.shortestWord==="\r" ?
                                <span className="empty">Отсутствует</span>:
                                <span className="statistic">{text.shortestWord}</span>}</li>
                            <li>Средняя длинна слова : <span className="statistic">{text.averageLengthWord}</span></li>
                        </ul>

                    <button className="button-send-text button-go-to-file">
                        <Link  to={'/texts/'+text.id}>Перейти к статистике текста</Link>
                    </button>
                    </div>
                    <div style={{width:50,paddingBottom:50}}/>
                </div>
            ))}
        </div>);
    }
    render(){
        if (this.state.hasError){
            return <EmptyPage/>
        } else {
            const texts = this.state.texts;
            return(
                <div >
                    <div className="lineHeader">
                        <h2>Статистика всех фалов</h2>
                        <div>
                            <p>Поиск текста по минимальному количеству линий в файле</p>
                            <div>
                                <form onSubmit={this.submitFormHandler.bind(this)}>
                                    <h4> Минимальное количество строк :
                                        <input className="inputMinLines" type="number" min={1}
                                               defaultValue={this.filter.minLines}
                                               onChange={this.handleMinimumLinesApply.bind(this)}/>
                                        <input className="button-send-text" type="submit" value="Отправить"/>
                                    </h4>
                                </form>
                            </div>
                        </div>
                        <Pagimagic list={texts}
                                   itemsPerPage={1}
                                   currentPageIndex={0}
                                   maximumVisiblePaginators={5}
                                   renderChildren={this.child}
                                   useDefaultStyles
                        />
                    </div>
                    <div style={{color:'#b4b4b4',position:'absolute' ,bottom:5,right:5}}>Write by Andrii Fedosov</div>
                </div>);
        }
    }
}
export default TextStatisticListComponent