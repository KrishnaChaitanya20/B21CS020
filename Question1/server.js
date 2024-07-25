const express = require('express');
const app = express();


const serverUrl = process.env.SERVER_URL || 'http://localhost:3000/test';
const token = process.env.ACCESS_TOKEN || '';
const companies =['AMZ','FLP','SNP','MYN','AZO']
const categories = ['Phone','Computer','TV','Earphone','Tablet','Charger','Mouse','Keypad','Bluetooth','Pendrive','Remote','Speaker','Headset','Laptop','PC']

app.get('/companies/:company/caterogires/:category/products', (req, res) => {
    const company = req.query.company;
    if (!companies.includes(company)) {
        res.send({
            'status':404,
            'message':"Company not found"
        });

        return;
    }

    const category = req.params.category;
    if (!categories.includes(category)) {
        res.send({
            'status':404,
            'message':"Category not found"
        });
        return;
    }

    getdata = async () => {
        const headers={access_token: token}
        const response = await fetch(`${serverUrl}/companies/${company}/caterogires/${category}/products`, {
            method: 'GET',
            headers: headers
        });
        const data = await response.json();
        return data;
    }

    let data= getdata();
    const top = req.query.top;
    const page = req.query.page;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    if (minPrice) {
        data = data.filter((item) => item.price >= minPrice);
    }
    if (maxPrice) {
        data = data.filter((item) => item.price <= maxPrice);        
    }

    if (top) {
        data = data.slice(0, top);
    }

    if (page) {
        data = data.slice(page * 10, page * 10 + 10);
    }

    res.send(data);
});




app.get('/companies/:company/caterogires/:category/products/:productid', (req, res) => {
});

console.log(token);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });