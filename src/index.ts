import {Express} from 'express';

const express = require('express');
const cors = require('cors');

const app: Express = express();
app.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get("/holidays", (_, res) => {

    res.send(holidays);
})

app.get("/holidays/:monthNumber", (req, res) => {

    const month = parseInt(req.params.monthNumber);
    if(isNaN(month)) {
        res.send(holidays);
    } else {
        const monthHolidays = holidays.filter(({date}) => {
            const mnth = date.split('/').map(element => parseInt(element))[0];
            return month === mnth;
        })
        res.send(monthHolidays);
    }
})

app.get("/is-today-holiday", (_, res) => {

    const hoje = new Date();
    const holiday = holidays.find(({date}) => isSameDay(hoje, date));
    res.send(holiday?`Sim, hoje é ${holiday.name}`:`Não, hoje não é feriado.`);
})

const isSameDay = (date1: Date, date2: string) => {

    const day1 = date1.getDate();
    const month1 = date1.getMonth()+1;
    const year1 = date1.getFullYear();
    const [month2, day2, year2] = date2.split('/').map(element => 
        parseInt(element)
    );
    if (day1 === day2 && month1 === month2 && year1 === year2) {
        return true;
    } else {
        return false;
    }
}

app.listen(4000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:4000`);
});