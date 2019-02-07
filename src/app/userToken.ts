export class UserToken{
    private id: string;
    private name: string;
    
    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    getId():string{
        return this.id;
    }

    getName():string{
        return this.name;
    }
}