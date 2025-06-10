import Endpoints from "./base/Endpoints"

export default abstract class Service extends Endpoints {
    static async List() {
        return await this.Get<any>({
            url: "/list"
        })
    }
}