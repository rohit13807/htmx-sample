import express from 'express';

const app = express();

app.use(express.static('public')); // We want to read HTML from public folder

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// basic routes:
app.get('/users', async (req, res) => {
    let get_res = await fetch('https://jsonplaceholder.typicode.com/users');
    let user_list = await get_res.json();

    res.send(`
        <h1 class="text-2xl font-bold my-4"></h1>
        <ul>
            ${user_list.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
        `);
});
app.get('/usersLoader', async (req, res) => {
    setTimeout(async () => {
        let get_res = await fetch('https://jsonplaceholder.typicode.com/users');
        let user_list = await get_res.json();

        res.send(`
        <h1 class="text-2xl font-bold my-4"></h1>
        <ul>
            ${user_list.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
        `);
    }, 1000);

});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})