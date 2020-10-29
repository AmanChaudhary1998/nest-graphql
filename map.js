const officers = [
    {
        id:20, name: 'Aman'
    },
    {
        id: 21, name: 'Dhawal'
    },
    {
        id: 22, name: 'Hemant'
    },
    {
        id:23, name: 'Mukul'
    }
]

// const value = officers.map((offierid)=>{
//     return offierid.id;
// })
 const value= officers.map(({id})=>{
     return({
         id,
         address:'Indore'
     });
 });

 console.log(value);

