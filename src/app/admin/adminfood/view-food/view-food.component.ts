import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{AdminService} from '../../adminservice.service'
import{AdminFoodService} from '../../adminfoodservice.service'
@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {

  constructor(private admin:AdminService,private adminFood:AdminFoodService) { }
  foods:any=[];
  search:string="";
  category:any=0;
  image_change:any=0;
  ngOnInit(): void {

  		this.admin.getFood().subscribe(data=>{
  			this.foods=data;	
  		});
  		

  }

image:any='';
  
  changeListener($event,id,i,food) : void {

   if( (<HTMLInputElement>document.getElementById("img1_id"+i)).value.length>0)
   (<HTMLInputElement>document.getElementById("img2_id"+i)).disabled=true;
   else
    {
      (<HTMLInputElement>document.getElementById("img2_id"+i)).disabled=false;
      this.image="";
    }
  this.readThis($event.target,id,food);
}

readThis(inputValue: any,id:number,food:any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(file);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.adminFood.getImageById(id,this.image);
    this.food=this.adminFood.getFood();

  }

}

ch(i,food)
 {

   if( (<HTMLInputElement>document.getElementById("img2_id"+i)).value.length>0)
     {
       (<HTMLInputElement>document.getElementById("img1_id"+i)).disabled=true;
       food.image=(<HTMLInputElement>document.getElementById("img2_id"+i)).value;
     }
   else
    (<HTMLInputElement>document.getElementById("img1_id"+i)).disabled=false;

 }

  update(food:any)
  {
    this.admin.updateFood(food,this.image_change).subscribe(response=>{
  		alert('data updated successfully!!!');
  	});
  }
  food()
  {

	this.admin.getFood().subscribe(data=>{
		this.foods=data;	
	});
  }
  del(food:any)
  {
	this.admin.delFood(food).subscribe(response=>{
  		alert('data deleted successfully!!!');
  		this.admin.getFood().subscribe(data=>{
  			this.foods=data;	
  		});
  	});
  }

  search1()
  {
  	console.log(this.category);
		this.admin.searchCategory(this.category).subscribe(data=>{
			this.foods=data;
		});
  }

}
