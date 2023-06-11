<template>
    <div></div>
</template>

<script>
import { getToken } from '../helpers/auth.js'
export default {
    name: 'Authenticate',
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        // get query param
        // setup CORS and credentials
        this.axios.defaults.withCredentials = false;

        var code = this.$route.query.code
        
        this.axios.post(`${this.$root.path}/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${this.$root.redirect}&client_id=H4DMGD1xMHHfRyUoz9mC7zH7ZT1Hvda7GUT0rgGU&client_secret=QOUWOTO3ifRrwJ9H8SyhuJMyWmUjRlBemgyRKvO9`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // disable credentials
                'Access-Control-Allow-Credentials': false,
            }
        }).then((token) => {
            console.log(token)
            this.$cookies.set('token', token.data.access_token, '7D')
            window.location = '/'
        });
    }
}
</script>