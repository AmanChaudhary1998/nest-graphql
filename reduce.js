var pilots = [
    {
      id: 10,
      name: "Poe Dameron",
      years: 14,
    },
    {
      id: 2,
      name: "Temmin 'Snap' Wexley",
      years: 30,
    },
    {
      id: 41,
      name: "Tallissan Lintra",
      years: 16,
    },
    {
      id: 99,
      name: "Ello Asty",
      years: 22,
    }
  ];

  const totalYears = pilots.reduce((value,pilot)=>{
    return (value + pilot.years);
  },0);

  console.log(totalYears);

  const maxPilot = pilots.reduce((oldest,pilot)=>{
      return (oldest.years || 0) > pilot.years ? oldest:pilot
  },{})
  console.log(maxPilot);