import React,{Component} from 'react'
import LineService from "../../../utils/Service";
import "../../../App.css"
import Pagimagic from 'react-pagimagic';


class LineStatisticListComponent extends Component{

    constructor(props){
        super(props);

        this.servise = new LineService();
        this.state ={lines:[]}
    }
    componentDidMount(){
        this.createLineStatistic()
    }

    componentWillReceiveProps(next){
        if(JSON.stringify(this.props) === JSON.stringify(next) ){return;}
        this.createLineStatistic();
    }

    createLineStatistic(){
        this.servise.getAllLinesInFile(this.props.id).then(page => {
            let list = page.components;
            this.setState({lines:list});
        });
    }
    child(lines){
        return(
            <div className="container">
                {lines.map(line =>(
                <ul key={line.numberLine} className="block-statistic" >
                    <li>Номер строки: <span className="statistic">{line.numberLine}</span></li>
                    <li>Строка: {line.line === null || line.line ==="\r" || line.line ==="\n"  ?
                        <span className="empty">Пустая строка</span>:
                        <span className="statistic">{line.line}</span>}</li>
                    <li>Самое длинное слово: {line.longestWord === null || line.longestWord ==="\r" ?
                        <span className="empty">Отсутствует</span>:
                        <span className="statistic">{line.longestWord}</span>}</li>
                    <li>Самое короткое слово: {line.shortestWord === null || line.shortestWord==="\r" ?
                        <span className="empty">Отсутствует</span>:
                        <span className="statistic">{line.shortestWord}</span>}</li>
                    <li>Средняя длинна слова : {line.line === null || line.line==="\r"|| line.line ==="\n"  ?
                        <span className="empty">0</span>:
                        <span className="statistic">{line.averageWordLength}</span>}</li>
                </ul>
                ))}
            </div>
        );

    }
    render(){
        const lines = this.state.lines;
        return(
            <div className="blocks-line">
                <div className="lines ">
                    <h2 className="lineHeader">Статистика линий</h2>
                    <Pagimagic
                        list={lines}
                        itemsPerPage={1}
                        currentPageIndex={0}
                        maximumVisiblePaginators={5}
                        renderChildren={this.child}
                        useDefaultStyles
                    />
                </div>
            </div>
        );
    }

}

export default LineStatisticListComponent