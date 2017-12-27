/**
 * Created by MnMistake on 9/27/2017.
 */

import React from 'react';

import { ApiHost } from '../config/variables';

let requestServerError = 'We couldn\'t connect to the server. Please try later';

let BaseModel = {
    async get(resource) {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch(ApiHost+resource, options)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
            return json;
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    },
};

export { BaseModel as default };