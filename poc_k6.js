import http from 'k6/http';
import {check} from "k6";
// import {read_yaml} from './load-yaml.js'
import { parse } from "k6/x/yaml";

import jsYaml from "js-yaml";
const LOCAL_URL = 'http://localhost:8080/satoshisyohu/todos/retrieve'

export default function () {

    let config = jsYaml.load('domain-config.yaml','utf8')
    console.log(config)
    // const jwtPayload = {
    //     email: 'user1@example.com',
    //     name: 'JWT Taro',
    // };
    // const jwtSecret = 'secret_key_goes_here';
    // const jwtOptions = {
    //     algorithm: 'HS256',
    //     expiresIn: '3s',
    // };
    //
    // const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);


    let data = {
        status: '1',
        createdDate: '2023-10-14'
    };

    let response = http.post(LOCAL_URL, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTkxOTI2NzIsInVzZXJfaWQiOiJiNmQyMTIwNy0wYWVkLTRmNGMtYTk1NS1mMGNjNDZkYzM5NjIifQ.bvoU7n4RxKOlY0AQfmp8N8DOCkjEPubH4Xe3jpQ6wrM; Path=/; Domain=localhost; Max-Age=10; HttpOnly'
        },
    });
    console.log(data)

    check(response, {
        "status was 200": (r) => r.status === 200
    });
    check(response, {
        "status was 503": (r) => r.status === 503
    });
    check(response, {
        "status was 400": (r) => r.status === 400
    });

}