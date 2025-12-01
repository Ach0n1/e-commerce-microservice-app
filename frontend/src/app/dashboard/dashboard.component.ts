import { Component, HostListener } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { Bills } from '../models/bills';
import { jsPDF } from "jspdf";
import { User } from '../models/users';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { BillsFromDatabase } from '../models/billsFromDatabase';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/items';
import { PieAndBarChartDataModel } from '../models/pieAndBarChartDataModel';
import { Statistics } from '../models/statistics';
import { ActivatedRoute } from '@angular/router';
import { LineChartDataModel } from '../models/lineChartDataModel';
import { SeriesForLineChartDataModel } from '../models/seriesForLineChartDataModel';
pdfMake.vfs = pdfFonts.pdfMake.vfs;   

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private adminsService: AdminsService, private itemsService : ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void{
   this.seriesForDailyIncomeChart.series = [];
   this.seriesForDailyOrdersChart.series = [];

    this.route.data.subscribe((data) => {

      //pie chart data
      data.itemsSoldByCategory[0].itemsSoldByCategory.forEach(element => {
        let dataForPieChart = new PieAndBarChartDataModel();
        dataForPieChart.name = element.category;
        dataForPieChart.value = element.quantity;
        this.salesPerCategory.push(dataForPieChart);
      });

      //try catch block because we want to select only top 5 items
      try{
      //vertical bar chart data
      data.itemsSoldCounter[0].itemsSoldCounter.forEach(element => {
        let dataForVerticalBarChart = new PieAndBarChartDataModel();
        dataForVerticalBarChart.name = element.itemName;
        dataForVerticalBarChart.value = element.quantity;
        this.itemsSoldCounter.push(dataForVerticalBarChart);
        if(this.itemsSoldCounter.length == 5) throw new Error("Top 5 best selling items are selected!")
      });

    }
    catch (error){
      console.log(error)
    }

      //line chart daily income data
      
      data.dailyIncome[0].dailyIncome.forEach(element => {
        let dataForLineChartDailyIncome = new SeriesForLineChartDataModel();
        dataForLineChartDailyIncome.name = element.date;
        dataForLineChartDailyIncome.value = element.income;
        this.seriesForDailyIncomeChart.series.push(dataForLineChartDailyIncome);
      });
      this.seriesForDailyIncomeChart.name = "Dnevni prihod";
      this.dailyIncome.push(this.seriesForDailyIncomeChart);

      //line chart daily orders data
      data.dailyOrders[0].dailyOrders.forEach(element => {
        let dataForLineChartDailyOrders = new SeriesForLineChartDataModel();
        dataForLineChartDailyOrders.name = element.date;
        dataForLineChartDailyOrders.value = element.count;
        this.seriesForDailyOrdersChart.series.push(dataForLineChartDailyOrders);
        
      });

      this.seriesForDailyOrdersChart.name = "Dnevni broj porudžbina";
      this.dailyOrders.push(this.seriesForDailyOrdersChart);
  });

    this.getAllBillsAndItemDetailsFromDatabase();


    // this.adminsService.getSoldItemsByCategory().subscribe((statisticsItemsSoldByCategory : Statistics[]) => {
    //   // console.log(statisticsItemsSoldByCategory[0]);
    //   statisticsItemsSoldByCategory[0].itemsSoldByCategory.forEach(element => {
    //     let dataForPieChart = new PieChartDataModel;
    //     dataForPieChart.name = element.category;
    //     dataForPieChart.value = element.quantity;
    //     this.salesPerCategory.push(dataForPieChart);
        
    //   });
    // })
    // console.log(this.salesPerCategory)
  }

  allBills : Bills[] = [];

  salesPerCategory : PieAndBarChartDataModel[] = [];
  itemsSoldCounter : PieAndBarChartDataModel[] = [];

  seriesForDailyIncomeChart = {} as LineChartDataModel;
  dailyIncome : LineChartDataModel[] = []; 

  seriesForDailyOrdersChart = {} as LineChartDataModel;
  dailyOrders : LineChartDataModel[] = [];

  itemCategories : string [];
  
  test : LineChartDataModel[];


