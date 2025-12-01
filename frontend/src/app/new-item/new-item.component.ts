import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit{

  constructor(private itemsService: ItemsService, private toast: NgToastService) { }


  ngOnInit(): void {
    this.itemsService.getCategories().subscribe((categories : string[]) => {
      this.categories = categories;
    });
  
  }

  categories : string[];
  subcategories : string[];

  multipleItemsFile: File;
  itemName : string;
  price : number;
  category : string;
  subcategory : string;
  quantity : string;
  weight : string;
  countryOfOrigin : string;
  ingredients : string;
  manufacturer : string;
  brand : string;
  briefDescription : string;
  photo : File;
  message: String;
  multipleItemsFileName;
  fileOkForUpload : boolean = false;

  addNewItem(){
    if (this.itemName == undefined || this.price == undefined || this.category == undefined || this.subcategory == undefined || this.weight == undefined ){
      this.message = "Popunite sva polja!";
    }
    else if (this.price < 0){
      this.message = "Nije dozvoljen unos negativnih brojeva!"
    }
    else {
      this.itemsService.addNewItem(this.itemName, this.price, this.category, this.subcategory, this.quantity, this.weight, this.countryOfOrigin, this.ingredients, this.manufacturer, this.brand, this.briefDescription, this.photo).subscribe(resp => {
        location.reload();
      });
    }
  }




  onChangeSelectCategory(){
    this.itemsService.getSubcategories(this.category).subscribe((subcategories : string[]) => {
      this.subcategories = subcategories.map(word => {
        word = word.replace('_', ' ');
        const firstLetter = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
    
        return firstLetter + rest;
      });
    })
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photo = file;
    }
  }

  removeSelectedImage(){
    this.photo = null;
  }

  onFileChanged(event) {
    this.multipleItemsFile = event.target.files[0];
    //check if selected file is json file
    if (!this.multipleItemsFile.name.includes("json")){
      this.toast.error({detail:"ERROR",summary:'Izabrani fajl nije json!',duration: 2000});
      this.fileOkForUpload = false;
      return
    };
    this.fileOkForUpload = true;
    this.multipleItemsFileName = this.multipleItemsFile.name;
  }

  addNewItems(){
    if (this.fileOkForUpload){
    const fileReader = new FileReader();
    fileReader.readAsText(this.multipleItemsFile, "UTF-8");
    fileReader.onload = () => {
      this.itemsService.addNewItems(JSON.parse(fileReader.result.toString())).subscribe((res) => {
        let responseMessage = res['message'];
        this.toast.success({detail:"SUCCESS",summary: responseMessage,duration: 2000});
        this.multipleItemsFileName = null;
        this.fileOkForUpload = false;
      })
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  } else {
    this.toast.error({detail:"ERROR",summary: "Fajl nije ispravan!",duration: 2000});
  }
}

}
