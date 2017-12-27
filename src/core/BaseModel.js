/**
 * Created by MnMistake on 9/27/2017.
 */
'use strict';

import React from 'react';

import { ApiHost } from '../config/variables';

let requestServerError = 'We couldn\'t connect to the server. Please try later';

let BaseModel = {
    get(resource) {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(ApiHost + resource, options).then((data)=> {
            return(data)
        }).catch(
            error => {
                throw requestServerError;
            }
        );
    },
};

export { BaseModel as default };