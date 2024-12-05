import { Route } from "../abstract/Route"
import { PageController } from '../controller/pageController'

export class PageRoute extends Route{
    
    protected url: string;
    protected Contorller = new PageController();

    constructor(){
        super()
        this.url = '/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.get(`${this.url}`,(req, res)=>{
            this.Contorller.sendPage(req, res);
        })
    }

}