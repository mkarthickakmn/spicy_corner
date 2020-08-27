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
  
  changeListener($event,id) : void {
  this.readThis($event.target,id);
}

readThis(inputValue: any,id:number): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();
  myReader.readAsDataURL(file);
  myReader.onloadend = (e) => {
    this.image = myReader.result;
    console.log(this.image)
    if(this.image.length>0)
    {
      this.image_change=1;
    }
    this.adminFood.getImageById(id,this.image);
    this.food=this.adminFood.getFood();

  }

}


  update(food:any)
  {
    // food.image=food.image.slice(23);
    console.log(food);
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
