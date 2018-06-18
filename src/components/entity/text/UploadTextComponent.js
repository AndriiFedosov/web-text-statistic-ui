import React , {Component} from 'react';
import FileService from '../../../utils/Service.js';
import Dropzone from 'react-dropzone'
import '../../../App.css'


class UploadTextComponent extends Component{

    constructor(props){
        super(props);
        this.id='';
        this.service = new FileService();
        this.state = {
            text:"",
            textName:"Переместите ваш файл сюда.\n Или просто нажмите \n на это поле",
            placeholder:"Да именно сюда нужно ввести ваш текст. Главное нажмите на поле, а там понесется."
        }
    };

    uploadText(event){
        event.preventDefault();
        this.service.uploadFileAndCreateStatistic(this.state.text)
            .then(response => this.setState({text:response}))
            .then(()=>{ this.id = this.state.text.id ;
                         this.props.history.push("/texts/"+this.id) })
            .then(this.setState({text:""}))
    };
    onDrop(acceptedFiles, rejectedFiles) {
            acceptedFiles.forEach(file =>{
                let fileReader = new FileReader();
                fileReader.readAsText(file,'windows-1251');
                fileReader.onload = ev => {
                   let textResult = ev.target.result;
                   this.setState({text:textResult})
                };
                this.setState({textName:"Ваш файл : "+file.name})

            });
    }


    render(){
        return(
            <div className="container upload">
               <div className="uploadHead">
                   <h3 >Введите свой текст.</h3>
               </div>
                <div className="form">
                        <form>
                            <textarea placeholder={this.state.placeholder}
                                      className="text-area-field" cols={125} rows={13}
                                      onChange={e => this.setState({text:e.target.value})}/>
                        </form>
                </div>
                <div className="form">
                        <Dropzone className="drop-zone"
                                  onDrop={(acceptedFiles, rejectedFiles) => {this.onDrop(acceptedFiles,rejectedFiles)}}>
                                  {this.state.textName}
                        </Dropzone>
                        <button className="button-send-text row " onClick={this.uploadText.bind(this)}>Отправить текст</button>
                 </div>
                <div style={{textAlign:'right',color:'#b4b4b4'}}>Write by Andrii Fedosov</div>
            </div>

        );
    }
}
export default UploadTextComponent