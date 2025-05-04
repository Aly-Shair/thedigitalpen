import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'

class AuthService {
    client;
    account;
    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount){
                await this.login(email, password)
                return userAccount;
            }
                

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login({ email, password }) {

        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password
            );

            if (session)
                return session;

        } catch (error) {
            console.log('Local Error Failed to Login due to Error: ' + error);
            throw error;
        }
    }
    async logout(){
        try {
            const result = await this.account.deleteSessions();
            if(result)
                return result;
        } catch (error) {
            console.log("Failed to logout due to Error: " + error)
            throw error
        }
        // return null;
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // console.log('Local Error user not logged in: ' + error);
            throw error;
        }
        
        return null;
        
    }
}

const authService = new AuthSerivce()
export default authService;

