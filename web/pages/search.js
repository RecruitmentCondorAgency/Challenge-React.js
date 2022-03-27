import * as React from "react";

import SearchTypeahead from "src/components/searchTypeahead";
import ItemUniversity from "src/components/itemUniversity"
import LoadUniversityButton from "src/components/loadUniversityButton"

import axios from "axios";


function fetchUniversityList(name){
    var link = `http://universities.hipolabs.com/search?name=${name}`;
    return new Promise((resolve,reject)=>{
        axios.get(link).then((response)=>{
            resolve(response.data);
        }).then((error)=>{
            reject(error);
        });
    }) 
}

function ShowUniversityListItem(universityListItem,pager=1){
    if(universityListItem.length>0){
        var key = 0
        var list = [];
        var maxOptions = universityListItem.length>(10*pager) ? (10*pager):universityListItem.length;
        for (let index = 0; index < maxOptions; index++) {
            list.push(
                <ItemUniversity
                    key={key++}
                    name={universityListItem[index].name}
                    alpha={universityListItem[index].alpha}
                    link={universityListItem[index].link}
                />
            );
        }
        return list;
    }
}

export default function Search(){

    const [universityList, universityListUpdate] = React.useState([]);
    const [universityOptions, universityOptionsUpdate] = React.useState([]);
    const [universityListItem, universityListItemUpdate] = React.useState([]);
    const [pager, pagerUpdate] = React.useState(1);

    var fetchTimeout = React.useRef(null);;

    const searchText = (response) => {
        if(fetchTimeout.current!=false){
            clearTimeout(fetchTimeout.current);
            universityListUpdate([]);
            universityOptionsUpdate([]);
        }

        fetchTimeout.current = setTimeout(() => {
            fetchUniversityList(response).then((data)=>{

                var list = [];
                data.forEach(element => {
                    list.push({
                        name:element.name,
                        alpha:element.alpha_two_code,
                        description:"University Description",
                        link: element.web_pages[0]
                    });
                });
                universityListUpdate(list);

                var options = [];
                var maxOptions = data.length>10 ? 10:data.length;
                for (let index = 0; index < maxOptions; index++) {
                    options.push(data[index].name);
                }
                universityOptionsUpdate(options);

            })
        }, 1000);
    };

    const createUniversityListItem = () => {
        universityListItemUpdate(universityList);
        pagerUpdate(1);
    }

    const changePager = () => {
        pagerUpdate(pager+1);
    }
    
    return (
        <div className="page container">
            <div className="row">
                <div className="col-12 col-lg-7 col-xl-6 px-sm-5 py-5 mx-auto">
                    <SearchTypeahead
                        model={searchText}
                        options={universityOptions}
                        submit={createUniversityListItem}
                    />
                    {ShowUniversityListItem(universityListItem,pager)}
                    <LoadUniversityButton
                        pager={pager}
                        items={universityListItem}
                        submit={changePager}
                    />
                </div>
            </div>
        </div>
    );
}

