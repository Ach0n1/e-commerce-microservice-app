import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  display: any;
  // center: google.maps.LatLngLiteral = {
  //     lat: 44.793,
  //     lng: 20.467
  // };
  // zoom = 11;


  // markers = [{
  //   position: {
  //     lat: 44,
  //     lng: 20,
  //   },
  //   label: {
  //     color: 'red',
  //     text: 'Marker label ',
  //   },
  //   title: 'Marker title ',
  //   options: { animation: google.maps.Animation.BOUNCE },
  // }];


  // @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
 
  // openInfo(marker: MapMarker) {
  //   this.infoWindow.open(marker)
  // }



  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }









  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
 
  zoom = 11;
  center: google.maps.LatLngLiteral = {
    lat: 44.793,
    lng: 20.467
  };


  infoContent = '';


  markers = [{
    position: {
      lat: 44.796888691,
      lng: 20.499734166,
    },
    info: 'Moja prodavnica Batutova 12 Zvezdara'
  },
  {
    position: {
      lat: 44.8412186628,
      lng: 20.3954078479,
    },
    info: 'Moja prodavnica Prvomajska 4 Zemun'
  },
  {
    position: {
      lat: 44.7488509221,
      lng: 20.4134576184,
    },
    info: 'Moja prodavnica Jablanička 5 Čukarica'
  },
  {
    position: {
      lat: 44.7422386459,
      lng: 20.5000400719,
    },
    info: 'Moja prodavnica Vojvode Stepe 521 Voždovac'
  },
  {
    position: {
      lat: 44.8019587452,
      lng: 20.3888852013,
    },
    info: 'Moja prodavnica Gandijeva 133 Novi Beograd'
  },
  {
    position: {
      lat: 44.8531697345,
      lng: 20.4833161106,
    },
    info: 'Moja prodavnica Dolovska 11 Palilula'
  }];

  mapInfoOptions = {
    maxWidth : 200
  };
 
  openInfo(marker : MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

}
