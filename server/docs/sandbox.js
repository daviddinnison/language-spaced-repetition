<script>  
const options = {
    headers: {
        // Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: 'hello world'
};

fetch('/api/questions/update', options)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .then(question => {
        console.log(question);
    })
    .catch(err => {
        console.error(err);
    });
</script>