import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // autocomplete = {query: ''};
  // autocompleteItems = [];
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public age: number;
  public ages : Array<any> = [{value: 0, display: "Less than 1 year"}, {value: 1, display: "12 to 24 months"}, {value: 2, display: "2 years old"}, {value: 3, display: "3 years old"}, {value: 4, display: "4 years old"}, {value: 5, display: "5 years old"}, {value: 6, display: "6 years old"}, {value: 7, display: "7 years old"}, {value: 8, display: "8 years old"}, {value: 9, display: "9 years old"}, {value: 10, display: "Over 10 years old"}];
  public advOpsToggle: Boolean = false;
  public results: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log("LAT: ", this.latitude);
          console.log("LNG: ", this.longitude);
        });
      });
    });
  }

  logAge() {
    console.log("AGE: ", this.age);
  }

  toggleAdvOpts() {
    this.advOpsToggle = this.advOpsToggle ? false : true;
  }
  
  submitSearch() {
    let pkg = {
      latitude: this.latitude,
      longitude: this.longitude,
      distance: 5,
      unit: 'miles'
    };

    this.searchService.searchParents(pkg)
      .then((res:any) => {
        // console.log("RES FROM SEARCH SERVICE", res);
        this.results = res.hits.hits;
        console.log("Results", this.results);
      })
  }

  // updateSearch() {
  //   if (this.autocomplete.query == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   let me = this;
  //   this.service.getPlacePredictions({ input: this.autocomplete.query, types: ['establishment'] }, function (predictions, status) {
  //     me.autocompleteItems = []; 
  //     me.zone.run(function () {
  //       predictions.forEach(function (prediction) {
  //         me.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }

}
