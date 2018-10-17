export class UserProfile{
    login : string;
    password : string;
    confirmPassword: string;
    email: string;
    lastName: string;
    firstName: string;
    dateNaiss: Date;
    country: string;
    
    constructor(l, p, c, e, last, first, daten, count){
        this.login =l;
        this.password =p;
        this.confirmPassword=c;
        this.email = e;
        this.lastName = last;
        this.firstName = first;
        this.dateNaiss=daten;
        this.country=count;
    }
}