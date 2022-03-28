import * as React from "react";
import { Form,Button,Col,Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

var Typeahead = require('react-bootstrap-typeahead').Typeahead; // CommonJS
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function searchList(props){
    return (
        <div>
            <Row>
                <Col xs="10">
                    <Form.Group className="mb-3">
                        <Typeahead placeholder="University Name" id="university-single" labelKey="college"
                            onChange={(response)=>{
                                props.model(response);
                            }}
                            onInputChange={(response)=>{
                                props.model(response);
                            }}
                            options={props.options}
                        />
                    </Form.Group>
                </Col>
                <Col xs="2">
                    <div className="d-grid gap-2">
                        <Button className="btn-block" variant="primary" 
                            disabled={props.options.length==0}
                            onClick={()=>{
                                props.submit();
                            }}
                        >  
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                            />
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