//listn for mouse, dont render charts if data is not available
  // @HostListener('document:mousemove', ['$event']) 
  // onMouseMove(e) {
  //   if (this.salesPerCategory.length == this.numberOfItemCategories) this.isDataAvailable = true;
  // }



  getAllBillsAndItemDetailsFromDatabase(){
    this.adminsService.getAllBills().subscribe((billsFromDatabase : BillsFromDatabase[]) => {
      //bills contain only item ID so we need to loop through array to query the database with item id in order to find item details like item name, price etc.
      billsFromDatabase.forEach(billFromDatabase => {
        let bill = new Bills();
        bill.items = [];

        billFromDatabase.boughtItems.forEach(boughtItems => {
          this.itemsService.getItemById(boughtItems.itemId).subscribe((item : Item) => {
            let purchasedItem = { 
              quantity: boughtItems.quantity,
              item: item
              }
              bill.billId = billFromDatabase.billId;
              bill.dateTime = billFromDatabase.dateTime;
              bill.userId = billFromDatabase.userId;
              bill.totalPrice = billFromDatabase.totalPrice;
            bill.items.push(purchasedItem);
          })
        });
        
        this.allBills.push(bill);
      });
      
    })
  }

  
  getPieChartData(){    



    //   this.itemsService.getCategories().subscribe((categories : string []) => {
        
    //   this.itemCategories = categories;
    //   this.numberOfItemCategories = categories.length;
    //   categories.forEach(category => {
    //     let itemsSoldByCategoryCount = 0;

    //     this.adminsService.getSoldItemsByCategory(category).subscribe((items : Item[]) => {

          
    //       let itemsIdFromParticularCategory = items.map(element => element.id);
          
          
    //       this.allBills.forEach(bill => {
    //         bill.items.forEach(element => {
    //           if (itemsIdFromParticularCategory.includes(element.item.id)){
                
    //             itemsSoldByCategoryCount = itemsSoldByCategoryCount + 1;

    //           }  
    //         });
            
    //       });

    //       let salePerCategory = {
    //         name : category,
    //         value : itemsSoldByCategoryCount
    //       }
          
    //       this.salesPerCategory.push(salePerCategory);
          
        
    //     });
    //   });

    // });
  }
  


  generatePDFBill(billId, totalPrice, orderDateTime){
    //filter returns array of bills
    let bills = this.allBills.filter(function (element) {
      return element.billId == billId
    });
    //filter will always return array with only one elemtn inside it
    let billForExport = new Bills();
    billForExport = bills[0];

    this.adminsService.getUserDataForBillPDF(billForExport.userId).subscribe((res) => {
      let firstName = res['firstName'];
      let lastName = res['lastName'];
      let email = res['email'];
      //round total bill cost to two decimal places
      totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
      //replace . with , as a decimal separator
      totalPrice = totalPrice.toString().replace(".", ",");
      //put comma as a thousend separator
      totalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      //define empty array for table we want to insert into the PDF file
      let boughtItems = [];
      //header of that table
      boughtItems.push(["Naziv artikla", "Jedinična cena", "Količina", "Ukupno po artiklu"]);
      //loop through all bought items in order to put them all in the table wit all relevant details
      for(var i = 0; i < billForExport.items.length; i++) {
        let quantity = billForExport.items[i].quantity;
        let unitPrice = billForExport.items[i].item.price;
        let itemName = billForExport.items[i].item.name;

        //check if items was on sale, if yes calculate discounted price
        if (billForExport.items[i].item.onSale == true) {
          unitPrice = billForExport.items[i].item.price - (billForExport.items[i].item.price * billForExport.items[i].item.discount)/100;
        }
        //if unit price is integer number, add two 0 to make it decimal number
        if (Number.isInteger(unitPrice)) {
          unitPrice.toFixed(2);
        }


        //define variable for rounded unit price with 2 decimal places and and decimal and thousend separators
        let roundedUnitPrice = (Math.round(unitPrice * 100) / 100).toFixed(2);
        roundedUnitPrice = roundedUnitPrice.toString().replace(".", ",");
        roundedUnitPrice = roundedUnitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        //calculate and round total price per item on two decimal places and and decimal and thousend separators
        let totalPerItem = (Math.round(Number(quantity) * unitPrice * 100) / 100).toFixed(2);
        totalPerItem = totalPerItem.toString().replace(".", ",");
        totalPerItem = totalPerItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


        //create empty array which represents each row of the table
        let boughtItemDetails = [];
        boughtItemDetails.push(itemName);
        boughtItemDetails.push(roundedUnitPrice);
        boughtItemDetails.push(quantity);
        boughtItemDetails.push(totalPerItem);

        //add new row to te table
        boughtItems.push(boughtItemDetails);

      }
      

    let docDefinition = {
      content: [
        { text: "Korisnički podaci", style: "userData" },
        "Ime: " + firstName,
        "Prezime: " + lastName,
        "e-mail: " + email,
        {
          text:
            "Podaci o porudžbini:",
          style: "orderedItems"
        },
        "Broj porudžbine: " + billId,
        "Datim i vreme: " + orderDateTime, 
        {
          style: "tableWithItemsDetails",
          table: {
            body: boughtItems
          }
        },
        {
          text:
            "Ukupno za uplatu: " + totalPrice + " RSD",
          style: "totalPriceOfBoughtItems"
        }
      ],
      styles: {
        userData: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        orderedItems: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 5]
        },
        tableWithItemsDetails: {
          margin: [0, 5, 0, 15]
        },
        totalPriceOfBoughtItems: {
          margin: [0,5,0,15],
          fontSize: 16,
          bold: true,
          color: "red"
        }
      }  
    };

    //download created PDF file
    pdfMake.createPdf(docDefinition).download("račun"+billId+".pdf"); 



    });



  }



}
