new Vue({
    el: '#app',
    data: {
        url: '',
        id: generateId()
    },
    methods: {
        createUrl() {
            console.log(this.url);
            
            const body = {
                url: this.url,
                id: this.id
            };

            fetch('/api/urls', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                console.log(response);
                return response.json();
            }).then(result => {
                console.log(result);
            });
        },
        }
});

function generateId() {
    var urlId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
        urlId += possible.charAt(Math.floor(Math.random() * possible.length));

    return urlId;
}