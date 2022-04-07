export class User {
    id: number | null;
    username: string | null;
    password: string | null;
    name: string | null;
    age: number | null;
    email: string | null;

    constructor(id?: number | null, username?: string, password?: string, name?: string, age?: number, email?: string) {
        this.id = (id ? id : null);
        this.username = (username ? username : null);
        this.password = (password ? password : null);
        this.name = (name ? name : null);
        this.age = (age ? age : null);
        this.email = (email ? email : null);
    }
}