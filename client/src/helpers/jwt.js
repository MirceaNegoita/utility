class JwtHelper {
    static getJwt(){
        return localStorage.getItem("token");
    }
    static removeJwt(){
        return localStorage.removeItem("token");
    }
}

export default JwtHelper;