type House ={
    id:number,
    address:string
    type:string
    residentId:number
}
type Resident ={
    id:number
    name: string
    age:number
    gender:string

}



export const  housesData : House[] = [
  {
    id: 1,
    address: "St Myslym Shyri",
    type: "flat",
    residentId: 1
  },
  {
    id: 2,
    address: "St Myslym Keta",
    type: "farm",
    residentId: 1
  },

  {
    id: 3,
    address: "St Yzerberisht",
    type: "house",
    residentId: 2
  },
  {
    id: 4,
    address: "St Five May",
    type: "flat",
    residentId: 3
  },
  {
    id: 5,
    address: "St Mihal Grameno",
    type: "farm",
    residentId: 3
  }
];

export const resdientsData : Resident[] = [
  {
    id: 1,
    name: "Eva",
    age: 26,
    gender: "female"
  },
  {
    id: 2,
    name: "Mandi",
    age: 30,
    gender: "male"
  },
  {
    id:3,
    name:"Eri",
    age:28,
    gender: "female"
  }
];
