/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 12:03:57
 * @modify date 2020-08-15 12:03:57
 * @desc API Endpoint Base
 */

const endpoint = "https://jsonplaceholder.typicode.com/";

export const api = {
    url: {
        users: {
            list: endpoint + "users"
        },
        posts: {
            list: endpoint + "posts"
        }
    }
}