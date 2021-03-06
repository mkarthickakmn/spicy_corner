import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import{AdminService}from '../../adminservice.service'
@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  constructor(private admin:AdminService) { }
  addForm:FormGroup;
  image:any;
  ngOnInit(): void {
  	this.addForm=new FormGroup({
  		'name':new FormControl("",Validators.required),
      'image':new FormControl("",Validators.required),
  		'timings_id':new FormControl(1),
  		'amount':new FormControl("",Validators.required),
  		'quantity':new FormControl("",Validators.required),
  		'description':new FormControl("",Validators.required)
  	});
  }
 
 ch()
 {
   if( (<HTMLInputElement>document.getElementById("img2")).value.length>0)
     (<HTMLInputElement>document.getElementById("img1")).disabled=true;
   else
    (<HTMLInputElement>document.getElementById("img1")).disabled=false;

 }
  submit()
  {
    if(this.image)
      this.addForm.value.image=this.image;
  	this.admin.addFood(this.addForm.value).subscribe(data=>{
  		alert('Food item inserted successfully!');
  	});
  	this.addForm.reset();
  }


  changeListener($event) : void {

   if( (<HTMLInputElement>document.getElementById("img1")).value.length>0)
     (<HTMLInputElement>document.getElementById("img2")).disabled=true;
   else
    {
      (<HTMLInputElement>document.getElementById("img2")).disabled=false;
      this.image="";
    }

  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(file);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.image=this.image.slice(23);
  }

}
 


}
