import axios from 'axios';

axios.defaults.withCredentials = true;

var location = "plymouth"
var path = "https://pike13.com";
var redirect = "http://localhost:5173/auth"

export async function getToken(authorization){
    try{
        const response = await axios.post(`${path}/oauth/token?grant_type=authorization_code&code=${authorization}&redirect_uri=${redirect}&client_id=H4DMGD1xMHHfRyUoz9mC7zH7ZT1Hvda7GUT0rgGU&client_secret=QOUWOTO3ifRrwJ9H8SyhuJMyWmUjRlBemgyRKvO9`, {});
        return response.data;
    }catch(error){
        return {error: error};
    }
    
}