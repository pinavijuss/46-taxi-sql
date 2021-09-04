const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];

    // perskaitom ka turim is pradziu
    sql = 'SELECT * FROM `trips`'; //*- reiskia visa istraukiama info

    [rows] = await connection.execute(sql);
    console.log(rows);

    console.log(`Visi taksiskai bendrai ivykde ${rows.length} keliones.`)


    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    let array = [];
    for (let i = 0; i < rows.length; i++) {
        array.push(rows[i].driver)
    }
    console.log(`Taksistais dirba: ${array.join(', ')}.`);


    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);

    let allDistance = 0;

    for (let i = 0; i < rows.length; i++) {

        allDistance += parseFloat(rows[i].distance);

    }

    console.log(`Visu kelioniu metu nuvaziuota ${allDistance} km.`);

    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);

    let ratingCount = 0;
    let ratingCounter = 0;

    for (let i = 0; i < rows.length; i++) {
        driverName = rows[i].driver
        if (driverName === 'Jonas') {

            ratingCount += rows[i].rating;
            ratingCounter = ratingCounter + 1
        }
    }
    const avgRating = ratingCount / ratingCounter
    console.log(`Jono ivertinimas yra ${avgRating} zvaigzdutes.`)



    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);

    let tripPrice = 0;
    let distance = 0;
    let pricePerKm = 0;

    for (let i = 0; i < rows.length; i++) {
        tripPrice = parseFloat(rows[i].price);
        distance = parseFloat(rows[i].distance);
        pricePerKm += tripPrice / distance;

    }


    const avgPricePerKm = pricePerKm / rows.length

    console.log(`Vidutine kelioniu kaina yra ${avgPricePerKm.toFixed(2)} EUR/km.`)

}

app.init();

module.exports = app;

