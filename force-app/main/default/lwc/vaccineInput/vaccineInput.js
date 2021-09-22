import { LightningElement,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

export default class VaccineInput extends LightningElement {
    
    // showErrorToast() {
    //     const evt = new ShowToastEvent({
    //         title: 'Pin Code Error',
    //         message: 'Please Enter Valid PinCode',
    //         variant: 'error',
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(evt);
    // }
     
    @track listdata1 = [];
    @track columns = [
        {
            type: 'action',
            typeAttributes: { rowActions: actions },
        },
        { label: 'Hospital Name', fieldName: 'hstName', type: 'text' },
        { label: 'available_capacity', fieldName: 'availCap', type: 'text' },
        { label: 'Vaccine', fieldName: 'vaccine', type: 'text' },
        { label: 'Vaccine Fee', fieldName: 'vaccineFee', type: 'text' },
        { label: 'Address', fieldName: 'addr', type: 'text' }
    ];

    get_input(event){
       let pinCodevalue = this.template.querySelector('[data-id="pinCode"]').value;
      
       //let datevalue ='20-08-2021' ;
       let testdate = this.template.querySelector('[data-id="vaccineDate"]').value;
       let currentDate = new Date(testdate);
       let finaldate = currentDate.toJSON().slice(0,10);
       let finaleedate = finaldate.slice(8,10)+'-'+finaldate.slice(5,7)+'-'+finaldate.slice(0,4);
    //    let dd = currentDate.getDate();
    //    let mm = currentDate.getMonth()+1;
    //    let yyyy = currentDate.getFullYear();
       
    //    let formatter = new Intl.DateTimeFormat('en',{
    //        year:'numeric',
    //        month:'numeric',
    //        day:'numeric'
    //    });
    //    let formattedDate = formatter.format(currentDate);
       console.log(finaleedate);
    //    console.log(typeof(testdate));
       //let formatted_date = datevalue.getDate() + "-" + (datevalue.getMonth()) + "-" + datevalue.getFullYear();
       let vaccineUrl=  `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCodevalue}&date=${finaleedate}`;
       //console.log(formatted_date);
       console.log(pinCodevalue);
       console.log(vaccineUrl);
       this.getVaccine(vaccineUrl);
       
    }  
     
   async getVaccine(vaccineUrl){
    const vaccineOutput = await fetch(vaccineUrl);
    console.log(vaccineUrl);
    console.log(vaccineOutput);
    const jsonresponse = await vaccineOutput.json();
    this.jsonresponse= jsonresponse;
    console.log(jsonresponse);
    let listdata =[];
    jsonresponse.centers.map(center => {
        let listobj ={};
        listobj.hstName = center.name;
        listobj.availCap = center.sessions[0]['available_capacity'];
        listobj.vaccine = center.vaccine_fees[0]["vaccine"];
        listobj.vaccineFee = center.vaccine_fees[0]["fee"];
        listobj.addr = center.address;
        listdata.push(listobj);
        console.log(listdata);
    });
    console.log(listdata);
    this.listdata1=listdata;
    console.log(this.listdata1.length);
    // console.log(listdata1);

   }
   
}