import Constants from './Constatns.js'


class Service{

    api ='http://web-text-statistic.herokuapp.com/';

    getAllTexts(min):Promise<Response>{
        let url = this.api + '?';
        if(min!== undefined && min !== null && min>=1 ){
            url += 'min='+min ;
        }
        return Promise.resolve(
            fetch(url)
                .then(response =>{ if (response.status === 200){
                    return response.json()
                }else{
                    console.log(response.status);
                    return response.status}
                })
                .then(text => {return text})
        );
    }

    getAllLinesInFile(id) : Promise<Response>{
        let url = this.api  + '/' + id + '/lines';
        return Promise.resolve(
            fetch(url)
                .then(response =>{if (response.status===200){
                    return response.json();
                }else {
                    console.log(response.status);
                    return response.status
                }})
                .then(lines => {return lines}));
    }

     getText(id): Promise<Response>{
        let url = this.api  + '/' + id + '/text';
        return Promise.resolve(
            fetch(url)
                .then(response =>{ if (response.status === 200){
                    console.log(response.status);
                    return response.json()
                }else{
                    console.log(response.status);
                    return response.status}
                })
                .then(text =>{ return text}))
            ;
    }

    uploadFileAndCreateStatistic(text) : Promise<Response>{
        let url = this.api ;
        return Promise.resolve(
            fetch(url,{
                method: 'POST',
                headers:Constants.API_HEADERS,
                body: JSON.stringify({text:text})
            })
                .then(response =>{
                    return response.json();
                })
                .then(id => {return id})
                .then(longestWord=>{ return longestWord})
                .then(shortestWord=>{ return shortestWord})
                .then(averageWordLength=>{ return averageWordLength})
                .then(textLength=>{ return textLength})
        )
    }
}

export default Service;