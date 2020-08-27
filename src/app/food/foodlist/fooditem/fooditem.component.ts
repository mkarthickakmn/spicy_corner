import { Component, OnInit,Input } from '@angular/core';
import{Food} from '../../food.module';
import{Router,ActivatedRoute}from '@angular/router'
@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

@Input() index:number=null;
@Input() food:Food=null;

  ngOnInit(): void {
  }
  order()
  {
    console.log(this.index);
  	 this.router.navigate(['/food',this.index]);
  }

  toCart()
  {

  }
}
