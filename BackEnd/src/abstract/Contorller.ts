import {Request, Response} from "express";
import { Service } from "./Service";

export abstract class Contorller{
    protected abstract service:Service;
    constructor(){
        
    }
}