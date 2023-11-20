export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        private _refreshToken: string
    ) { }

    get token(): string {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get expiresIn(): number {
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }

    get refreshToken(): string {
        return this._refreshToken;
    }
}