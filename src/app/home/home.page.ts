import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { BatteryStatus } from '@awesome-cordova-plugins/battery-status/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isTorch = true;
  batteryStatusDisplay: any;
  subscription: any;
  isPlugged = false;
  constructor(private flashlight: Flashlight, private batteryStatus: BatteryStatus) { }
  ngOnInit() {
    this.subscription = this.batteryStatus.onChange().subscribe(status => {
      this.batteryStatusDisplay = status.level;
      this.isPlugged = status.isPlugged;
    });
  }

  onFlashlight() {
    if (this.flashlight.available()) {
      this.isTorch = false;
      this.flashlight.switchOn();
    } else {
      alert('Flashlight Not Available');
    }
  }
  offFlashlight() {
    this.isTorch = true;
    this.flashlight.switchOff();
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
