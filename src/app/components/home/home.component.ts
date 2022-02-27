import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { MatDialog } from '@angular/material/dialog';
import { CartService} from '../../services/cart.service'
import * as groceries from '../../jsonData/groceries.json';
// import * as fruits from '../../jsonData/fruits.json';
import { GetApiService } from './../../get-api.service';

import * as vegetables from '../../jsonData/vegetables.json';
import * as snacks from '../../jsonData/snacks.json';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('groceriesSlickModal') groceriesSlickModal: SlickCarouselComponent;
  @ViewChild('fruitsSlickModal') fruitsSlickModal: SlickCarouselComponent;
  @ViewChild('snacksSlickModal') snacksSlickModal: SlickCarouselComponent;
  @ViewChild('vegetablesSlickModal') vegetablesSlickModal: SlickCarouselComponent;



  fruitsData;
  groceriesData;
  snacksData;
  vegetablesData;
  cartData:any = [];
  cartCount: number = 0;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private api:GetApiService
  ) { }

  ngOnInit(): void {
    // this.itemData = items;
    this.groceriesData = (groceries as any).default;
    this.vegetablesData = (vegetables as any).default;
    // this.fruitsData = (fruits as any).default;
    this.api.apiCall().subscribe(
      (data)=>{
        console.warn("get api data ", data);
        this.fruitsData=data;
      }
    )
    this.snacksData = (snacks as any).default;
  }


  slideConfig = {
    "lazyLoad": 'progressive',
    'slidesToShow': 3,
    "slidesToScroll": 3,
    "arrows": true,
    "dots": true,
    speed: 300,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  addToCart(item:any){
    console.log(item);
    debugger;
    let checkCartData = localStorage.getItem('cartData');
    if(checkCartData == null){
      let storeCartData: any = [];
      storeCartData.push(item);
      localStorage.setItem('cartData', JSON.stringify(storeCartData));

    }else{
      var productId = item.id;
      let index: number = -1;
      this.cartData = JSON.parse(localStorage.getItem('cartData'))
      for(let i=0; i< this.cartData.length; i++){
        if(productId == this.cartData[i].id){     //parse both to ParseInt if all id is integer
          // this.cartData[i].qnt = item.qnt; //add after adding quantity element in schema
          index = i;
          break;

        }
      }
      if(index == -1){
        this.cartData.push(item);
        localStorage.setItem('cartData', JSON.stringify(this.cartData));
      }else{
        localStorage.setItem('cartData', JSON.stringify(this.cartData));

      }

    }
   this.cartCountFunc();
  }

  cartCountFunc() {
    var cartValue = JSON.parse(localStorage.getItem('cartData'));
    this.cartCount = cartValue.length;
    this.cartService.cartSubject.next(this.cartCount);

  }

  addSlide() {
    // this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }
  groceriesNext() {
    this.groceriesSlickModal.slickNext();
  }

  groceriesPrev() {
    this.groceriesSlickModal.slickPrev();
  }

  fruitsNext() {
    this.fruitsSlickModal.slickNext();
  }

  fruitsPrev() {
    this.fruitsSlickModal.slickPrev();
  }
  snacksNext() {
    this.snacksSlickModal.slickNext();
  }

  snacksPrev() {
    this.snacksSlickModal.slickPrev();
  }
  vegNext() {
    this.vegetablesSlickModal.slickNext();
  }

  vegPrev() {
    this.vegetablesSlickModal.slickPrev();
  }


}
