import * as React from "react";
import { Button } from 'react-bootstrap';

export default function UniversityButton(props){
    if((props.pager*10)<props.items.length){
        return(
            <div className="my-3 d-grid gap-2">
                <Button className="btn-block" variant="primary" 
                    onClick={()=>{
                        props.submit();
                    }}
                >  
                    Load More
                </Button>
            </div>
        )
    }else{
        if(props.items.length>0){
            return(
                <div className="my-4 d-grid gap-2 text-center">
                    WOW! You reached the end!
                </div>
            )
        }else{
            return(
                <div className="my-4 d-grid gap-2 text-center">
                    Nothing Here!
                </div>
            )
        }
    }
}

