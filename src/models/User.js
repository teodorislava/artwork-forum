export class User {
    constructor(
        id = 0, username = '', password = '', name = '', lastname = '',
        registeredon = '', birthday = '', city = '', country = '', email = '')
     {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.lastname = lastname;
        this.registeredon = registeredon;
        this.birthday = birthday;
        this.city = city;
        this.country = country;
        this.email = email;
    }
}
