import jwtDecode from "jwt-decode";

export class DecodeToken {
    token :string;
  username:string;

getUsernameToken():string{
    this.token = localStorage.getItem('token');
    const tokenData: any = jwtDecode(this.token);
    this.username = tokenData.sub;
    console.log(this.username+'aaaaaaaaaaaaaaaaaaaaaa')
    return this.username;
   }
}
