import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class freeapiservice
{
    constructor(private http: HttpClient) { }
}