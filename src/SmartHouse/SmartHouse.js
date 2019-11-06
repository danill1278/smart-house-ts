import {Device} from '../BaseDevices/Device/Device'; 
import { Logger } from "../Utilities/Logger/Logger";

export const SmartHouse = function(name = "Smart House") {
  this._devices = [];
  this._activeDevice = null;

  this.onAll = function() {
    this._devices.forEach(device => device.on());
  };

  this.offAll = function() {
    this._devices.forEach(device => device.off());
  };

  this.deleteAllDevices = function() {
    this.offAll();
    this._devices = [];
  };

  this.getAllDevicesByModel = function(model) {
    return this._devices.filter(device => {
      if (device.getModel() == model) {
        return device;
      }
    });
  };

  this.deleteDevicesByModel = function(model) {
    console.log(this._devices);
    this._devices.filter((device, i) => {
      console.log(i);
      if (device.getModel() == model) {
        this._devices.splice(i, 1);
      }
    });
    console.log(this._devices);
  };

  this._checkName = function(name) {
    name = name.trim();
    // return true;
    if (typeof name !== "string") {
      Logger.error("Name must be a string");
      return false;
    }
    const regex = /[\w\d\s]{5,10}/;
    const result = name.match(regex);
    if (result != null) {
      Logger.warning("Name must contain 5-10 characters");
      return false;
    }
    let isNameUnic = this._devices.find(device => {
      if ( device.getName() === name ) {
        return true;
      }
    });
    if (isNameUnic) {
      Logger.error('Device with those name already exist');
      return false;
    }
    return true;
  };

  if (this._checkName(name)) {
    this._name = name;
  }

  this.getName = function() {
    return this._name;
  };

  this.addDevice = function(device) {
    if (device instanceof Device) {
      this._devices.push(device);
    } else {
      Logger.error("Devices must be objects of iKettle or Speaker");
    }
  };

  this.deleteDeviceByName = function(name) {
    let deleteObjIndex = this._devices.find((device, index) => {
      if (device.getName() === name) {
        return index;
      }
    });

    this._devices[deleteObjIndex].off();
    this._devices.splice(deleteObjIndex, 1);
  };

  this.getAllDevices = function() {
    return this._devices;
  };

  this.getDeviceByName = function(name) {
    return this._devices.find(device => {
      if (device.getName() === name) {
        return device;
      }
    });
  };
};
